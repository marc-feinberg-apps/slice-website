import { marked } from "marked";
import { Container } from "./primitives";
import { site } from "../lib/site";

/**
 * Renders a trusted in-repo markdown legal document. Source of truth lives in
 * /docs so legal can edit the .md directly. All placeholders are filled from
 * site config (see `site.legal`) so contact and entity details stay consistent
 * site-wide and are updated in one place.
 */
function fillPlaceholders(md: string): string {
  const domainHost = site.domain.replace(/^https?:\/\//, "");
  return md
    .replaceAll("[slice.cares@slice.com]", site.email)
    .replaceAll("[Insert Contact Email]", site.email)
    .replaceAll("[slice.com]", domainHost)
    .replaceAll("[Insert Website URL]", site.domain)
    .replaceAll("[Insert Privacy Policy URL]", `${site.domain}/privacy`)
    .replaceAll("[Marc Feinberg]", site.founder)
    .replaceAll("[Insert Legal Business Name]", site.legal.businessName)
    .replaceAll("[Insert Business Mailing Address]", site.legal.address)
    .replaceAll("[Insert County and State]", site.legal.venue)
    .replaceAll("[Insert State]", site.legal.state)
    .replaceAll("[Date of Publish]", site.legal.effectiveDate);
}

export function MarkdownDoc({ raw }: { raw: string }) {
  const html = marked.parse(fillPlaceholders(raw), { async: false }) as string;

  return (
    <>
      <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-brand" />
      <Container className="py-12 sm:py-16">
        <article
          className="prose prose-slate max-w-3xl prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-navy-900 prose-h1:text-4xl prose-a:font-semibold prose-a:text-brand prose-strong:text-navy-900 prose-hr:border-orange-100 prose-li:marker:text-brand"
          // Content is our own static, trusted markdown from /docs.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </>
  );
}
