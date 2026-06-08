import { Link } from "@tanstack/react-router";
import { site } from "../lib/site";

/**
 * The SLICE mark: the official bright orange citrus slice with a bite taken out
 * of the top-right edge and a juice splash. Rendered from the brand PNG asset
 * (transparent background, so it sits on light or dark surfaces).
 */
export function LogoMark({
  className = "",
  title = "SLICE logo",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <img
      src="/assets/logo/slice-logo-mark-512.png"
      alt={title}
      className={`object-contain ${className}`}
      width={512}
      height={512}
      loading="eager"
      decoding="async"
    />
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
