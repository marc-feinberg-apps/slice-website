import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3.5 py-1.5 text-sm font-bold uppercase tracking-wide text-brand-dark">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div
      className={`reveal flex max-w-2xl flex-col gap-4 ${alignment} ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-lg leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.25rem] border border-orange-100/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
