import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client. Uses the service_role key, which bypasses RLS,
 * so this module must NEVER be imported into client code. It is only used from
 * TanStack Start server functions (e.g. src/lib/server/waitlist.ts).
 *
 * Env (no VITE_ prefix — keeps these out of the client bundle):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env (local) " +
      "and your host's environment variables (production).",
  );
}

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
