export type Plan = {
  name: "Free" | "Silver" | "Gold" | "Platinum";
  /** Standalone month-to-month price in USD. */
  monthly: number;
  /**
   * Per-month price shown when the yearly toggle is active. Set from the
   * App Store yearly price points — not derived from `monthly`, since those
   * don't multiply exactly to the annual total. Omitted on Free.
   */
  yearlyMonthly?: number;
  /** Total billed once per year. Omitted on Free. */
  yearlyTotal?: number;
  tagline: string;
  highlight?: boolean;
  cta: string;
  /** What this tier adds on top of the one below it */
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    tagline: "Everything you need to get organized and make a plan.",
    cta: "Start Free",
    features: [
      "Settlement readiness & next best move",
      "Creditor tracking & negotiation status",
      "Settlement calculator (30–70%)",
      "What-if simulator & savings planner",
      "Snowball timeline",
      "Call log & follow-up reminders",
      "Settlement fund tracking",
    ],
  },
  {
    name: "Silver",
    monthly: 9.99,
    yearlyMonthly: 8.0,
    yearlyTotal: 95.9,
    tagline: "Negotiate like a pro with AI on your side.",
    cta: "Choose Silver",
    features: [
      "Everything in Free",
      "AI negotiation strategy",
      "AI call scripts in 4 tones",
      "Zest AI Debt Coach",
      "25 AI requests per tool, daily",
      "Copy of our book Debt Settlements: Dirty Little Secrets",
    ],
  },
  {
    name: "Gold",
    monthly: 29.99,
    yearlyMonthly: 24.99,
    yearlyTotal: 289,
    tagline: "Add expert humans to your AI toolkit.",
    highlight: true,
    cta: "Choose Gold",
    features: [
      "Everything in Silver",
      "Weekly Zoom calls for debt-resolution coaching and all things financial",
      "50 AI requests per tool, daily",
    ],
  },
  {
    name: "Platinum",
    monthly: 59.99,
    yearlyMonthly: 48.49,
    yearlyTotal: 579,
    tagline: "Done-with-you calls and priority access.",
    cta: "Choose Platinum",
    features: [
      "Everything in Gold",
      "Quarterly done-with-you creditor calls to negotiate settlements",
      "Credit repair checklist & education",
      "250 AI requests per tool, daily",
      "Priority founder coaching",
    ],
  },
];
