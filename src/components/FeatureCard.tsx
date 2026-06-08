import type { Feature } from "../data/features";

const tierStyles: Record<Feature["tier"], string> = {
  Free: "bg-emerald-100 text-emerald-700",
  Silver: "bg-slate-200 text-slate-700",
  Gold: "bg-amber-100 text-amber-700",
  Platinum: "bg-violet-100 text-violet-700",
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, title, description, tier } = feature;
  return (
    <div className="reveal group flex flex-col gap-4 rounded-[1.25rem] border border-orange-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          <Icon className="h-6 w-6" />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${tierStyles[tier]}`}
        >
          {tier}
        </span>
      </div>
      <h3 className="text-lg font-extrabold text-navy-900">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
