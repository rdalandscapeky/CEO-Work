"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HeroTerrain } from "@/components/three/hero-terrain";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-brand-ink px-6 py-32 text-center text-white">
      <HeroTerrain />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium tracking-widest text-brand-gold-light uppercase"
        >
          {siteConfig.serviceArea}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-serif text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          {siteConfig.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-lg text-white/70"
        >
          Landscaping, lawn care, snow removal, junk removal, pressure
          washing, and window cleaning — handled right the first time.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-lg text-base text-white/60"
        >
          &ldquo;Whatever your hand finds to do, do it with all your
          might.&rdquo;{" "}
          <span className="text-brand-gold-light">
            — Ecclesiastes 9:10 (NIV)
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            asChild
            className="bg-brand-gold text-brand-ink hover:bg-brand-gold-light"
          >
            <a href="#quote">Get a Free Quote</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <a href={siteConfig.phoneHref}>Call {siteConfig.phone}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
