import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { plans, YEARLY_DISCOUNT } from "../data/pricing";
import { LinkButton } from "./Button";

const BOOK_FEATURE = "Copy of our book Debt Settlements: Dirty Little Secrets";
const BOOK_URL =
  "https://www.amazon.com/Debt-Settlements-Dirty-Little-Secrets/dp/B0FLXSV3XD/";

type Billing = "monthly" | "yearly";

/** Renders a feature line, linking the book title out to Amazon. */
function Feature({ text, highlight }: { text: string; highlight?: boolean }) {
  const textClass = highlight ? "text-white/90" : "text-navy-700";
  if (text === BOOK_FEATURE) {
    return (
      <span className={textClass}>
        Copy of our book{" "}
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold underline underline-offset-2 ${
            highlight ? "text-orange-300 hover:text-orange-200" : "text-brand hover:text-brand-dark"
          }`}
        >
          Debt Settlements: Dirty Little Secrets
        </a>
      </span>
    );
  }
  return <span className={textClass}>{text}</span>;
}

export function PricingCards() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const yearly = billing === "yearly";

  return (
    <div>
      <div className="reveal mb-10 flex flex-col items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 p-1">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              className={`rounded-full px-5 py-2 text-sm font-bold capitalize transition-all duration-200 ${
                billing === option
                  ? "bg-brand text-white shadow-soft"
                  : "text-brand-dark hover:text-brand"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-sm font-semibold text-brand-dark">
          Pay yearly in full and save 20% — that's 2 months free.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const highlight = plan.highlight;
          const free = plan.monthly === 0;

          let price: string;
          let cadence: string;
          if (free) {
            price = "$0";
            cadence = "forever";
          } else if (yearly) {
            price = `$${(plan.monthly * (1 - YEARLY_DISCOUNT)).toFixed(2)}`;
            cadence = "per month";
          } else {
            price = `$${plan.monthly}`;
            cadence = "per month";
          }

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
                  {price}
                </span>
                <span
                  className={`text-sm font-medium ${
                    highlight ? "text-white/60" : "text-muted"
                  }`}
                >
                  /{cadence}
                </span>
              </div>
              {yearly && !free ? (
                <p
                  className={`mt-1 text-xs font-semibold ${
                    highlight ? "text-orange-300" : "text-brand-dark"
                  }`}
                >
                  Billed annually at ${Math.round(plan.monthly * 12 * (1 - YEARLY_DISCOUNT))} · save 20%
                </p>
              ) : null}
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
                    <Feature text={f} highlight={highlight} />
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
    </div>
  );
}
