import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, Smartphone } from "lucide-react";
import { seo } from "../../lib/seo";
import { Container } from "../../components/primitives";
import { LinkButton, AnchorButton } from "../../components/Button";
import { site } from "../../lib/site";

/**
 * Deep link that opens the SLICE mobile app. "slice" is the custom URL scheme
 * the app registers (app.config.js → scheme: "slice"), and "/auth" is its
 * sign-in route (app/auth.tsx) — so this drops the user straight on the screen
 * where they sign in with the account they just confirmed. The app has no
 * associated-domains / universal links configured, so the custom scheme is the
 * only way to launch it. (Only resolves on a device with the app installed.)
 */
const SLICE_APP_URL = "slice://auth";

export const Route = createFileRoute("/auth/confirmed")({
  head: () => {
    const base = seo({
      title: "Email confirmed",
      path: "/auth/confirmed",
      description:
        "Your SLICE email has been confirmed. Return to the app to sign in and start building your personalized debt plan.",
    });
    return {
      ...base,
      // This is a transactional auth landing page — keep it out of search.
      meta: [...base.meta, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: AuthConfirmed,
});

type Status = "checking" | "success" | "error";

/**
 * Read every place Supabase might stash auth params: the query string
 * (?code=…, ?error=…) and the URL fragment (#access_token=…, #error=…).
 * Returns a flat map of params so we can look for error signals safely.
 */
function readAuthParams(): URLSearchParams {
  const params = new URLSearchParams();
  if (typeof window === "undefined") return params;

  const search = new URLSearchParams(window.location.search);
  search.forEach((value, key) => params.set(key, value));

  // The fragment can start with "#" and may itself look like a query string.
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    const hashParams = new URLSearchParams(hash);
    hashParams.forEach((value, key) => params.set(key, value));
  }

  return params;
}

function AuthConfirmed() {
  // Render a neutral "checking" state on the server and the first client paint
  // so hydration matches; the real status is resolved in the effect below,
  // where window.location (including the hash) is available.
  const [status, setStatus] = useState<Status>("checking");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    const params = readAuthParams();

    // This is a transactional landing page — it only means something when
    // Supabase sent the user here from an email link, which always carries
    // auth params (tokens / a code / an error). A bare visit has none, so
    // there's nothing to confirm: send them to the homepage instead.
    const hasAuthParams =
      params.has("access_token") ||
      params.has("refresh_token") ||
      params.has("code") ||
      params.has("type") ||
      params.has("error") ||
      params.has("error_code") ||
      params.has("error_description");

    if (!hasAuthParams) {
      window.location.replace("/");
      return;
    }

    // Supabase signals failures with any of these. `error` is the canonical
    // OAuth-style flag; the others appear in different Supabase flows.
    const hasError =
      params.has("error") ||
      params.has("error_code") ||
      params.has("error_description");

    if (hasError) {
      const detail =
        params.get("error_description") ??
        params.get("error_code") ??
        params.get("error");
      setErrorDetail(detail ? decodeURIComponent(detail.replace(/\+/g, " ")) : null);
      setStatus("error");
      return;
    }

    setStatus("success");
  }, []);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-orange-50 to-white py-16 sm:py-24">
      {/* Soft brand glow accents */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-[1.5rem] border border-orange-100 bg-white p-8 text-center shadow-soft sm:p-10">
            {status === "checking" ? <CheckingState /> : null}
            {status === "success" ? <SuccessState /> : null}
            {status === "error" ? <ErrorState detail={errorDetail} /> : null}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Need help? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

function CheckingState() {
  return (
    <div className="flex flex-col items-center gap-5 py-4" aria-live="polite">
      <span
        className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-brand"
        role="status"
        aria-label="Confirming your email"
      />
      <p className="text-lg font-semibold text-navy-900">
        Confirming your email…
      </p>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="animate-fade-up" aria-live="polite">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-brand">
        <CheckCircle2 className="h-9 w-9" />
      </span>

      <h1 className="mt-6 text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-[2rem]">
        Your email is confirmed 🎉
      </h1>

      <p className="mt-4 text-lg font-semibold text-navy-900">
        Welcome to SLICE. Your account is now verified.
      </p>

      <p className="mt-3 text-base leading-relaxed text-muted">
        You can now return to the SLICE app and sign in to start building your
        personalized debt plan.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <LinkButton to="/" variant="primary" size="lg">
          Go to SLICE Website <ArrowRight className="h-5 w-5" />
        </LinkButton>
        <AnchorButton href={SLICE_APP_URL} variant="secondary" size="lg">
          <Smartphone className="h-5 w-5" /> Open SLICE App
        </AnchorButton>
      </div>
    </div>
  );
}

function ErrorState({ detail }: { detail: string | null }) {
  return (
    <div className="animate-fade-up" aria-live="assertive">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-brand-dark">
        <AlertTriangle className="h-9 w-9" />
      </span>

      <h1 className="mt-6 text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-[2rem]">
        Confirmation link issue
      </h1>

      <p className="mt-4 text-base leading-relaxed text-muted">
        This confirmation link may be expired or invalid. Please try signing up
        again or request a new confirmation email.
      </p>

      {detail ? (
        <p className="mt-3 text-sm text-muted/80">
          Details: <span className="font-medium">{detail}</span>
        </p>
      ) : null}

      <div className="mt-8 flex justify-center">
        <LinkButton to="/" variant="primary" size="lg">
          Back to SLICE <ArrowRight className="h-5 w-5" />
        </LinkButton>
      </div>
    </div>
  );
}
