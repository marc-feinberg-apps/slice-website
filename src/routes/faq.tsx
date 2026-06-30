import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { seo } from "../lib/seo";
import { Section } from "../components/primitives";
import { PageHeader } from "../components/PageHeader";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBand } from "../components/CtaBand";
import { faqs } from "../data/faqs";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => {
    const base = seo({
      title: "FAQ",
      path: "/faq",
      description:
        "Answers to common questions about SLICE: how it differs from settlement companies, guarantees, the calculator, Juici AI coach, pricing, and more.",
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
    };
  },
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <HelpCircle className="h-4 w-4" /> FAQ
          </>
        }
        title="Frequently asked questions."
        subtitle="Can't find what you're looking for? Reach out and our team will help."
      />
      <Section className="bg-white">
        <FaqAccordion items={faqs} />
      </Section>
      <CtaBand title="Still have questions?" subtitle="Download SLICE on iOS or contact support — there's no risk and no settlement fees." />
    </>
  );
}
