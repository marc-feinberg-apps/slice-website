import { TrendingDown, Check } from "lucide-react";
import { LogoMark } from "./Logo";

/**
 * A lightweight CSS phone mockup showing a SLICE app dashboard. No images, so
 * it loads instantly and scales crisply on every device.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  const creditors = [
    { name: "Chase Card", balance: "$8,200", target: "$4,100", done: true },
    { name: "Capital One", balance: "$5,400", target: "$2,700", done: true },
    { name: "Discover", balance: "$6,900", target: "$3,450", done: false },
    { name: "Medical Bill", balance: "$4,500", target: "$2,250", done: false },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[270px] rounded-[2.5rem] border-[10px] border-navy-900 bg-navy-900 shadow-2xl sm:w-[300px]">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-navy-900" />
        <div className="overflow-hidden rounded-[1.9rem] bg-cream">
          {/* app header */}
          <div className="flex items-center justify-between bg-brand px-5 pb-4 pt-7 text-white">
            <div className="flex items-center gap-2">
              <LogoMark className="h-7 w-7" />
              <span className="text-lg font-extrabold">SLICE</span>
            </div>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold">
              GOLD
            </span>
          </div>

          {/* progress card */}
          <div className="px-4 pt-4">
            <div className="rounded-2xl bg-navy-900 p-4 text-white">
              <p className="text-[11px] uppercase tracking-wide text-orange-300">
                Debt resolved
              </p>
              <div className="mt-1 flex items-end justify-between">
                <span className="text-2xl font-extrabold">52%</span>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingDown className="h-3.5 w-3.5" /> on track
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[52%] rounded-full bg-brand" />
              </div>
            </div>
          </div>

          {/* creditor list */}
          <div className="px-4 py-4">
            <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wide text-muted">
              Your creditors
            </p>
            <div className="space-y-2">
              {creditors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${
                        c.done ? "bg-emerald-500" : "bg-orange-200"
                      }`}
                    >
                      {c.done ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-[10px] font-bold text-brand-dark">
                          ◷
                        </span>
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-navy-900">{c.name}</p>
                      <p className="text-[10px] text-muted line-through">
                        {c.balance}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-brand">
                    {c.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* floating savings badge */}
      <div className="animate-[float_6s_ease-in-out_infinite] absolute -right-2 top-16 rounded-2xl bg-white px-4 py-3 shadow-soft sm:-right-6">
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
          You saved
        </p>
        <p className="text-xl font-extrabold text-brand">$13,300</p>
      </div>
    </div>
  );
}
