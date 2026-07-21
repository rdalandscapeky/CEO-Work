import { getStore } from "@netlify/blobs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 8;

interface Window {
  count: number;
  windowStart: number;
}

/**
 * Best-effort fixed-window limiter (8 req / 15 min per key), backed by
 * Netlify Blobs. Not strictly atomic under concurrent hits from the same
 * key, which is an acceptable tradeoff for a small-business contact form —
 * this exists to blunt scripted abuse, not to be a precise quota system.
 */
export async function checkRateLimit(key: string): Promise<{ allowed: boolean; remaining: number }> {
  const store = getStore("rate-limits");
  const now = Date.now();
  const existing = await store.get(key, { type: "json" }) as Window | null;

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    await store.setJSON(key, { count: 1, windowStart: now } satisfies Window);
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  await store.setJSON(key, {
    count: existing.count + 1,
    windowStart: existing.windowStart,
  } satisfies Window);
  return { allowed: true, remaining: MAX_REQUESTS - existing.count - 1 };
}
