# SLICE — Marketing Website

> Reducing your debt one bite at a time.

The conversion-focused marketing site for **SLICE**, a debt-resolution app.
Built to turn visitors into iOS app users, support contacts, and paid subscribers —
and polished enough to show investors and the App Store review team.

## Tech stack

- **TanStack Start** (React 19 + SSR) — fast, SEO-friendly server rendering
- **TypeScript** — strict mode
- **Tailwind CSS v4** — brand design system in `src/styles.css`
- **lucide-react** — icons
- Zero external backend for the MVP (forms use a swappable server-function stub)

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `pnpm dev`             | Start the dev server on port 3000             |
| `pnpm build`           | Production build (client + SSR server)        |
| `pnpm preview`         | Preview the production build (port 4173)      |
| `pnpm generate-routes` | Regenerate `src/routeTree.gen.ts`             |
| `pnpm test`            | Run unit tests (Vitest)                       |

## Project structure

```
src/
  routes/            File-based routes (each page sets its own SEO via head())
    __root.tsx       Shell: <html>, Navbar, Footer, fonts, Organization schema
    index.tsx        Home (hero, problem/solution, 3-step, features,
                     calculator, coaching, pricing, trust, FAQ, final CTA)
    how-it-works · features · pricing · coaching · faq · contact · privacy · terms
  components/         Reusable UI (Button, Navbar, Footer, Calculator,
                     PricingCards, FaqAccordion, ContactForm, Logo, …)
  data/              Content as data: features, pricing, faqs, steps
  lib/
    site.ts          Brand config, nav, CTA labels (single source of truth)
    seo.ts           SEO/OpenGraph/Twitter meta helper
    calculator.ts    Pure settlement-math (unit-testable)
    server/contact.ts  Contact server function
```

## Editing content

Most copy lives as data so it's easy to change without touching layout:

- **Brand, nav, CTAs, contact email, app store URL** → `src/lib/site.ts`
- **Feature cards & tiers** → `src/data/features.ts`
- **Pricing plans** → `src/data/pricing.ts` (table matrix in `routes/pricing.tsx`)
- **FAQs** (also powers FAQ JSON-LD) → `src/data/faqs.ts`
- **Brand colors / fonts / animations** → `src/styles.css` (`@theme`)

## Connecting the contact form

The form posts to a TanStack Start **server function** at
`src/lib/server/contact.ts`. It validates input and inserts contact messages
into Supabase.

```ts
await supabase.from("leads").insert({
  name,
  email,
  intent: "contact",
  message,
});
```

The client lives in `src/components/ContactForm.tsx`.

## SEO

- Per-route titles, descriptions, canonical URLs, Open Graph + Twitter cards
- `Organization` JSON-LD (root) and `FAQPage` JSON-LD (FAQ route)
- `public/robots.txt`, `public/manifest.json`, SVG favicon, and `og-image.svg`
- Update `site.domain` in `src/lib/site.ts` before deploying

## Legal

The site is explicit that SLICE is **not** a law firm and does not provide
legal, tax, or financial advice, and does not guarantee settlements or credit
improvement. See `routes/privacy.tsx`, `routes/terms.tsx`, the footer
disclaimer, and the homepage trust section. Have counsel review before launch.

## Deployment

`pnpm build` outputs `dist/` (a client bundle + SSR `server/server.js`).
TanStack Start supports adapters for Netlify, Cloudflare, Nitro/Node, and
Railway — see the TanStack Start deployment docs and add the adapter you need.
