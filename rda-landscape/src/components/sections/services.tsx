"use client";

import { useState } from "react";
import { ChevronDown, Flower2, Snowflake, Sprout } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { cn } from "@/lib/utils";
import { services } from "@/lib/site-config";

const icons = {
  landscaping: Flower2,
  "lawn-maintenance": Sprout,
  "snow-removal": Snowflake,
};

function isSnowSeason() {
  const month = new Date().getMonth() + 1;
  return ([11, 12, 1, 2, 3] as number[]).includes(month);
}

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const snowSeason = isSnowSeason();

  return (
    <section id="services" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto mb-16 flex h-40 max-w-md items-center justify-center">
          <OrbitingCircles radius={70} duration={22}>
            <Flower2 className="size-6 text-brand-forest" />
          </OrbitingCircles>
          <OrbitingCircles radius={70} duration={22} delay={7.3}>
            <Sprout className="size-6 text-brand-sage" />
          </OrbitingCircles>
          <OrbitingCircles radius={70} duration={22} delay={14.6}>
            <Snowflake className="size-6 text-brand-gold" />
          </OrbitingCircles>
          <div className="flex size-16 items-center justify-center rounded-full bg-brand-ink font-serif text-lg font-semibold text-white">
            RDA
          </div>
        </div>

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            What we do
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three lines of work, one crew you can count on.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services
            .slice()
            .sort((a, b) => {
              if (!snowSeason) return 0;
              if (a.slug === "snow-removal") return -1;
              if (b.slug === "snow-removal") return 1;
              return 0;
            })
            .map((service) => {
              const Icon = icons[service.slug];
              const isOpen = expanded === service.slug;
              const isSeasonalHighlight =
                snowSeason && service.slug === "snow-removal";

              return (
                <Card
                  key={service.slug}
                  className={cn(
                    "flex flex-col transition-shadow",
                    isSeasonalHighlight &&
                      "border-brand-gold shadow-[0_0_0_1px_var(--brand-gold)]",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-brand-forest/10 text-brand-forest">
                        <Icon className="size-5" />
                      </div>
                      {isSeasonalHighlight && (
                        <Badge className="bg-brand-gold text-brand-ink">
                          Book now — winter is here
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="pt-2 text-xl">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-muted-foreground">{service.summary}</p>

                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isOpen ? null : service.slug)
                      }
                      className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-forest hover:underline"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Hide offerings" : "View offerings"}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {isOpen && (
                      <ul className="mt-4 flex flex-col gap-2 border-t pt-4 text-sm">
                        {service.offerings.map((offering) => (
                          <li
                            key={offering}
                            className="flex items-start gap-2 text-foreground/80"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                            {offering}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          [NEEDED FROM RYLAND] Offerings above are a starting draft — confirm
          or edit the exact list for each service line.
        </p>
      </div>
    </section>
  );
}
