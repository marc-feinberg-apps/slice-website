import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";
import { Container } from "./primitives";
import { nav, cta } from "../lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100/70 bg-white/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-18">
          <Logo />

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-navy-700 transition-colors hover:text-brand"
                activeProps={{ className: "text-brand" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LinkButton to="/pricing" variant="primary" size="sm">
              {cta.start}
            </LinkButton>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy-900 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-orange-100 bg-white lg:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-navy-800 hover:bg-orange-50"
                  activeProps={{ className: "text-brand bg-orange-50" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <LinkButton to="/pricing" variant="primary" size="md">
                  {cta.start}
                </LinkButton>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
