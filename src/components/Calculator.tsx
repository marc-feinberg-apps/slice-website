import { useMemo, useState } from "react";
import { TrendingDown, CalendarClock, PiggyBank } from "lucide-react";
import { calculateSettlement, usd, formatDuration } from "../lib/calculator";
import { LinkButton } from "./Button";
import { cta } from "../lib/site";

const PCTS = [30, 40, 50, 60, 70];

export function Calculator({
  defaultDebt = 25000,
  defaultPct = 50,
  defaultMonthly = 500,
  showCta = true,
}: {
  defaultDebt?: number;
  defaultPct?: number;
  defaultMonthly?: number;
  showCta?: boolean;
}) {
  const [debt, setDebt] = useState(defaultDebt);
  const [targetPct, setTargetPct] = useState(defaultPct);
  const [monthlySavings, setMonthlySavings] = useState(defaultMonthly);

  const result = useMemo(
    () => calculateSettlement({ debt, targetPct, monthlySavings }),
    [debt, targetPct, monthlySavings],
  );

  return (
    <div className="grid gap-6 rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="flex flex-col gap-6">
        <Field
          id="calc-debt"
          label="Total debt amount"
          prefix="$"
          value={debt}
          min={0}
          step={500}
          onChange={setDebt}
        />

        <div>
          <span className="mb-2 block text-sm font-bold text-navy-900">
            Target settlement
          </span>
          <div
            className="grid grid-cols-5 gap-2"
            role="group"
            aria-label="Target settlement percentage"
          >
            {PCTS.map((p) => {
              const active = p === targetPct;
              return (
                <button
                  key={p}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTargetPct(p)}
                  className={`rounded-xl py-2.5 text-sm font-bold transition-all ${
                    active
                      ? "bg-brand text-white shadow-[0_6px_16px_-6px_rgba(249,115,22,0.7)]"
                      : "bg-orange-50 text-brand-dark hover:bg-orange-100"
                  }`}
                >
                  {p}%
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted">
            Settle each debt for {targetPct}% of what you owe.
          </p>
        </div>

        <Field
          id="calc-monthly"
          label="Monthly savings"
          prefix="$"
          value={monthlySavings}
          min={0}
          step={50}
          onChange={setMonthlySavings}
        />
      </div>

      {/* Results */}
      <div className="flex flex-col justify-between gap-5 rounded-2xl bg-navy-900 p-6 text-white">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
            Your estimate
          </p>
          <div className="mt-4 space-y-4">
            <Stat
              icon={<TrendingDown className="h-5 w-5" />}
              label="Estimated settlement"
              value={usd(result.settlementAmount)}
            />
            <Stat
              icon={<PiggyBank className="h-5 w-5" />}
              label="You could save"
              value={usd(result.savings)}
              accent
            />
            <Stat
              icon={<CalendarClock className="h-5 w-5" />}
              label="Program length"
              value={
                result.months > 0 ? formatDuration(result.months) : "Add savings"
              }
            />
          </div>
        </div>

        {showCta ? (
          <LinkButton to="/pricing" variant="primary" size="md" className="w-full">
            {cta.start}
          </LinkButton>
        ) : null}

        <p className="text-[11px] leading-relaxed text-white/60">
          Estimates only. SLICE does not guarantee settlements, amounts, or
          timelines. Actual results depend on your creditors and finances.
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  prefix,
  value,
  min,
  step,
  onChange,
}: {
  id: string;
  label: string;
  prefix?: string;
  value: number;
  min: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-navy-900">
        {label}
      </label>
      <div className="flex items-center rounded-xl border-2 border-orange-100 bg-orange-50/40 px-4 py-1 focus-within:border-brand">
        {prefix ? (
          <span className="text-lg font-bold text-muted">{prefix}</span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          step={step}
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent px-2 py-2.5 text-lg font-bold text-navy-900 outline-none"
        />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
      <span className="flex items-center gap-2 text-sm text-white/70">
        <span className="text-orange-300">{icon}</span>
        {label}
      </span>
      <span
        className={`text-2xl font-extrabold tabular-nums ${
          accent ? "text-orange-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
