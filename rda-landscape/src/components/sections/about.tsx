import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section id="about" className="bg-background px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border md:mx-0">
          <Image
            src="/images/ryland-owner.jpeg"
            alt={siteConfig.owner}
            fill
            className="object-cover"
            priority
          />
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
