import { createServerClient } from "@supabase/ssr";
import { getCookies, setCookie } from "@tanstack/react-start/server";

type CookieOptions = Parameters<typeof setCookie>[2];

/**
 * Per-request, cookie-backed Supabase client used for **user** auth (sign-in,
 * session, refresh) on the website. It uses the anon key and stores the session
 * in HTTP-only cookies via TanStack Start's request helpers, so no Supabase
 * client or token ever reaches the browser bundle.
 *
 * This shares the SAME Supabase project as the mobile app, so a user signs in
 * here with the exact credentials they created in the SLICE app.
 *
 * MUST be called from within a request context (a server function / route
 * `beforeLoad`/loader) — the cookie helpers read the active request.
 *
 * Env (no VITE_ prefix — keeps it out of the client bundle):
 *   SUPABASE_URL
 *   SUPABASE_ANON_KEY
 */
const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY. Add them to .env (local) and " +
      "your host's environment variables (production).",
  );
}

export function getSupabaseServer() {
  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({
          name,
          value,
        }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          setCookie(name, value, options as CookieOptions);
        }
      },
    },
  });
}
