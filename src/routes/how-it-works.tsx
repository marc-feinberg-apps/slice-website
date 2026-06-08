import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Check } from "lucide-react";
import { seo } from "../lib/seo";
import { Section, SectionHeading } from "../components/primitives";
import { PageHeader } from "../components/PageHeader";
import { Calculator } from "../components/Calculator";
import { CtaBand } from "../components/CtaBand";
import { steps } from "../data/steps";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    seo({
      title: "How It Works",
      path: "/how-it-works",
      description:
        "See how SLICE helps you organize creditors, set settlement targets, save monthly, and negotiate debt yourself in three simple steps.",
    }),
  component: HowItWorks,
});

const details = [
  {
    title: "Build your customized program",
    points: [
      "Answer a short onboarding questionnaire",
      "Add creditors, balances, and account details",
      "Get a debt resolution plan tailored to your budget",
    ],
  },
  {
    title: "Plan your settlements",
    points: [
      "Set settlement targets from 30% to 70%",
      "Calculate the monthly savings you need",
      "Follow a snowball timeline to your debt-free date",
    ],
  },
  {
    title: "Negotiate and settle",
    points: [
      "Generate AI negotiation strategies per creditor",
      "Use customized AI call scripts on every call",
      "Lean on Zest AI coach and founder coaching",
    ],
  },
];

function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <Sparkles className="h-4 w-4" /> The SLICE method
          </>
        }
        title="Your path to debt-free, step by step."
        subtitle="SLICE turns a stressful, confusing process into three clear, repeatable steps you can actually follow."
      />

      <Section className="bg-white">
        <div className="space-y-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const detail = details[i];
            const reverse = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={`reveal grid items-center gap-8 lg:grid-cols-2 ${
                  reverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="inline-flex items-center gap-3 text-brand">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="text-5xl font-extrabold text-orange-200">
                      {step.number}
                    </span>
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold text-navy-900 sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-orange-100 bg-cream p-7 shadow-card">
                  <h3 className="font-extrabold text-navy-900">
                    {detail.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {detail.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-navy-800"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading
          eyebrow="Try the math"
          title="Estimate your settlement and timeline."
          subtitle="Plug in your numbers to preview what your program could look like."
        />
        <div className="reveal mt-12">
          <Calculator />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
