export const siteConfig = {
  name: "RDA Landscape",
  legalName: "Ryland Adams Landscaping",
  owner: "Ryland Adams",
  tagline: "Landscaping, Lawn Maintenance & Snow Removal",
  serviceArea: "Louisville, KY & surrounding counties",
  city: "Louisville",
  state: "KY",
  phone: "(502) 881-2021",
  phoneHref: "tel:+15028812021",
  email: "ryland.adams@icloud.com",
  instagramHandle: "@rda_landscape",
  instagramUrl: "https://www.instagram.com/rda_landscape/",
  domain: "rdalandscapeky.com",
  siteUrl: "https://rdalandscapeky.com",
} as const;

export const services = [
  {
    slug: "landscaping",
    name: "Landscaping",
    summary: "Design, beds, mulch, and hardscaping that hold up all year.",
    offerings: [
      "Garden bed design & installation",
      "Mulching & edging",
      "Planting (shrubs, trees, perennials)",
      "Sod installation",
      "Hardscaping (walkways, retaining walls)",
      "Spring & fall cleanups",
    ],
    seasonal: null,
  },
  {
    slug: "lawn-maintenance",
    name: "Lawn Maintenance",
    summary: "Weekly mowing and season-long care for a lawn that holds its color.",
    offerings: [
      "Weekly / bi-weekly mowing",
      "Edging & trimming",
      "Fertilization programs",
      "Aeration & overseeding",
      "Leaf removal",
      "Weed control",
    ],
    seasonal: null,
  },
  {
    slug: "snow-removal",
    name: "Snow Removal",
    summary: "Driveways and walkways cleared before your day starts.",
    offerings: [
      "Driveway plowing",
      "Sidewalk & walkway clearing",
      "Salting & de-icing",
      "Seasonal contracts",
      "Per-storm on-call service",
    ],
    seasonal: { prominentMonths: [11, 12, 1, 2, 3] },
  },
] as const;

/**
 * Content below is placeholder copy for sections that need Ryland's real
 * input (photos, reviews, pricing, bio). Marked [NEEDED FROM RYLAND] and
 * listed in full at the end of the build — never treat these as final.
 */
export const PLACEHOLDER_NOTICE = "NEEDED FROM RYLAND";
