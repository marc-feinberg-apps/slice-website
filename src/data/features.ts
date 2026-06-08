import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  ListChecks,
  Calculator,
  PiggyBank,
  TrendingDown,
  BrainCircuit,
  PhoneCall,
  GraduationCap,
  Bot,
  UserRoundCheck,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Lowest tier that unlocks this feature */
  tier: "Free" | "Silver" | "Gold" | "Platinum";
};

export const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "Customized debt program onboarding",
    description:
      "Answer a few questions and SLICE builds a debt resolution plan tailored to your balances, budget, and timeline.",
    tier: "Free",
  },
  {
    icon: ListChecks,
    title: "Creditor tracking",
    description:
      "Add every creditor in one organized dashboard — balances, account numbers, status, and next action at a glance.",
    tier: "Free",
  },
  {
    icon: Calculator,
    title: "Settlement calculator (30–70%)",
    description:
      "Model realistic settlement targets at 30%, 40%, 50%, 60%, and 70% so you know exactly what to aim for.",
    tier: "Free",
  },
  {
    icon: PiggyBank,
    title: "Monthly savings & program length",
    description:
      "See how much to set aside each month and how long your program will take to fully fund your settlements.",
    tier: "Free",
  },
  {
    icon: TrendingDown,
    title: "Snowball timeline",
    description:
      "Visualize a debt-by-debt snowball timeline that shows each account getting resolved, one bite at a time.",
    tier: "Free",
  },
  {
    icon: BrainCircuit,
    title: "AI negotiation strategy",
    description:
      "Get a creditor-by-creditor game plan: when to call, what to offer, and how to hold your target with confidence.",
    tier: "Silver",
  },
  {
    icon: PhoneCall,
    title: "AI customized call scripts",
    description:
      "Generate word-for-word negotiation scripts personalized to each creditor and settlement offer.",
    tier: "Silver",
  },
  {
    icon: GraduationCap,
    title: "Credit repair education",
    description:
      "Learn how settlements affect your report and the steps to rebuild credit afterward — explained in plain English.",
    tier: "Free",
  },
  {
    icon: Bot,
    title: "Zest, your AI Debt Coach",
    description:
      "Chat with Zest anytime for answers, encouragement, and next steps so you never feel stuck or alone.",
    tier: "Silver",
  },
  {
    icon: UserRoundCheck,
    title: "Founder coaching with Marc Feinberg",
    description:
      "Book guidance from SLICE founder Marc Feinberg and his network for mastermind, coaching, and tax advisory support.",
    tier: "Gold",
  },
];
