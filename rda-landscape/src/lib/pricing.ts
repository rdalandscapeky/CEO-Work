/**
 * [NEEDED FROM RYLAND] Every number in this file is a placeholder — rough
 * industry-typical rates, not RDA Landscape's real pricing. Swap them for
 * real numbers before this tool goes live; nothing here should be treated
 * as a quote until then.
 */
export const PRICING = {
  landscaping: {
    bedPrepPerSqFt: 1.25,
    mulchPerCubicYard: 65,
    minimum: 250,
  },
  lawnMaintenance: {
    mowingPerSqFt: 0.015,
    minimum: 45,
  },
  snowRemoval: {
    perSqFt: 0.08,
    minimum: 60,
  },
  junkRemoval: {
    perCubicYard: 45,
    minimum: 125,
  },
  pressureWashing: {
    perSqFt: 0.22,
    minimum: 150,
  },
  windowCleaning: {
    perWindow: 8,
    minimum: 100,
  },
  accessMultiplier: {
    easy: 1,
    moderate: 1.15,
    difficult: 1.35,
  },
} as const;

export type AccessDifficulty = keyof typeof PRICING.accessMultiplier;

export interface QuoteInputs {
  services: string[];
  lawnSquareFootage: number | null;
  bedSquareFootage: number | null;
  mulchCubicYards: number | null;
  drivewaySquareFootage: number | null;
  walkwaySquareFootage: number | null;
  sidingSquareFootage: number | null;
  junkVolumeCubicYards: number | null;
  windowCount: number | null;
  accessDifficulty: AccessDifficulty;
}

export interface ServiceEstimate {
  service: string;
  low: number;
  high: number;
}

export interface QuoteEstimate {
  breakdown: ServiceEstimate[];
  low: number;
  high: number;
}

function range(base: number, minimum: number, multiplier: number): [number, number] {
  const adjusted = Math.max(base * multiplier, minimum);
  return [Math.round(adjusted * 0.85), Math.round(adjusted * 1.15)];
}

export function calculateEstimate(inputs: QuoteInputs): QuoteEstimate {
  const multiplier = PRICING.accessMultiplier[inputs.accessDifficulty];
  const breakdown: ServiceEstimate[] = [];

  if (inputs.services.includes("landscaping")) {
    const bedCost =
      (inputs.bedSquareFootage ?? 0) * PRICING.landscaping.bedPrepPerSqFt;
    const mulchCost =
      (inputs.mulchCubicYards ?? 0) * PRICING.landscaping.mulchPerCubicYard;
    const [low, high] = range(
      bedCost + mulchCost,
      PRICING.landscaping.minimum,
      multiplier,
    );
    breakdown.push({ service: "Landscaping", low, high });
  }

  if (inputs.services.includes("lawn-maintenance")) {
    const base = (inputs.lawnSquareFootage ?? 0) * PRICING.lawnMaintenance.mowingPerSqFt;
    const [low, high] = range(base, PRICING.lawnMaintenance.minimum, multiplier);
    breakdown.push({ service: "Lawn Maintenance", low, high });
  }

  if (inputs.services.includes("snow-removal")) {
    const totalSqFt =
      (inputs.drivewaySquareFootage ?? 0) + (inputs.walkwaySquareFootage ?? 0);
    const base = totalSqFt * PRICING.snowRemoval.perSqFt;
    const [low, high] = range(base, PRICING.snowRemoval.minimum, multiplier);
    breakdown.push({ service: "Snow Removal", low, high });
  }

  if (inputs.services.includes("junk-removal")) {
    const base = (inputs.junkVolumeCubicYards ?? 0) * PRICING.junkRemoval.perCubicYard;
    const [low, high] = range(base, PRICING.junkRemoval.minimum, multiplier);
    breakdown.push({ service: "Junk Removal", low, high });
  }

  if (inputs.services.includes("pressure-washing")) {
    const totalSqFt =
      (inputs.drivewaySquareFootage ?? 0) +
      (inputs.walkwaySquareFootage ?? 0) +
      (inputs.sidingSquareFootage ?? 0);
    const base = totalSqFt * PRICING.pressureWashing.perSqFt;
    const [low, high] = range(base, PRICING.pressureWashing.minimum, multiplier);
    breakdown.push({ service: "Pressure Washing", low, high });
  }

  if (inputs.services.includes("window-cleaning")) {
    const base = (inputs.windowCount ?? 0) * PRICING.windowCleaning.perWindow;
    const [low, high] = range(base, PRICING.windowCleaning.minimum, multiplier);
    breakdown.push({ service: "Window Cleaning", low, high });
  }

  const low = breakdown.reduce((sum, b) => sum + b.low, 0);
  const high = breakdown.reduce((sum, b) => sum + b.high, 0);

  return { breakdown, low, high };
}
