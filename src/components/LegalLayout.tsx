import type { ReactNode } from "react";
import { Container } from "./primitives";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-orange-100 bg-gradient-to-b from-orange-50 to-white">
        <Container className="py-14 sm:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm font-semibold text-muted">
            Last updated: {updated}
          </p>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <article className="prose prose-slate max-w-3xl prose-headings:font-extrabold prose-headings:text-navy-900 prose-a:text-brand prose-strong:text-navy-900">
          {children}
        </article>
      </Container>
    </>
  );
}
