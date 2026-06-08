import type { LucideIcon } from "lucide-react";
import { ClipboardList, Target, HandCoins } from "lucide-react";

export type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Organize your debt",
    description:
      "Add your creditors and balances in minutes. SLICE builds a clear picture of everything you owe and a customized program just for you.",
  },
  {
    number: "02",
    icon: Target,
    title: "Set your targets & save",
    description:
      "Use the calculator to set settlement targets (30–70%) and a monthly savings plan. Watch your snowball timeline map out the finish line.",
  },
  {
    number: "03",
    icon: HandCoins,
    title: "Negotiate & settle",
    description:
      "Generate AI negotiation strategies and call scripts, lean on Zest and founder coaching, and settle your accounts one bite at a time.",
  },
];
