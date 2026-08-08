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
            className="object-cover object-top"
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
            I started RDA Landscape a few years ago to do good work for
            neighbors. Now I&apos;m growing it into a landscape company that
            takes on bigger jobs, but I still bring the same attention to
            detail I did in the beginning.
          </p>
        </div>
      </div>
    </section>
  );
}
