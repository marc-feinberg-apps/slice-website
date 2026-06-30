import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Apple,
  ArrowRight,
  ShieldCheck,
  X,
  Check,
  Star,
  Quote,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { seo } from "../lib/seo";
import { cta, platforms, site } from "../lib/site";
import { Container, Section, SectionHeading, Eyebrow } from "../components/primitives";
import { AnchorButton, LinkButton } from "../components/Button";
import { PhoneMockup } from "../components/PhoneMockup";
import { Calculator } from "../components/Calculator";
import { FeatureCard } from "../components/FeatureCard";
import { PricingCards } from "../components/PricingCards";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBand } from "../components/CtaBand";
import { features } from "../data/features";
import { steps } from "../data/steps";
import { faqs } from "../data/faqs";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      path: "/",
      keywords:
        "debt resolution app, debt settlement, debt negotiation, settlement calculator, get out of debt, debt coaching, AI debt help",
    }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Process />
      <FeaturesSection />
      <CalculatorSection />
      <CoachingSection />
      <PricingSection />
      <TrustSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-orange-100 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_54%)]">
      <Container className="relative grid items-center gap-12 py-14 sm:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-20">
        <div className="reveal flex flex-col items-start gap-6">
          <Eyebrow>
            <Sparkles className="h-4 w-4" /> Now available on iOS
          </Eyebrow>
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            Settle your debt yourself with{" "}
            <span className="text-brand">SLICE on iPhone.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Debt settlement companies charge around{" "}
            <strong className="text-navy-900">25% of your debt</strong> to do
            what you can do yourself. SLICE is live on iOS with tools to
            organize creditors, set settlement targets, save monthly, and
            negotiate with AI scripts and real coaching.
          </p>
          <p className="rounded-xl border-l-4 border-brand bg-orange-50 px-4 py-3 text-base font-bold leading-snug text-navy-900 sm:text-lg">
            Never pay fees to a debt settlement company —{" "}
            <span className="text-brand">settle your own debt with SLICE.</span>
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <AnchorButton
              href={site.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              size="lg"
            >
              <Apple className="h-5 w-5" /> {cta.download}
            </AnchorButton>
            <LinkButton to="/how-it-works" variant="ghost" size="lg">
              {cta.how} <ArrowRight className="h-5 w-5" />
            </LinkButton>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-navy-800 shadow-card">
              <Apple className="h-4 w-4 text-brand" /> {platforms.ios.label} available now
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-muted">
              <Smartphone className="h-4 w-4 text-brand" /> {platforms.android.label} coming soon
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm font-semibold text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand" /> No settlement fees
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" /> Free to start
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" /> Cancel anytime
            </span>
          </div>
        </div>

        <div className="reveal relative flex justify-center pb-16 pt-10 lg:justify-center lg:pb-14 lg:pl-8 lg:pr-16 lg:pt-12">
          <div className="absolute left-4 top-0 z-20 hidden rounded-2xl border border-orange-200 bg-white px-4 py-3 shadow-[0_18px_50px_-18px_rgba(249,115,22,0.75),0_0_0_6px_rgba(249,115,22,0.08)] lg:block">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-[0_0_24px_rgba(249,115,22,0.45)]">
                <Apple className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase text-brand-dark">
                  Live app
                </p>
                <p className="text-sm font-extrabold text-navy-900">
                  Build your plan today
                </p>
              </div>
            </div>
          </div>
          <PhoneMockup />
          <div className="absolute bottom-2 right-2 z-20 hidden max-w-[230px] rounded-2xl border border-orange-200 bg-white px-4 py-3 shadow-[0_18px_50px_-18px_rgba(249,115,22,0.75),0_0_0_6px_rgba(249,115,22,0.08)] sm:block lg:right-0">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-brand shadow-[0_0_24px_rgba(249,115,22,0.35)]">
                <Smartphone className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase text-brand-dark">
                  Platform status
                </p>
                <p className="mt-1 text-sm font-extrabold text-navy-900">
                  iOS now. Android coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------- Problem / Solution */
function ProblemSolution() {
  const them = [
    "Charge ~25% of your enrolled debt",
    "You hand over control of your money",
    "Fees whether or not they settle favorably",
    "One-size-fits-all process",
  ];
  const us = [
    "Flat low monthly price — keep your savings",
    "You stay in full control, start to finish",
    "AI strategy + scripts built for each creditor",
    "A custom program based on your numbers",
  ];

  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="The problem"
        title="The old way to settle debt costs a fortune."
        subtitle="On $30,000 of debt, a 25% fee is $7,500 — gone. SLICE flips the model so that money stays in your pocket."
      />
      <div className="reveal mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-[1.25rem] border border-red-100 bg-red-50/50 p-7">
          <h3 className="flex items-center gap-2 text-xl font-extrabold text-navy-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500">
              <X className="h-5 w-5" />
            </span>
            Settlement companies
          </h3>
          <ul className="mt-5 space-y-3">
            {them.map((t) => (
              <li key={t} className="flex items-start gap-3 text-navy-700">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.25rem] border border-brand bg-orange-50/60 p-7 shadow-card">
          <h3 className="flex items-center gap-2 text-xl font-extrabold text-navy-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
              <Check className="h-5 w-5" />
            </span>
            With SLICE
          </h3>
          <ul className="mt-5 space-y-3">
            {us.map((t) => (
              <li key={t} className="flex items-start gap-3 text-navy-800">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- 3 steps */
function Process() {
  return (
    <Section className="bg-cream" id="how">
      <SectionHeading
        eyebrow="How it works"
        title="Become debt-free in 3 simple steps."
        subtitle="No spreadsheets, no guesswork. SLICE walks you through the whole journey."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="reveal relative rounded-[1.25rem] border border-orange-100 bg-white p-7 shadow-card"
            >
              <span className="absolute right-6 top-5 text-5xl font-extrabold text-orange-100">
                {step.number}
              </span>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="reveal mt-10 text-center">
        <LinkButton to="/how-it-works" variant="ghost" size="md">
          {cta.how} <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- Features */
function FeaturesSection() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Everything in one app"
        title="Powerful tools for every step of your debt journey."
        subtitle="From your first creditor list to your final settled account, SLICE has a tool for it."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.slice(0, 6).map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
      <div className="reveal mt-10 text-center">
        <LinkButton to="/features" variant="ghost" size="md">
          See all features <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </Section>
  );
}

/* ------------------------------------------------ Calculator preview */
function CalculatorSection() {
  return (
    <Section className="bg-cream" id="calculator">
      <SectionHeading
        eyebrow="Try it now"
        title="See what you could save in seconds."
        subtitle="Enter your debt, pick a settlement target, and set your monthly savings. SLICE estimates your settlement amount and program length instantly."
      />
      <div className="reveal mt-12">
        <Calculator />
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- Coaching */
function CoachingSection() {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>
            <Star className="h-4 w-4" /> Founder coaching
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
            Real guidance from founder Marc Feinberg.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            AI gets you a plan — people get you across the finish line. On Gold
            and Platinum, book coaching with SLICE founder Marc Feinberg and tap
            his mastermind and coaching network for personalized support.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Founder coaching sessions",
              "Mastermind & accountability",
              "Platinum: quarterly done-with-you creditor calls",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-navy-800">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <LinkButton to="/coaching" size="md">
              Explore coaching <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        <div className="reveal">
          <div className="relative rounded-[1.5rem] border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-8 shadow-soft">
            <Quote className="h-10 w-10 text-orange-300" />
            <p className="mt-4 text-xl font-semibold leading-relaxed text-navy-900">
              "My mission is simple: give people the same tools and confidence
              the pros use, so they keep their money and take back control of
              their financial future."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <img
                src="/assets/marc/marc-portrait.jpeg"
                alt="Marc Feinberg"
                className="h-14 w-14 rounded-full object-cover shadow-soft"
              />
              <div>
                <p className="font-extrabold text-navy-900">Marc Feinberg</p>
                <p className="text-sm text-muted">Founder & Debt Coach, SLICE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------------------------- Pricing preview */
function PricingSection() {
  return (
    <Section className="bg-cream" id="pricing">
      <SectionHeading
        eyebrow="Simple pricing"
        title="Start free. Upgrade when you're ready."
        subtitle="Four plans that grow with you — from getting organized to done-with-you creditor calls."
      />
      <div className="mt-12">
        <PricingCards />
      </div>
      <div className="reveal mt-10 text-center">
        <Link
          to="/pricing"
          className="font-bold text-brand underline-offset-4 hover:underline"
        >
          Compare all plan details →
        </Link>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------- Trust */
function TrustSection() {
  return (
    <Section className="bg-white">
      <div className="reveal mx-auto max-w-3xl rounded-[1.5rem] border border-orange-100 bg-orange-50/50 p-8 text-center sm:p-10">
        <ShieldCheck className="mx-auto h-12 w-12 text-brand" />
        <h2 className="mt-4 text-2xl font-extrabold text-navy-900">
          Honest, transparent, and on your side.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          SLICE is not a law firm and does not provide legal, tax, or financial
          advice. We do not guarantee that debts will be settled, that creditors
          will negotiate, that any specific settlement amount will be reached, or
          that your credit score will improve. Debt settlement can have negative
          credit and tax consequences. Our tools are for educational and
          organizational use — always consult a licensed professional for advice.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------- FAQ */
function FaqSection() {
  return (
    <Section className="bg-cream">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered."
        subtitle="Everything you need to know before you start your SLICE program."
      />
      <div className="mt-12">
        <FaqAccordion items={faqs.slice(0, 6)} />
      </div>
      <div className="reveal mt-8 text-center">
        <Link
          to="/faq"
          className="font-bold text-brand underline-offset-4 hover:underline"
        >
          See all FAQs →
        </Link>
      </div>
    </Section>
  );
}
