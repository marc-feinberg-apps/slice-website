/**
 * Generates public/sitemap.xml at build time so <lastmod> never goes stale.
 * Run automatically before `vite build` (see package.json "build" script).
 *
 * Only public, indexable marketing routes belong here. Auth/login/dynamic
 * gated routes (e.g. /learn/$videoId) are intentionally excluded and are also
 * blocked in robots.txt.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const DOMAIN = "https://slicemydebt.com";

/** path, changefreq, priority */
const routes = [
  ["/", "weekly", "1.0"],
  ["/how-it-works", "monthly", "0.8"],
  ["/features", "monthly", "0.8"],
  ["/pricing", "monthly", "0.8"],
  ["/coaching", "monthly", "0.8"],
  ["/learn", "weekly", "0.7"],
  ["/faq", "monthly", "0.7"],
  ["/contact", "monthly", "0.6"],
  ["/privacy", "yearly", "0.3"],
  ["/terms", "yearly", "0.3"],
];

const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const body = routes
  .map(
    ([path, changefreq, priority]) =>
      `  <url>\n` +
      `    <loc>${DOMAIN}${path}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const out = resolve(dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");
writeFileSync(out, xml);
console.log(`✓ sitemap.xml generated (${routes.length} urls, lastmod ${lastmod})`);
