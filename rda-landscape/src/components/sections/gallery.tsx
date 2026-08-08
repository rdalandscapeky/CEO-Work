import Image from "next/image";
import { ImageOff } from "lucide-react";

export interface BeforeAfterItem {
  before: string;
  after: string;
  caption: string;
}

/**
 * [NEEDED FROM RYLAND] Real before/after job photos. This array is empty on
 * purpose — no stock imagery. Drop objects like
 * { before: "/gallery/job-1-before.jpg", after: "/gallery/job-1-after.jpg",
 *   caption: "Front bed renovation — Prospect, KY" }
 * into this list (or wire it up to a CMS later) and the grid below fills in
 * automatically.
 */
export const beforeAfterItems: BeforeAfterItem[] = [];

function PlaceholderSlot({ label }: { label: string }) {
  return (
    <div className="flex aspect-4/3 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted text-muted-foreground">
      <ImageOff className="size-6" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Before &amp; after
          </h2>
        </div>

        {beforeAfterItems.length === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl border bg-card p-2">
                <PlaceholderSlot label="Before" />
                <PlaceholderSlot label="After" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beforeAfterItems.map((item) => (
              <figure
                key={item.caption}
                className="overflow-hidden rounded-xl border bg-card"
              >
                <div className="grid grid-cols-2 gap-1 p-2">
                  <div className="relative aspect-4/3 overflow-hidden rounded-md">
                    <Image
                      src={item.before}
                      alt={`Before — ${item.caption}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-4/3 overflow-hidden rounded-md">
                    <Image
                      src={item.after}
                      alt={`After — ${item.caption}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <figcaption className="px-4 pb-4 text-sm text-muted-foreground">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          [NEEDED FROM RYLAND] Send real before/after job photos and they
          drop straight into this grid.
        </p>
      </div>
    </section>
  );
}
