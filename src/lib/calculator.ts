export type CalcInput = {
  /** Total debt amount in dollars */
  debt: number;
  /** Target settlement percentage, e.g. 50 means settle for 50% of debt */
  targetPct: number;
  /** Monthly amount the user can save toward settlements */
  monthlySavings: number;
};

export type CalcResult = {
  settlementAmount: number;
  savings: number;
  months: number;
  years: number;
  remainderMonths: number;
};

/**
 * Estimate a debt-settlement outcome. Pure + deterministic so it can be unit
 * tested and reused by both the homepage preview and the full calculator page.
 */
export function calculateSettlement({
  debt,
  targetPct,
  monthlySavings,
}: CalcInput): CalcResult {
  const safeDebt = Math.max(0, debt);
  const safePct = Math.min(100, Math.max(0, targetPct));
  const settlementAmount = Math.round(safeDebt * (safePct / 100));
  const savings = Math.max(0, safeDebt - settlementAmount);

  const months =
    monthlySavings > 0 ? Math.ceil(settlementAmount / monthlySavings) : 0;
  const years = Math.floor(months / 12);
  const remainderMonths = months % 12;

  return { settlementAmount, savings, months, years, remainderMonths };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export function formatDuration(months: number): string {
  if (months <= 0) return "—";
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}
