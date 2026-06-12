import { createFileRoute } from "@tanstack/react-router";
import {
  Star,
  Quote,
  Users,
  Calculator as CalcIcon,
  PhoneCall,
  Bot,
  Check,
} from "lucide-react";
import { seo } from "../lib/seo";
import { Section, SectionHeading, Card } from "../components/primitives";
import { PageHeader } from "../components/PageHeader";
import { LinkButton } from "../components/Button";
import { CtaBand } from "../components/CtaBand";
import { site } from "../lib/site";

export const Route = createFileRoute("/coaching")({
  head: () =>
    seo({
      title: "Founder Coaching with Marc Feinberg",
      path: "/coaching",
      description:
        "Book founder coaching with SLICE's Marc Feinberg. Get mastermind support, tax advisory booking, the Zest AI Debt Coach, and live done-with-you creditor calls on Gold and Platinum.",
    }),
  component: Coaching,
});

const offerings = [
  {
    icon: Star,
    title: "1:1 founder coaching",
    description:
      "Sit down with Marc Feinberg for personalized strategy on your toughest creditors and your overall plan.",
    tier: "Gold & Platinum",
  },
  {
    icon: Users,
    title: "Mastermind & accountability",
    description:
      "Join a community of people resolving debt together, with group sessions to keep you motivated and on track.",
    tier: "Gold & Platinum",
  },
  {
    icon: CalcIcon,
    title: "Tax advisory booking",
    description:
      "Settled debt can have tax implications. Book time with a tax professional in Marc's network to plan ahead.",
    tier: "Gold & Platinum",
  },
  {
    icon: Bot,
    title: "Zest AI Debt Coach",
    description:
      "Between sessions, Zest answers questions 24/7, drafts scripts, and keeps your momentum going.",
    tier: "Silver and up",
  },
  {
    icon: PhoneCall,
    title: "Done-with-you creditor calls",
    description:
      "On Platinum, get live support on real creditor calls so you never have to negotiate alone.",
    tier: "Platinum",
  },
  {
    icon: Star,
    title: "Priority founder coaching",
    description:
      "Platinum members get priority scheduling and faster responses for time-sensitive negotiations.",
    tier: "Platinum",
  },
];

function Coaching() {
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <Star className="h-4 w-4" /> Founder coaching
          </>
        }
        title="You don't have to do this alone."
        subtitle="SLICE pairs powerful AI tools with real human guidance from founder Marc Feinberg and his expert network."
      />

      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="reveal">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-orange-100 bg-gradient-to-br from-orange-100 to-orange-50 p-8 shadow-soft">
              <div className="flex items-center gap-4">
                <img
                  src="/assets/marc/marc-portrait.jpeg"
                  alt="Marc Feinberg"
                  className="h-20 w-20 rounded-full object-cover shadow-soft"
                />
                <div>
                  <p className="text-xl font-extrabold text-navy-900">
                    Marc Feinberg
                  </p>
                  <p className="text-sm font-semibold text-brand-dark">
                    Founder & Debt Coach
                  </p>
                </div>
              </div>
              <Quote className="mt-6 h-9 w-9 text-orange-300" />
              <p className="mt-3 text-lg font-semibold leading-relaxed text-navy-900">
                "I built SLICE because too many people pay a quarter of their
                debt to companies for something they can do themselves with the
                right tools and a little guidance. My job is to give you both."
              </p>
            </div>
          </div>

          <div className="reveal">
            <SectionHeading
              align="left"
              eyebrow="Why coaching matters"
              title="Tools get you started. Coaching gets you finished."
              subtitle="Negotiating debt is as much about mindset and confidence as it is about numbers. Founder coaching helps you stay the course and make smart calls at every step."
            />
            <div className="mt-8">
              <LinkButton to="/pricing" size="lg">
                See coaching plans
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading
          eyebrow="What's included"
          title="Coaching & guidance options."
          subtitle="Unlock more human support as you move from Silver to Platinum."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => {
            const Icon = o.icon;
            return (
              <Card key={o.title} className="reveal flex flex-col gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">
                    {o.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {o.description}
                  </p>
                </div>
                <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1 text-xs font-bold text-white">
                  <Check className="h-3.5 w-3.5" /> {o.tier}
                </span>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="reveal mx-auto max-w-3xl rounded-2xl border border-orange-100 bg-orange-50/50 p-6 text-center text-sm leading-relaxed text-muted">
          Coaching with {site.founder} provides general educational guidance and
          accountability only. It is not legal, tax, or financial advice, and no
          outcome is guaranteed. For advice specific to your situation, consult a
          licensed attorney, tax professional, or financial advisor.
        </div>
      </Section>

      <CtaBand title="Get tools and a coach in your corner." />
    </>
  );
}
