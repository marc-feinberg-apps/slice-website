/**
 * Central site configuration. One source of truth for brand copy, URLs and
 * the CTA labels used across the marketing site.
 */
export const site = {
  name: "SLICE",
  tagline: "Reducing your debt one bite at a time.",
  domain: "https://getslice.app",
  description:
    "SLICE is the debt resolution app that helps you organize creditors, calculate settlement targets, build a monthly savings plan, generate AI negotiation scripts, and book coaching — without paying a settlement company 25% of your debt.",
  email: "support@getslice.app",
  founder: "Marc Feinberg",
  social: {
    instagram: "https://instagram.com/getslice.app",
    tiktok: "https://tiktok.com/@getslice.app",
    linkedin: "https://linkedin.com/company/getslice",
  },
} as const;

export const cta = {
  start: "Start My Debt Program",
  waitlist: "Join the Waitlist",
  download: "Download the App",
  how: "See How SLICE Works",
} as const;

export const nav = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Coaching", to: "/coaching" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;
