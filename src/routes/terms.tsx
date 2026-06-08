import { createFileRoute } from "@tanstack/react-router";
import { seo } from "../lib/seo";
import { LegalLayout } from "../components/LegalLayout";
import { site } from "../lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms & Conditions",
      path: "/terms",
      description:
        "The terms and conditions governing your use of the SLICE website and app.",
    }),
  component: Terms,
});

function Terms() {
  return (
    <LegalLayout title="Terms &amp; Conditions" updated="June 8, 2026">
      <p>
        These Terms &amp; Conditions ("Terms") govern your access to and use of
        the {site.name} website and mobile application (the "Services"). By using
        the Services, you agree to these Terms. If you do not agree, do not use
        the Services.
      </p>

      <h2>Not legal, tax, or financial advice</h2>
      <p>
        <strong>
          SLICE is not a law firm, debt settlement company, credit repair
          organization, or financial advisor, and does not provide legal, tax,
          accounting, or financial advice.
        </strong>{" "}
        The Services provide educational content and self-service tools to help
        you organize information and make your own decisions. Always consult a
        licensed professional for advice specific to your situation.
      </p>

      <h2>No guarantees</h2>
      <p>
        SLICE does <strong>not</strong> guarantee that any creditor will
        negotiate or settle, that any particular settlement amount or percentage
        will be achieved, that you will become debt-free, or that your credit
        score will improve. Debt settlement may have negative consequences,
        including damage to your credit, collection activity, lawsuits, and tax
        liability on forgiven amounts. Results depend on your individual
        circumstances and your creditors.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>
          You are solely responsible for your financial decisions and any
          communications or agreements you make with creditors.
        </li>
        <li>
          You agree to provide accurate information and to keep your account
          credentials secure.
        </li>
        <li>
          You agree not to misuse the Services or use them for any unlawful
          purpose.
        </li>
      </ul>

      <h2>AI-generated content</h2>
      <p>
        Negotiation strategies, call scripts, and coaching responses may be
        generated using artificial intelligence. AI output may contain errors and
        is provided for informational purposes only. Review all content before
        relying on it.
      </p>

      <h2>Subscriptions &amp; billing</h2>
      <p>
        Paid plans (Silver, Gold, and Platinum) are billed on a recurring basis
        until canceled. You may cancel at any time; cancellation takes effect at
        the end of the current billing period. Fees are non-refundable except
        where required by law. Prices are subject to change with notice.
      </p>

      <h2>Coaching services</h2>
      <p>
        Coaching, mastermind, tax-advisory booking, and done-with-you calls
        provide general guidance and accountability only and do not create a
        professional, fiduciary, attorney-client, or advisor-client relationship.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, SLICE and its affiliates will not
        be liable for any indirect, incidental, special, consequential, or
        punitive damages, or for any loss arising from your use of the Services.
        The Services are provided "as is" without warranties of any kind.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the
        Services after changes take effect constitutes acceptance of the revised
        Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
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
