import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { site } from "../lib/site";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollReveal } from "../components/ScrollReveal";
import { Toaster } from "../components/Toaster";

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

export const Route = createRootRoute({
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
