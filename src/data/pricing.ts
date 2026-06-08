export type Plan = {
  name: "Free" | "Silver" | "Gold" | "Platinum";
  price: string;
  cadence: string;
  tagline: string;
  highlight?: boolean;
  cta: string;
  /** What this tier adds on top of the one below it */
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Everything you need to get organized and make a plan.",
    cta: "Start Free",
    features: [
      "Personal debt dashboard",
      "Creditor list & tracking",
      "Credit score tracker",
      "Settlement calculator (30–70%)",
      "Snowball timeline",
      "Budget & savings tracker",
    ],
  },
  {
    name: "Silver",
    price: "$19",
    cadence: "per month",
    tagline: "Negotiate like a pro with AI on your side.",
    cta: "Choose Silver",
    features: [
      "Everything in Free",
      "AI negotiation strategy",
      "AI customized call scripts",
      "Zest AI Debt Coach",
    ],
  },
  {
    name: "Gold",
    price: "$49",
    cadence: "per month",
    tagline: "Add expert humans to your AI toolkit.",
    highlight: true,
    cta: "Choose Gold",
    features: [
      "Everything in Silver",
      "Mastermind & coaching booking",
      "Tax advisory booking",
      "Founder coaching option",
    ],
  },
  {
    name: "Platinum",
    price: "$99",
    cadence: "per month",
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
