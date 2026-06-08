import { Link } from "@tanstack/react-router";
import { site } from "../lib/site";

/**
 * The SLICE mark: a bright orange citrus slice with a bite taken out of the
 * top-right edge. Pure SVG so it stays crisp at any size and adds no weight.
 */
export function LogoMark({
  className = "",
  title = "SLICE logo",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* The bite: subtract a circle from the top-right of the orange */}
        <mask id="slice-bite">
          <rect width="64" height="64" fill="white" />
          <circle cx="58" cy="10" r="13" fill="black" />
        </mask>
        <linearGradient id="slice-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <g mask="url(#slice-bite)">
        {/* Rind */}
        <circle cx="30" cy="34" r="26" fill="url(#slice-grad)" />
        {/* Inner flesh */}
        <circle cx="30" cy="34" r="20" fill="#ffedd5" />
        {/* Citrus segments */}
        <g stroke="#fb923c" strokeWidth="2.4" strokeLinecap="round">
          <line x1="30" y1="34" x2="30" y2="14" />
          <line x1="30" y1="34" x2="30" y2="54" />
          <line x1="30" y1="34" x2="10" y2="34" />
          <line x1="30" y1="34" x2="50" y2="34" />
          <line x1="30" y1="34" x2="44.5" y2="19.5" />
          <line x1="30" y1="34" x2="15.5" y2="48.5" />
          <line x1="30" y1="34" x2="15.5" y2="19.5" />
          <line x1="30" y1="34" x2="44.5" y2="48.5" />
        </g>
        <circle cx="30" cy="34" r="3.4" fill="#f97316" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}
      aria-label={`${site.name} home`}
    >
      <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="text-2xl text-navy-900">
        SL<span className="text-brand">I</span>CE
      </span>
    </Link>
  );
}
