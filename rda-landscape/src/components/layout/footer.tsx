import Link from "next/link";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-semibold text-white">
            RDA <span className="text-brand-gold-light">Landscape</span>
          </p>
          <p className="mt-3 max-w-xs text-sm">
            {siteConfig.tagline} for {siteConfig.serviceArea}.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 hover:text-white"
          >
            <Phone className="size-4 text-brand-gold-light" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 hover:text-white"
          >
            <Mail className="size-4 text-brand-gold-light" />
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <AtSign className="size-4 text-brand-gold-light" />
            {siteConfig.instagramHandle}
          </a>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 text-brand-gold-light" />
            {siteConfig.serviceArea}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <a href="#services" className="hover:text-white">
            Services
          </a>
          <a href="#gallery" className="hover:text-white">
            Gallery
          </a>
          <a href="#reviews" className="hover:text-white">
            Reviews
          </a>
          <a href="#quote" className="hover:text-white">
            Get a Free Quote
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/50 sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All
          rights reserved.
        </p>
        <p className="mt-1">
          <Link href="/" className="hover:text-white/80">
            {siteConfig.domain}
          </Link>
        </p>
      </div>
    </footer>
  );
}
