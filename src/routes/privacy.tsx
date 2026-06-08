import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../lib/seo";
import { LegalLayout } from "../components/LegalLayout";
import { site } from "../lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy",
      path: "/privacy",
      description:
        "How SLICE collects, uses, and protects your personal and financial information.",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 8, 2026">
      <p>
        This Privacy Policy explains how {site.name} ("SLICE," "we," "us," or
        "our") collects, uses, and protects information when you use our website
        and mobile application (together, the "Services"). By using the Services,
        you agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide:</strong> name, email address, and any
          details you enter such as creditor names, balances, budgets, and
          settlement targets.
        </li>
        <li>
          <strong>Account &amp; subscription data:</strong> plan tier and
          billing status (payments are processed by third-party providers; we do
          not store full card numbers).
        </li>
        <li>
          <strong>Usage &amp; device data:</strong> app interactions, device
          type, and similar analytics used to improve the Services.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To provide, personalize, and improve the Services.</li>
        <li>
          To generate your debt program, calculators, timelines, and AI scripts.
        </li>
        <li>To communicate with you about your account and support requests.</li>
        <li>To process subscriptions and prevent fraud or abuse.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We share data only with service
        providers who help us operate the Services (for example, hosting,
        analytics, payments, email, and AI processing) under appropriate
        confidentiality and security obligations, or when required by law.
      </p>

      <h2>Data security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards to
        protect your information. No method of transmission or storage is 100%
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>Your choices &amp; rights</h2>
      <p>
        You may access, update, or request deletion of your information, and you
        may opt out of marketing emails at any time. Depending on your location,
        you may have additional rights under applicable privacy laws. To exercise
        any rights, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Children's privacy</h2>
      <p>
        The Services are not directed to individuals under 18, and we do not
        knowingly collect information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will
        be posted here with an updated date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <p>
        <em>
          This document is provided for general informational purposes and is not
          legal advice. Consult a licensed attorney before relying on it.
        </em>
      </p>
    </LegalLayout>
  );
}
