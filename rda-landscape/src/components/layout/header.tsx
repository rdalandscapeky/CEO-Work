"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-ink/95 backdrop-blur supports-[backdrop-filter]:bg-brand-ink/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-white"
        >
          RDA <span className="text-brand-gold-light">Landscape</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <Phone className="size-4" />
            {siteConfig.phone}
          </a>
          <Button asChild className="bg-brand-gold text-brand-ink hover:bg-brand-gold-light">
            <a href="#quote">Get a Free Quote</a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-ink px-4 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              <Phone className="size-4" />
              {siteConfig.phone}
            </a>
            <Button
              asChild
              className="bg-brand-gold text-brand-ink hover:bg-brand-gold-light"
              onClick={() => setOpen(false)}
            >
              <a href="#quote">Get a Free Quote</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
