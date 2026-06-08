import { Check, Sparkles } from "lucide-react";
import { plans } from "../data/pricing";
import { LinkButton } from "./Button";

export function PricingCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {plans.map((plan) => {
        const highlight = plan.highlight;
        return (
          <div
            key={plan.name}
            className={`reveal relative flex flex-col rounded-[1.25rem] border p-6 transition-all duration-300 hover:-translate-y-1 ${
              highlight
                ? "border-brand bg-navy-900 text-white shadow-soft"
                : "border-orange-100 bg-white text-navy-900 shadow-card"
            }`}
          >
            {highlight ? (
              <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                <Sparkles className="h-3.5 w-3.5" /> Most popular
              </span>
            ) : null}

            <h3 className="text-lg font-extrabold">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight">
                {plan.price}
              </span>
              <span
                className={`text-sm font-medium ${
                  highlight ? "text-white/60" : "text-muted"
                }`}
              >
                /{plan.cadence}
              </span>
            </div>
            <p
              className={`mt-2 text-sm ${
                highlight ? "text-white/70" : "text-muted"
              }`}
            >
              {plan.tagline}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                      highlight ? "text-orange-400" : "text-brand"
                    }`}
                  />
                  <span className={highlight ? "text-white/90" : "text-navy-700"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <LinkButton
              to="/contact"
              variant={highlight ? "primary" : plan.name === "Free" ? "ghost" : "secondary"}
              size="md"
              className="mt-6 w-full"
            >
              {plan.cta}
            </LinkButton>
          </div>
        );
      })}
    </div>
  );
}
