import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "../data/faqs";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-orange-100 overflow-hidden rounded-[1.25rem] border border-orange-100 bg-white shadow-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="reveal">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-orange-50/50 sm:px-6"
              >
                <span className="text-base font-bold text-navy-900 sm:text-lg">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-brand transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-base leading-relaxed text-muted sm:px-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
