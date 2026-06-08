import { Link } from "@tanstack/react-router";
import { LogoMark } from "./Logo";
import { Container } from "./primitives";
import { site, nav } from "../lib/site";

const legal = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Contact & Support", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-cream">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2">
              <LogoMark className="h-9 w-9" />
              <span className="text-2xl font-extrabold tracking-tight text-navy-900">
                SL<span className="text-brand">I</span>CE
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.tagline} The smarter, in-your-control way to resolve debt —
              powered by AI strategy and real coaching.
            </p>
            <p className="mt-4 text-sm font-bold leading-snug text-navy-900">
              {site.pledge}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy-900">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-sm font-bold uppercase tracking-wide text-navy-900">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {legal.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 rounded-2xl border border-orange-100 bg-white p-5 text-xs leading-relaxed text-muted">
          <strong className="font-bold text-navy-800">
            Important disclaimer:
          </strong>{" "}
          SLICE is not a law firm and does not provide legal, tax, or financial
          advice. SLICE does not guarantee that any debt will be settled, that
          creditors will negotiate, that any specific settlement amount will be
          reached, or that your credit score will improve. Debt settlement may
          have negative tax and credit consequences. All tools and content are
          for educational and organizational purposes only. Consult a licensed
          professional before making financial decisions.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-orange-100 pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Made with care to help you become debt-free.</p>
        </div>
      </Container>
    </footer>
  );
}
