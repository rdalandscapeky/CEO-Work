import { UserRound } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section id="about" className="bg-background px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-muted-foreground md:mx-0">
          <div className="flex flex-col items-center gap-2">
            <UserRound className="size-10" />
            <span className="text-xs font-medium">
              [NEEDED FROM RYLAND] Photo of {siteConfig.owner}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium tracking-widest text-brand-forest uppercase">
            About the owner
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {siteConfig.owner}
          </h2>
          <p className="mt-4 text-muted-foreground">
            [NEEDED FROM RYLAND] A short story goes here — how RDA Landscape
            got started, how long you&apos;ve been serving{" "}
            {siteConfig.serviceArea}, and what you want customers to know
            about how you run a job. A few sentences in your own words reads
            better than anything written for you.
          </p>
        </div>
      </div>
    </section>
  );
}
