export const siteConfig = {
  name: "RDA Landscape",
  legalName: "Ryland Adams Landscaping",
  owner: "Ryland Adams",
  tagline: "Landscaping, Lawn Care & Exterior Property Services",
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
  {
    slug: "junk-removal",
    name: "Junk Removal",
    summary: "Old furniture, yard debris, and clutter — hauled away fast.",
    offerings: [
      "Furniture & appliance removal",
      "Yard waste & brush hauling",
      "Garage & basement cleanouts",
      "Construction debris removal",
      "Single-item pickups",
    ],
    seasonal: null,
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    summary: "Driveways, siding, and decks — back to like-new.",
    offerings: [
      "Driveway & walkway washing",
      "House siding washing",
      "Deck & patio washing",
      "Fence washing",
      "Gutter exterior brightening",
    ],
    seasonal: null,
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    summary: "Streak-free windows, inside and out.",
    offerings: [
      "Interior & exterior window washing",
      "Screen cleaning",
      "Track & sill detailing",
      "Storefront/commercial glass",
    ],
    seasonal: null,
  },
] as const;

/**
 * Content below is placeholder copy for sections that need Ryland's real
 * input (photos, reviews, pricing, bio). Marked [NEEDED FROM RYLAND] and
 * listed in full at the end of the build — never treat these as final.
 */
export const PLACEHOLDER_NOTICE = "NEEDED FROM RYLAND";
