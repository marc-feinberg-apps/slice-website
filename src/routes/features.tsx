import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid } from "lucide-react";
import { seo } from "../lib/seo";
import { Section, SectionHeading } from "../components/primitives";
import { PageHeader } from "../components/PageHeader";
import { FeatureCard } from "../components/FeatureCard";
import { Calculator } from "../components/Calculator";
import { CtaBand } from "../components/CtaBand";
import { features } from "../data/features";

export const Route = createFileRoute("/features")({
  head: () =>
    seo({
      title: "Features",
      path: "/features",
      description:
        "Creditor tracking, a 30–70% settlement calculator, snowball timeline, AI negotiation strategy and call scripts, Zest AI Debt Coach, credit repair education, and founder coaching — all in SLICE.",
    }),
  component: Features,
});

function Features() {
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <LayoutGrid className="h-4 w-4" /> Features
          </>
        }
        title="Everything you need to settle debt with confidence."
        subtitle="A complete toolkit — from organizing creditors to generating negotiation scripts and booking real coaching."
      />

      <Section className="bg-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading
          eyebrow="Settlement calculator"
          title="Model your settlement at 30%, 40%, 50%, 60%, or 70%."
          subtitle="One of SLICE's most-loved tools — see your estimated settlement amount and program length instantly."
        />
        <div className="reveal mt-12">
          <Calculator />
        </div>
      </Section>

      <CtaBand title="Ready to put these tools to work?" />
    </>
  );
}
