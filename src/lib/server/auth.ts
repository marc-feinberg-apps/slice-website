import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "#/lib/server/supabase";
import { getSupabaseServer } from "#/lib/server/supabase-auth";
import {
  normalizeTier,
  tierUnlocksLevel,
  minTierForLevel,
  type Tier,
} from "#/data/learning";

export type SessionUser = { id: string; email: string };
export type CurrentUser = { user: SessionUser; tier: Tier } | null;

/** Public-safe video metadata (never includes `storage_path`). */
export type VideoMeta = {
  id: string;
  level: number;
  sortOrder: number;
  title: string;
  description: string | null;
  durationSeconds: number | null;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Resolve a user's current tier from the shared `profiles.tier` enum (the same
 * column the mobile app + RevenueCat keep in sync). Uses the service-role
 * client so it works regardless of RLS. Fails closed to "Free".
 */
async function getUserTier(userId: string): Promise<Tier> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("tier")
    .eq("id", userId)
    .maybeSingle();

  if (error) console.error("[SLICE auth] tier lookup failed", error);
  return normalizeTier(data?.tier);
}

/**
 * Sign in an existing SLICE account (created in the mobile app). On success the
 * @supabase/ssr client writes the session into HTTP-only cookies.
 */
export const signIn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => {
    const email = (data?.email ?? "").trim();
    const password = data?.password ?? "";
    if (!isEmail(email)) throw new Error("Please enter a valid email address.");
    if (!password) throw new Error("Please enter your password.");
    return { email, password };
  })
  .handler(
    async ({ data }): Promise<{ ok: true } | { ok: false; error: string }> => {
      const supabase = getSupabaseServer();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        // Keep the message generic — don't reveal whether the email exists.
        return { ok: false, error: "Incorrect email or password." };
      }
      return { ok: true };
    },
  );

/** Clear the session cookie. */
export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  await getSupabaseServer().auth.signOut();
  return { ok: true as const };
});

/**
 * The current signed-in user + their tier, or null. Safe to call from route
 * `beforeLoad` (runs on the server during SSR and on navigation).
 */
export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<CurrentUser> => {
    const supabase = getSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const tier = await getUserTier(user.id);
    return { user: { id: user.id, email: user.email ?? "" }, tier };
  },
);

/** All academy videos (metadata only), ordered by level then sort order. */
export const listVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<VideoMeta[]> => {
    const { data, error } = await supabaseAdmin
      .from("course_videos")
      .select("id, level, sort_order, title, description, duration_seconds")
      .order("level", { ascending: true })
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[SLICE academy] list failed", error);
      return [];
    }

    return (data ?? []).map((v) => ({
      id: v.id,
      level: v.level,
      sortOrder: v.sort_order,
      title: v.title,
      description: v.description,
      durationSeconds: v.duration_seconds,
    }));
  },
);

export type SignedVideo =
  | { ok: true; url: string; meta: VideoMeta }
  | { ok: false; reason: "unauthenticated" }
  | { ok: false; reason: "not_found" }
  | { ok: false; reason: "locked"; minTier: Tier; level: number; meta: VideoMeta }
  | { ok: false; reason: "unavailable"; meta: VideoMeta };

/**
 * The single source of a playable URL. Authenticates the user, checks their
 * tier against the video's level, and only then mints a short-lived signed URL
 * from the private `course-videos` bucket. Entitlement is NEVER trusted from
 * the client.
 */
export const getSignedVideoUrl = createServerFn({ method: "POST" })
  .validator((data: { videoId: string }) => {
    const videoId = (data?.videoId ?? "").trim();
    if (!videoId) throw new Error("Missing video id.");
    return { videoId };
  })
  .handler(async ({ data }): Promise<SignedVideo> => {
    const supabase = getSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false, reason: "unauthenticated" };

    const { data: row, error } = await supabaseAdmin
      .from("course_videos")
      .select("id, level, sort_order, title, description, duration_seconds, storage_path")
      .eq("id", data.videoId)
      .maybeSingle();

    if (error || !row) return { ok: false, reason: "not_found" };

    const meta: VideoMeta = {
      id: row.id,
      level: row.level,
      sortOrder: row.sort_order,
      title: row.title,
      description: row.description,
      durationSeconds: row.duration_seconds,
    };

    const tier = await getUserTier(user.id);
    if (!tierUnlocksLevel(tier, row.level)) {
      return {
        ok: false,
        reason: "locked",
        minTier: minTierForLevel(row.level),
        level: row.level,
        meta,
      };
    }

    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from("course-videos")
      .createSignedUrl(row.storage_path, 60 * 60); // 1 hour

    if (signErr || !signed?.signedUrl) {
      // Entitled, but the file isn't uploaded yet — show "coming soon".
      return { ok: false, reason: "unavailable", meta };
    }

    return { ok: true, url: signed.signedUrl, meta };
  });
