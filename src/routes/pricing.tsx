import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus, Tag } from "lucide-react";
import { seo } from "../lib/seo";
import { Section, SectionHeading } from "../components/primitives";
import { PageHeader } from "../components/PageHeader";
import { PricingCards } from "../components/PricingCards";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBand } from "../components/CtaBand";
import { faqs } from "../data/faqs";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: "Pricing",
      path: "/pricing",
      description:
        "SLICE pricing: Free, Silver, Gold, and Platinum. Start free with settlement readiness, the calculator, what-if simulator, savings planner, call logging, and snowball timeline. Upgrade for AI negotiation, coaching, and done-with-you creditor calls.",
    }),
  component: Pricing,
});

/** A cell is either included/excluded (boolean) or a literal value such as a quota. */
type CellValue = boolean | string;

type Row = {
  label: string;
  free: CellValue;
  silver: CellValue;
  gold: CellValue;
  platinum: CellValue;
};

const matrix: Row[] = [
  { label: "Debt dashboard", free: true, silver: true, gold: true, platinum: true },
  { label: "Creditor tracking & negotiation status", free: true, silver: true, gold: true, platinum: true },
  { label: "Credit score tracker", free: true, silver: true, gold: true, platinum: true },
  { label: "Settlement readiness & next best move", free: true, silver: true, gold: true, platinum: true },
  { label: "Settlement calculator (30–70%)", free: true, silver: true, gold: true, platinum: true },
  { label: "What-if simulator", free: true, silver: true, gold: true, platinum: true },
  { label: "Savings planner", free: true, silver: true, gold: true, platinum: true },
  { label: "Snowball timeline", free: true, silver: true, gold: true, platinum: true },
  { label: "Budget & savings tracker", free: true, silver: true, gold: true, platinum: true },
  { label: "Call log & follow-up reminders", free: true, silver: true, gold: true, platinum: true },
  { label: "Settlement fund tracking", free: true, silver: true, gold: true, platinum: true },
  { label: "Credit repair checklist", free: true, silver: true, gold: true, platinum: true },
  { label: "AI negotiation strategy", free: false, silver: true, gold: true, platinum: true },
  { label: "AI call scripts (4 tones)", free: false, silver: true, gold: true, platinum: true },
  { label: "Zest AI Debt Coach", free: false, silver: true, gold: true, platinum: true },
  { label: "AI requests per tool, daily", free: "—", silver: "30", gold: "100", platinum: "250" },
  { label: "Book: Debt Settlements: Dirty Little Secrets", free: false, silver: true, gold: true, platinum: true },
  { label: "Live weekly Zoom coaching calls", free: false, silver: false, gold: true, platinum: true },
  { label: "Tax advisory booking", free: false, silver: false, gold: true, platinum: true },
  { label: "Founder coaching", free: false, silver: false, gold: true, platinum: true },
  { label: "Live done-with-you creditor calls", free: false, silver: false, gold: false, platinum: true },
  { label: "Priority founder coaching & support", free: false, silver: false, gold: false, platinum: true },
];

function Cell({ on }: { on: CellValue }) {
  if (typeof on === "string") {
    return (
      <span className="block text-center text-sm font-bold text-navy-800">
        {on}
      </span>
    );
  }
  return on ? (
    <Check className="mx-auto h-5 w-5 text-brand" aria-label="Included" />
  ) : (
    <Minus className="mx-auto h-5 w-5 text-slate-300" aria-label="Not included" />
  );
}

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <Tag className="h-4 w-4" /> Pricing
          </>
        }
        title="One low monthly price beats a 25% fee."
        subtitle="Start free and upgrade only when you're ready to negotiate. No long contracts. Cancel anytime."
      />

      <Section className="bg-white">
        <PricingCards />
      </Section>

      <Section className="bg-cream">
        <SectionHeading
          eyebrow="Compare plans"
          title="Everything in each plan."
          subtitle="See exactly what unlocks as you upgrade."
        />
        <div className="reveal mt-12 overflow-x-auto rounded-[1.25rem] border border-orange-100 bg-white shadow-card">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-orange-100 bg-orange-50/50">
                <th className="px-5 py-4 text-sm font-extrabold text-navy-900">
                  Feature
                </th>
                {["Free", "Silver", "Gold", "Platinum"].map((p) => (
                  <th
                    key={p}
                    className="px-4 py-4 text-center text-sm font-extrabold text-navy-900"
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 ? "bg-orange-50/20" : "bg-white"}
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-navy-800">
                    {row.label}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Cell on={row.free} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Cell on={row.silver} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Cell on={row.gold} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Cell on={row.platinum} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="reveal mt-6 text-center text-sm text-muted">
          Prices shown are introductory and subject to change. SLICE charges no
          percentage-of-debt settlement fees.
        </p>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Pricing FAQ"
          title="Common questions."
        />
        <div className="mt-12">
          <FaqAccordion items={faqs.filter((f) => /cost|cancel|different/i.test(f.q))} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
