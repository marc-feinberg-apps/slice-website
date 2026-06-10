import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  ClipboardList,
  ListChecks,
  Calculator,
  SlidersHorizontal,
  Goal,
  TrendingDown,
  NotebookPen,
  Wallet,
  ListTodo,
  PiggyBank,
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
    icon: Gauge,
    title: "Settlement readiness engine",
    description:
      "SLICE tells you whether you're ready to make a first offer — and if not, exactly when you will be. It flags your priority creditor and the single best next move.",
    tier: "Free",
  },
  {
    icon: ClipboardList,
    title: "Customized debt program onboarding",
    description:
      "Answer a few questions and SLICE builds a debt resolution plan tailored to your balances, budget, and timeline.",
    tier: "Free",
  },
  {
    icon: ListChecks,
    title: "Creditor tracking & negotiation status",
    description:
      "Every creditor in one dashboard — balances, account numbers, and a status workflow from Active to Negotiating to Settled, with progress tracked automatically.",
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
    icon: SlidersHorizontal,
    title: "What-if simulator",
    description:
      "Drag a slider to see how changing your monthly savings moves your settlement date — instantly, in real time.",
    tier: "Free",
  },
  {
    icon: Goal,
    title: "Savings planner",
    description:
      "Work backward from a target date: SLICE calculates the exact monthly savings amount you need to hit your timeline.",
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
    icon: NotebookPen,
    title: "Call log & follow-up reminders",
    description:
      "Log every creditor call with its outcome and notes, then schedule a follow-up — one week, two weeks, or a month out — so nothing slips.",
    tier: "Free",
  },
  {
    icon: Wallet,
    title: "Settlement fund tracking",
    description:
      "Track the cash you've saved toward settlements with 'Add to Fund' and measure each offer's progress against your balance.",
    tier: "Free",
  },
  {
    icon: ListTodo,
    title: "Credit repair checklist",
    description:
      "A categorized, checkable task list with a progress bar covering reports, disputes, settlements, documentation, monitoring, and planning.",
    tier: "Free",
  },
  {
    icon: GraduationCap,
    title: "Credit repair education",
    description:
      "Learn how settlements affect your report and the steps to rebuild credit afterward — explained in plain English.",
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
      "Generate word-for-word negotiation scripts in four tones — Calm, Firm, Hardship, or Short & Direct — personalized to each creditor and offer.",
    tier: "Silver",
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
