import { Apple, Smartphone } from "lucide-react";
import { Container } from "./primitives";
import { LinkButton, AnchorButton } from "./Button";
import { cta } from "../lib/site";

export function CtaBand({
  title = "Take your first bite out of debt today.",
  subtitle = "Start free in minutes. Upgrade only when you're ready to negotiate. No settlement company fees, ever.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center shadow-soft sm:px-12 sm:py-16">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton to="/pricing" variant="white" size="lg">
                {cta.start}
              </LinkButton>
              <LinkButton to="/contact" variant="secondary" size="lg">
                {cta.waitlist}
              </LinkButton>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
              <AnchorButton
                href="#"
                variant="ghost"
                size="sm"
                className="bg-white/15 text-white hover:bg-white/25"
              >
                <Apple className="h-4 w-4" /> App Store
              </AnchorButton>
              <AnchorButton
                href="#"
                variant="ghost"
                size="sm"
                className="bg-white/15 text-white hover:bg-white/25"
              >
                <Smartphone className="h-4 w-4" /> Google Play
              </AnchorButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
