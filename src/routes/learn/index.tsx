import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Lock, PlayCircle, GraduationCap, Smartphone } from "lucide-react";
import { seo } from "../../lib/seo";
import { Container, Eyebrow } from "../../components/primitives";
import { AnchorButton } from "../../components/Button";
import {
  tierUnlocksLevel,
  minTierForLevel,
  TIER_MAX_LEVEL,
  type Tier,
} from "#/data/learning";
import {
  getCurrentUser,
  listVideos,
  type VideoMeta,
} from "#/lib/server/auth";

export const Route = createFileRoute("/learn/")({
  beforeLoad: async () => {
    const auth = await getCurrentUser();
    if (!auth) {
      throw redirect({ to: "/login", search: { redirect: "/learn" } });
    }
    return { auth };
  },
  loader: async ({ context }) => {
    const videos = await listVideos();
    return { tier: context.auth.tier, videos };
  },
  head: () => {
    const base = seo({
      title: "Debt-Free Academy",
      path: "/learn",
      description:
        "Level-by-level video lessons that teach you how to settle your debt and stay debt-free.",
    });
    return {
      ...base,
      meta: [...base.meta, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: LearnIndex,
});

/** Group videos into ordered levels. */
function byLevel(videos: VideoMeta[]): Array<{ level: number; videos: VideoMeta[] }> {
  const map = new Map<number, VideoMeta[]>();
  for (const v of videos) {
    const list = map.get(v.level) ?? [];
    list.push(v);
    map.set(v.level, list);
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([level, list]) => ({ level, videos: list }));
}

function LearnIndex() {
  const { tier, videos } = Route.useLoaderData();
  const levels = byLevel(videos);
  const ceiling = TIER_MAX_LEVEL[tier];

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4">
          <Eyebrow>
            <GraduationCap className="h-4 w-4" /> Debt-Free Academy
          </Eyebrow>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Learn to settle your debt, one level at a time
          </h1>
          <p className="max-w-2xl text-lg text-muted">
            Work through each level in order. You're on the{" "}
            <span className="font-bold text-brand">{tier}</span> plan, which
            unlocks{" "}
            <span className="font-semibold text-navy-900">
              {ceiling === Infinity ? "every level" : `levels 1–${ceiling}`}
            </span>
            . Upgrade in the SLICE app to go further.
          </p>
        </div>

        {levels.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-orange-100 bg-white p-8 text-center text-muted">
            Lessons are being added — check back soon.
          </p>
        ) : (
          <div className="mt-10 flex flex-col gap-6">
            {levels.map(({ level, videos: items }) => {
              const unlocked = tierUnlocksLevel(tier, level);
              return (
                <LevelCard
                  key={level}
                  level={level}
                  unlocked={unlocked}
                  minTier={minTierForLevel(level)}
                  videos={items}
                />
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

function LevelCard({
  level,
  unlocked,
  minTier,
  videos,
}: {
  level: number;
  unlocked: boolean;
  minTier: Tier;
  videos: VideoMeta[];
}) {
  return (
    <div
      className={`rounded-[1.5rem] border p-6 shadow-card sm:p-8 ${
        unlocked
          ? "border-orange-100 bg-white"
          : "border-orange-100/60 bg-orange-50/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold ${
              unlocked ? "bg-orange-100 text-brand" : "bg-orange-50 text-muted"
            }`}
          >
            {level}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">
              Level {level}
            </p>
            <p className="text-lg font-extrabold text-navy-900">
              {videos.length} {videos.length === 1 ? "lesson" : "lessons"}
            </p>
          </div>
        </div>

        {!unlocked ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-bold text-white">
            <Lock className="h-3.5 w-3.5" /> {minTier}+
          </span>
        ) : null}
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-orange-100/70">
        {videos.map((v) =>
          unlocked ? (
            <li key={v.id}>
              <Link
                to="/learn/$videoId"
                params={{ videoId: v.id }}
                className="group flex items-center gap-4 py-3.5 transition-colors hover:text-brand"
              >
                <PlayCircle className="h-6 w-6 shrink-0 text-brand" />
                <span className="flex-1">
                  <span className="block font-semibold text-navy-900 group-hover:text-brand">
                    {v.title}
                  </span>
                  {v.description ? (
                    <span className="block text-sm text-muted">
                      {v.description}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ) : (
            <li
              key={v.id}
              className="flex items-center gap-4 py-3.5 text-muted"
            >
              <Lock className="h-6 w-6 shrink-0" />
              <span className="flex-1">
                <span className="block font-semibold">{v.title}</span>
                {v.description ? (
                  <span className="block text-sm text-muted/80">
                    {v.description}
                  </span>
                ) : null}
              </span>
            </li>
          ),
        )}
      </ul>

      {!unlocked ? (
        <div className="mt-5 flex flex-col items-start gap-3 rounded-xl bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-navy-900">
            Unlock Level {level} with the{" "}
            <span className="text-brand">{minTier}</span> plan.
          </p>
          <AnchorButton href="/" variant="primary" size="sm">
            <Smartphone className="h-4 w-4" /> Upgrade in the app
          </AnchorButton>
        </div>
      ) : null}
    </div>
  );
}
