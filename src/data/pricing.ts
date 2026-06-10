export type Plan = {
  name: "Free" | "Silver" | "Gold" | "Platinum";
  /** Monthly price in USD, used to derive both monthly and yearly display prices */
  monthly: number;
  tagline: string;
  highlight?: boolean;
  cta: string;
  /** What this tier adds on top of the one below it */
  features: string[];
};

/** Yearly plans are paid in full at a 20% discount — roughly 2 months free. */
export const YEARLY_DISCOUNT = 0.2;

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
      "Credit repair checklist & education",
    ],
  },
  {
    name: "Silver",
    monthly: 19,
    tagline: "Negotiate like a pro with AI on your side.",
    cta: "Choose Silver",
    features: [
      "Everything in Free",
      "AI negotiation strategy",
      "AI call scripts in 4 tones",
      "Zest AI Debt Coach",
      "30 AI requests per tool, daily",
      "Copy of our book Debt Settlements: Dirty Little Secrets",
    ],
  },
  {
    name: "Gold",
    monthly: 49,
    tagline: "Add expert humans to your AI toolkit.",
    highlight: true,
    cta: "Choose Gold",
    features: [
      "Everything in Silver",
      "Live weekly Zoom coaching calls",
      "Tax advisory booking",
      "Founder coaching option",
    ],
  },
  {
    name: "Platinum",
    monthly: 99,
    tagline: "Done-with-you calls and priority access.",
    cta: "Choose Platinum",
    features: [
      "Everything in Gold",
      "Live done-with-you creditor calls",
      "Priority founder coaching",
      "Priority support",
    ],
  },
];
