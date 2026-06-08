import type { ReactNode } from "react";
import { Container, Eyebrow } from "./primitives";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <Container className="relative py-16 text-center sm:py-20">
        <div className="reveal mx-auto flex max-w-3xl flex-col items-center gap-5">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
