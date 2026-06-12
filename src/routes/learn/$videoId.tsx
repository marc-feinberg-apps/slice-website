import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock, Clock, Smartphone, VideoOff } from "lucide-react";
import { seo } from "../../lib/seo";
import { Container } from "../../components/primitives";
import { AnchorButton, LinkButton } from "../../components/Button";
import { getCurrentUser, getSignedVideoUrl } from "#/lib/server/auth";

export const Route = createFileRoute("/learn/$videoId")({
  beforeLoad: async ({ params }) => {
    const auth = await getCurrentUser();
    if (!auth) {
      throw redirect({
        to: "/login",
        search: { redirect: `/learn/${params.videoId}` },
      });
    }
  },
  loader: ({ params }) =>
    getSignedVideoUrl({ data: { videoId: params.videoId } }),
  head: () => {
    const base = seo({
      title: "Lesson",
      path: "/learn",
      description: "A SLICE debt-free academy lesson.",
    });
    return {
      ...base,
      meta: [...base.meta, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: VideoPage,
});

function formatDuration(seconds: number | null): string | null {
  if (!seconds || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function VideoPage() {
  const result = Route.useLoaderData();

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16">
      <Container className="max-w-4xl">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Academy
        </Link>

        <div className="mt-6">
          {result.ok ? (
            <Player result={result} />
          ) : result.reason === "locked" ? (
            <LockedState
              title={result.meta.title}
              level={result.level}
              minTier={result.minTier}
            />
          ) : result.reason === "unavailable" ? (
            <SimpleState
              icon={<VideoOff className="h-9 w-9" />}
              title="This lesson is coming soon"
              body={`"${result.meta.title}" hasn't been published yet. Check back shortly.`}
            />
          ) : (
            <SimpleState
              icon={<VideoOff className="h-9 w-9" />}
              title="Lesson not found"
              body="This lesson may have been moved or removed."
            />
          )}
        </div>
      </Container>
    </section>
  );
}

function Player({
  result,
}: {
  result: { url: string; meta: { title: string; description: string | null; level: number; durationSeconds: number | null } };
}) {
  const { url, meta } = result;
  const duration = formatDuration(meta.durationSeconds);
  return (
    <div>
      <div className="overflow-hidden rounded-[1.25rem] border border-orange-100 bg-navy-900 shadow-soft">
        <video
          key={url}
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
          className="aspect-video w-full bg-black"
          src={url}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-wide text-brand">
          Level {meta.level}
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
          {meta.title}
        </h1>
        {duration ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Clock className="h-4 w-4" /> {duration}
          </span>
        ) : null}
        {meta.description ? (
          <p className="text-lg leading-relaxed text-muted">{meta.description}</p>
        ) : null}
      </div>
    </div>
  );
}

function LockedState({
  title,
  level,
  minTier,
}: {
  title: string;
  level: number;
  minTier: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-orange-100 bg-white p-8 text-center shadow-soft sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-brand">
        <Lock className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
        Level {level} is locked
      </h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-muted">
        "{title}" is part of Level {level}. Upgrade to the{" "}
        <span className="font-bold text-brand">{minTier}</span> plan in the SLICE
        app to unlock it.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <AnchorButton href="/" variant="primary" size="lg">
          <Smartphone className="h-5 w-5" /> Upgrade in the app
        </AnchorButton>
        <LinkButton to="/learn" variant="ghost" size="lg">
          Back to Academy
        </LinkButton>
      </div>
    </div>
  );
}

function SimpleState({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-orange-100 bg-white p-8 text-center shadow-soft sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-brand">
        {icon}
      </span>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-muted">{body}</p>
      <div className="mt-8 flex justify-center">
        <LinkButton to="/learn" variant="primary" size="lg">
          Back to Academy
        </LinkButton>
      </div>
    </div>
  );
}
