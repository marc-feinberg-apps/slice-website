import { HeadContent, Scripts, createRootRoute, Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";

import appCss from "../styles.css?url";
import { site } from "../lib/site";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollReveal } from "../components/ScrollReveal";
import { Toaster } from "../components/Toaster";
import { Container, Eyebrow } from "../components/primitives";
import { LinkButton } from "../components/Button";

/**
 * Inlined verbatim into <head>, so it must be self-contained vanilla JS that is
 * safe to run before hydration. Only fires on the root path to avoid touching
 * /auth/confirmed itself or any other route.
 */
const AUTH_FRAGMENT_REDIRECT = `(function(){try{var p=location.pathname;if(p!=="/"&&p!=="")return;var s=location.search,h=location.hash;if(/(?:access_token|refresh_token|error_description|error_code|[?&#]error=|[?&#]code=|type=(?:signup|recovery|magiclink|invite|email_change))/.test(s+h)){location.replace("/auth/confirmed"+s+h);}}catch(e){}})();`;

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  logo: `${site.domain}/assets/logo/slice-logo-mark-512.png`,
  slogan: site.tagline,
  description: site.description,
  email: site.email,
  founder: { "@type": "Person", name: site.founder },
  sameAs: [site.social.instagram, site.social.tiktok, site.social.linkedin],
};

/**
 * Describes the SLICE app itself so Google can surface app rich results
 * (category, price range, platforms). Free to start, with paid Silver/Gold/
 * Platinum tiers up to $59.99/mo → AggregateOffer spanning $0–$59.99.
 */
const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  url: site.domain,
  description: site.description,
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "59.99",
    priceCurrency: "USD",
  },
  publisher: { "@type": "Organization", name: site.legal.businessName },
};

// Optional config set in Netlify → Environment variables (VITE_ prefix = safe to
// expose to the client). Empty/undefined → the corresponding tag is omitted.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GSC_TOKEN = import.meta.env.VITE_GSC_VERIFICATION as string | undefined;

function NotFound() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-20 sm:py-32">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-brand">
            <SearchX className="h-10 w-10" />
          </div>

          <div className="mt-8">
            <Eyebrow>404 — Not Found</Eyebrow>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Page not found
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted">
            We couldn't find the page you're looking for. It may have been moved
            or the link might be incorrect.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton to="/" variant="primary" size="lg">
              Back to home
            </LinkButton>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-navy-700 transition-colors hover:text-brand"
            >
              Contact support
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} — ${site.tagline}` },
      { name: "description", content: site.description },
      { name: "theme-color", content: "#f97316" },
      ...(GSC_TOKEN
        ? [{ name: "google-site-verification", content: GSC_TOKEN }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/favicon/favicon-16x16.png",
      },
      { rel: "apple-touch-icon", href: "/assets/favicon/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(orgSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(appSchema),
      },
      // Google Analytics 4 — only emitted when VITE_GA_MEASUREMENT_ID is set.
      ...(GA_ID
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
            },
          ]
        : []),
      {
        // Supabase emails (e.g. the signup-confirmation link from the mobile
        // app) land on the Site URL root with the auth result in the URL
        // fragment — e.g. "/#access_token=…&type=signup" or "/#error=…". The
        // landing page can't read that fragment server-side, so without this
        // the user just sees the homepage. This blocking head script runs
        // before paint: on a bare "/" load carrying those params it forwards
        // to /auth/confirmed (preserving the hash + query) so the proper
        // "email confirmed" page handles it — no flash of the homepage.
        children: AUTH_FRAGMENT_REDIRECT,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
