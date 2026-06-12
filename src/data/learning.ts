/**
 * Single source of truth for the video-academy tier gating.
 *
 * Videos are grouped into numbered **levels**. A user's subscription tier sets
 * the highest level they can watch (graduated unlock). Tier comes from the
 * shared Supabase `profiles.tier` enum used by the mobile app
 * (`'free' | 'silver' | 'gold' | 'platinum'`) — see normalizeTier().
 *
 * Mapping (confirmed product decision):
 *   Free     → Level 1
 *   Silver   → through Level 2
 *   Gold     → through Level 4
 *   Platinum → all levels
 */

export const TIER_ORDER = ["Free", "Silver", "Gold", "Platinum"] as const;
export type Tier = (typeof TIER_ORDER)[number];

/** Highest video level each tier unlocks. `Infinity` = no ceiling. */
export const TIER_MAX_LEVEL: Record<Tier, number> = {
  Free: 1,
  Silver: 2,
  Gold: 4,
  Platinum: Infinity,
};

/**
 * Map the raw Supabase enum value (lowercase) to our display Tier. Anything
 * unrecognized (or missing) is treated as Free — fail closed, never over-grant.
 */
export function normalizeTier(raw: string | null | undefined): Tier {
  switch ((raw ?? "").toLowerCase()) {
    case "silver":
      return "Silver";
    case "gold":
      return "Gold";
    case "platinum":
      return "Platinum";
    default:
      return "Free";
  }
}

/** Whether a tier may watch a given level. */
export function tierUnlocksLevel(tier: Tier, level: number): boolean {
  return level <= TIER_MAX_LEVEL[tier];
}

/**
 * The lowest tier that unlocks a given level — used to render the upgrade CTA
 * ("Unlock with Gold"). Returns "Platinum" for any level above all ceilings.
 */
export function minTierForLevel(level: number): Tier {
  return TIER_ORDER.find((t) => level <= TIER_MAX_LEVEL[t]) ?? "Platinum";
}
