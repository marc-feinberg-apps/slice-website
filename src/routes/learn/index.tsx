import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Clock } from "lucide-react";
import { seo } from "../../lib/seo";
import { Container, Eyebrow } from "../../components/primitives";

export const Route = createFileRoute("/learn/")({
  head: () =>
    seo({
      title: "Debt-Free Academy – Coming Soon",
      path: "/learn",
      description:
        "Level-by-level video lessons that teach you how to settle your debt and stay debt-free. Coming soon.",
    }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-20 sm:py-32">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-brand">
            <GraduationCap className="h-10 w-10" />
          </div>

          <div className="mt-8">
            <Eyebrow>
              <Clock className="h-4 w-4" /> Coming Soon
            </Eyebrow>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Debt-Free Academy
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
            We're putting the finishing touches on our video lessons. The Academy
            will walk you through settling your debt level by level — check back
            soon.
          </p>
        </div>
      </Container>
    </section>
  );
}
