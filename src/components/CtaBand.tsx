import { Apple, Smartphone } from "lucide-react";
import { Container } from "./primitives";
import { AnchorButton, LinkButton } from "./Button";
import { cta, platforms, site } from "../lib/site";

export function CtaBand({
  title = "Take your first bite out of debt today.",
  subtitle = "Download SLICE on iOS and start your debt program in minutes. Upgrade only when you're ready to negotiate.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center shadow-soft sm:px-12 sm:py-16">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              {subtitle}
            </p>
            <p className="mx-auto mt-5 max-w-xl rounded-xl bg-white/15 px-4 py-3 text-base font-bold text-white sm:text-lg">
              {site.pledge}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AnchorButton
                href={site.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                variant="white"
                size="lg"
              >
                <Apple className="h-5 w-5" /> {cta.download}
              </AnchorButton>
              <LinkButton to="/pricing" variant="secondary" size="lg">
                {cta.start}
              </LinkButton>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                <Apple className="h-4 w-4" /> {platforms.ios.label} available now
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white/75">
                <Smartphone className="h-4 w-4" /> {platforms.android.label} coming soon
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
