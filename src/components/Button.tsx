import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-all duration-200 focus-visible:outline-none active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_8px_24px_-8px_rgba(249,115,22,0.7)] hover:bg-brand-dark hover:shadow-[0_12px_28px_-8px_rgba(249,115,22,0.8)] hover:-translate-y-0.5",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 shadow-soft",
  ghost:
    "bg-orange-50 text-brand-dark hover:bg-orange-100 border border-orange-200",
  white:
    "bg-white text-navy-900 hover:bg-orange-50 shadow-soft hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & {
  to: string;
  hash?: string;
};

/** Internal navigation button using TanStack Router Link */
export function LinkButton({
  to,
  hash,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      hash={hash}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** External / app-store button using a plain anchor */
export function AnchorButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
