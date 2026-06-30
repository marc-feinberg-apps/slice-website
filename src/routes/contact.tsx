import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { seo } from "../lib/seo";
import { Section } from "../components/primitives";
import { PageHeader } from "../components/PageHeader";
import { ContactForm } from "../components/ContactForm";
import { site, cta } from "../lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact & Support",
      path: "/contact",
      description:
        "Contact the SLICE support team. We respond within 2 business days.",
    }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow={
          <>
            <MessageCircle className="h-4 w-4" /> Contact & support
          </>
        }
        title="We're here to help."
        subtitle="Questions about the app, your account, pricing, or coaching? Send us a message and we'll reply within 2 business days."
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="reveal rounded-[1.5rem] border border-orange-100 bg-white p-7 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-white">
                <Mail className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-extrabold text-navy-900">
                Send a message
              </h2>
            </div>
            <p className="mt-3 text-muted">
              Questions about features, pricing, or your account? We'd love to
              hear from you.
            </p>
            <div className="mt-6">
              <ContactForm buttonLabel={cta.contact} />
            </div>
          </div>

          <div className="reveal mt-10 text-center text-muted">
            Prefer email? Reach us anytime at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-bold text-brand underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </div>
        </div>
      </Section>
    </>
  );
}
