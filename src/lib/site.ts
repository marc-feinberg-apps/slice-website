/**
 * Central site configuration. One source of truth for brand copy, URLs and
 * the CTA labels used across the marketing site.
 */
export const site = {
  name: "SLICE",
  tagline: "Reducing your debt one bite at a time.",
  pledge: "Never pay fees to a debt settlement company — settle your own debt with SLICE.",
  domain: "https://slice.marcfeinberg.com",
  description:
    "SLICE is the debt resolution app that helps you organize creditors, calculate settlement targets, build a monthly savings plan, generate AI negotiation scripts, and book coaching — without paying a settlement company 25% of your debt.",
  email: "support@slicemydebt.com",
  founder: "Marc Feinberg",
  social: {
    instagram: "https://instagram.com/getslice.app",
    tiktok: "https://tiktok.com/@getslice.app",
    linkedin: "https://linkedin.com/company/getslice",
  },
  /** Legal entity details — fills placeholders in the /docs legal documents. */
  legal: {
    businessName: "Coach Marc LLC",
    address: "2007 Cove Ln., North Palm Beach, FL 33408",
    state: "Florida",
    venue: "Palm Beach County, Florida",
    effectiveDate: "Coming soon",
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
