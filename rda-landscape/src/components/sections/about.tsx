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
            I grew up in Louisville and go to Christian Academy. I started
            this business at 13, going door to door with a hand-me-down push
            mower — that turned into RDA Landscape, and I&apos;m still
            building it into a bigger company today with the same attention
            to detail I had back then. The Lord&apos;s given me some great
            opportunities along the way, and I don&apos;t take that for
            granted. Outside of work you&apos;ll find me at the lake, playing
            lacrosse, working on guitar, or spending time with family,
            friends, and my dog, Hendrix.
          </p>
        </div>
      </div>
    </section>
  );
}
