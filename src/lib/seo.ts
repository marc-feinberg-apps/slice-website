import { site } from "./site";

type SeoArgs = {
  title?: string;
  description?: string;
  /** Absolute or root-relative path for canonical/OG url, e.g. "/pricing" */
  path?: string;
  image?: string;
  keywords?: string;
};

/**
 * Build a TanStack Router `head()` meta array with sensible SEO + Open Graph +
 * Twitter defaults. Pass a page title; it gets suffixed with the brand name.
 */
export function seo({ title, description, path = "/", image, keywords }: SeoArgs) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
  const desc = description ?? site.description;
  const url = `${site.domain}${path}`;
  const ogImage = image ?? `${site.domain}/og-image.svg`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: desc },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      { name: "theme-color", content: "#f97316" },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
