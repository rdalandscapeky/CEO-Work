import { MessageSquareQuote, Star } from "lucide-react";

export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

/**
 * [NEEDED FROM RYLAND] Real Google reviews only — paste them in verbatim.
 * Left empty on purpose; no fabricated reviews.
 */
export const reviews: Review[] = [];

export function Reviews() {
  return (
    <section id="reviews" className="bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            What customers say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real Google reviews from {`Louisville-area`} customers.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            <MessageSquareQuote className="size-8" />
            <p className="text-sm font-medium">
              [NEEDED FROM RYLAND] Paste your real Google reviews here — this
              section stays empty until then rather than showing anything
              made up.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.author}
                className="flex flex-col gap-3 rounded-xl border bg-card p-6"
              >
                <div className="flex gap-0.5 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4"
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/80">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-auto text-sm font-medium">
                  {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
