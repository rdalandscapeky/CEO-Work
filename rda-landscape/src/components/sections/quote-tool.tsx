"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { services } from "@/lib/site-config";
import type { QuoteEstimate } from "@/lib/pricing";

interface ApiResponse {
  estimate?: QuoteEstimate;
  disclaimer?: string;
  error?: string;
}

export function QuoteTool() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleService(slug: string) {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)].slice(0, 6));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (selectedServices.length === 0) {
      setError("Select at least one service.");
      return;
    }
    if (files.length === 0) {
      setError("Upload at least one photo of your yard.");
      return;
    }
    if (!name || (!email && !phone)) {
      setError("Enter your name and a phone number or email.");
      return;
    }

    setStatus("loading");
    setResult(null);

    const formData = new FormData();
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/quote", { method: "POST", body: formData });
      const data: ApiResponse = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("idle");
    } catch {
      setError("Network error — please try again or call us directly.");
      setStatus("error");
    }
  }

  return (
    <section id="quote" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Get an instant quote
          </h2>
          <p className="mt-3 text-muted-foreground">
            Upload a few photos, pick your services, and get a price range in
            minutes.
          </p>
        </div>

        <Card className="relative overflow-hidden">
          {status === "loading" && <BorderBeam size={80} duration={4} />}
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Honeypot — hidden from real users, bots tend to fill every field */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3">
                <Label>Which services do you need?</Label>
                <div className="flex flex-col gap-2">
                  {services.map((service) => (
                    <label
                      key={service.slug}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={selectedServices.includes(service.slug)}
                        onCheckedChange={() => toggleService(service.slug)}
                      />
                      {service.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Photos of your yard, beds, lawn, or driveway</Label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background py-8 text-sm text-muted-foreground hover:border-brand-forest hover:text-brand-forest"
                >
                  <ImagePlus className="size-6" />
                  Add photos (up to 6)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {files.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {files.map((file, i) => (
                      <li
                        key={`${file.name}-${i}`}
                        className="flex items-center gap-1 rounded-full border bg-background px-3 py-1 text-xs"
                      >
                        {file.name}
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          aria-label={`Remove ${file.name}`}
                        >
                          <X className="size-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="quote-name">Name</Label>
                  <Input
                    id="quote-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="quote-phone">Phone</Label>
                  <Input
                    id="quote-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="quote-email">Email</Label>
                  <Input
                    id="quote-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="bg-brand-forest hover:bg-brand-forest-light"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Get my instant quote"
                )}
              </Button>

              {status === "loading" && (
                <AnimatedShinyText className="text-center text-sm">
                  AI is analyzing your yard...
                </AnimatedShinyText>
              )}
            </form>

            {result?.estimate && (
              <div className="mt-8 border-t pt-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Estimated range
                </p>
                <p className="font-serif text-3xl font-semibold text-brand-forest">
                  ${result.estimate.low.toLocaleString()}–$
                  {result.estimate.high.toLocaleString()}
                </p>
                <ul className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
                  {result.estimate.breakdown.map((b) => (
                    <li key={b.service}>
                      {b.service}: ${b.low.toLocaleString()}–$
                      {b.high.toLocaleString()}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  {result.disclaimer}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
