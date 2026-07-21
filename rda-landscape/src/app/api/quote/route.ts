import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { calculateEstimate, type AccessDifficulty } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_IMAGES = 6;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const EstimateSchema = z.object({
  lawnSquareFootage: z
    .number()
    .nullable()
    .describe("Estimated total mowable lawn area in square feet, or null if not visible/relevant"),
  bedSquareFootage: z
    .number()
    .nullable()
    .describe("Estimated garden/landscape bed area in square feet, or null"),
  mulchCubicYards: z
    .number()
    .nullable()
    .describe("Estimated mulch needed in cubic yards for visible beds, or null"),
  drivewaySquareFootage: z.number().nullable().describe("Estimated driveway area in square feet, or null"),
  walkwaySquareFootage: z.number().nullable().describe("Estimated walkway/sidewalk area in square feet, or null"),
  accessDifficulty: z
    .enum(["easy", "moderate", "difficult"])
    .describe("Overall access difficulty for equipment/crew based on slope, obstacles, and clearance"),
  notes: z.string().describe("One or two sentences on what you observed and any caveats"),
});

function originAllowed(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;

  const origin = request.headers.get("origin") ?? request.headers.get("referer");
  if (!origin) return false;

  try {
    const originHost = new URL(origin).host;
    const allowedHost = new URL(siteConfig.siteUrl).host;
    return originHost === allowedHost;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!originAllowed(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const { allowed } = await checkRateLimit(`quote:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const formData = await request.formData();

  // Honeypot — bots fill every field, real users never see this one.
  if (String(formData.get("website") ?? "").trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const servicesRaw = formData.get("services");
  const services: string[] = servicesRaw ? JSON.parse(String(servicesRaw)) : [];
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const images = formData.getAll("images").filter((v): v is File => v instanceof File);

  if (services.length === 0) {
    return NextResponse.json({ error: "Select at least one service." }, { status: 400 });
  }
  if (images.length === 0) {
    return NextResponse.json({ error: "Upload at least one photo." }, { status: 400 });
  }
  if (images.length > MAX_IMAGES) {
    return NextResponse.json({ error: `Upload at most ${MAX_IMAGES} photos.` }, { status: 400 });
  }
  if (!name || (!email && !phone)) {
    return NextResponse.json(
      { error: "Name and at least one contact method are required." },
      { status: 400 },
    );
  }

  for (const image of images) {
    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return NextResponse.json({ error: `Unsupported image type: ${image.type}` }, { status: 400 });
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Each photo must be under 10MB." }, { status: 400 });
    }
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Instant quote tool isn't configured yet. Call or text us instead." },
      { status: 503 },
    );
  }

  const imageBlocks = await Promise.all(
    images.map(async (image) => {
      const buffer = Buffer.from(await image.arrayBuffer());
      return {
        type: "image" as const,
        source: {
          type: "base64" as const,
          media_type: image.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
          data: buffer.toString("base64"),
        },
      };
    }),
  );

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.parse({
    model: process.env.ANTHROPIC_MODEL || "claude-opus-4-8",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          ...imageBlocks,
          {
            type: "text",
            text: `These are photos of a residential property for a landscaping quote. The customer selected these services: ${services.join(", ")}. Estimate only the measurements relevant to those services from what's visible in the photos — leave irrelevant fields null rather than guessing wildly. Be conservative and note uncertainty in "notes".`,
          },
        ],
      },
    ],
    output_config: { format: zodOutputFormat(EstimateSchema) },
  });

  if (response.stop_reason === "refusal" || !response.parsed_output) {
    return NextResponse.json(
      { error: "Couldn't analyze those photos. Please call or text us for a manual quote." },
      { status: 422 },
    );
  }

  const measurements = response.parsed_output;
  const estimate = calculateEstimate({
    services,
    lawnSquareFootage: measurements.lawnSquareFootage,
    bedSquareFootage: measurements.bedSquareFootage,
    mulchCubicYards: measurements.mulchCubicYards,
    drivewaySquareFootage: measurements.drivewaySquareFootage,
    walkwaySquareFootage: measurements.walkwaySquareFootage,
    accessDifficulty: measurements.accessDifficulty as AccessDifficulty,
  });

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    const leadForm = new FormData();
    leadForm.append("access_key", process.env.WEB3FORMS_ACCESS_KEY);
    leadForm.append("subject", `New instant-quote lead: ${name}`);
    leadForm.append("from_name", "RDA Landscape instant quote tool");
    leadForm.append("name", name);
    leadForm.append("email", email || "not provided");
    leadForm.append("phone", phone || "not provided");
    leadForm.append("services", services.join(", "));
    leadForm.append(
      "estimate",
      `$${estimate.low}–$${estimate.high} (${estimate.breakdown
        .map((b) => `${b.service}: $${b.low}–$${b.high}`)
        .join("; ")})`,
    );
    leadForm.append("ai_notes", measurements.notes);
    images.forEach((image, i) => leadForm.append(`photo_${i + 1}`, image, image.name));

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: leadForm,
      });
    } catch {
      // Don't fail the customer's estimate if the lead email fails to send.
    }
  }

  return NextResponse.json({
    estimate,
    disclaimer:
      "This is an estimate based on photos only. Final price is confirmed on-site before any work begins.",
  });
}
