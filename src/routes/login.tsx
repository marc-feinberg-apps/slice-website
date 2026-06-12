import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, LogIn, Smartphone } from "lucide-react";
import { seo } from "../lib/seo";
import { Container } from "../components/primitives";
import { Button, AnchorButton } from "../components/Button";
import { site } from "../lib/site";
import { signIn, getCurrentUser } from "#/lib/server/auth";
import { toast, toErrorMessage } from "../lib/toast";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  // Already signed in? Skip the form.
  beforeLoad: async ({ search }) => {
    const current = await getCurrentUser();
    if (current) {
      throw redirect({ to: search.redirect ?? "/learn", replace: true });
    }
  },
  head: () => {
    const base = seo({
      title: "Sign in",
      path: "/login",
      description:
        "Sign in to your SLICE account to access the debt-free video academy.",
    });
    return {
      ...base,
      meta: [...base.meta, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: LoginPage,
});

function LoginPage() {
  const { redirect: redirectTarget } = Route.useSearch();
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    // Catch obvious gaps before a round-trip so the feedback is instant.
    if (!email || !password) {
      toast.error("Enter your email and password", {
        description: "Both fields are required to sign in.",
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await signIn({ data: { email, password } });

      // Defensive: a failed round-trip can resolve without our { ok } shape.
      // Guarding here is what stops the raw "undefined is not an object
      // (evaluating 'e.ok')" message from ever reaching the user.
      if (res?.ok) {
        toast.success("Welcome back! 👋", {
          description: "Taking you to the academy…",
          duration: 2000,
        });
        // Full navigation so the Navbar re-reads the new session on SSR.
        window.location.assign(redirectTarget ?? "/learn");
        return;
      }

      setStatus("idle");
      toast.error("Couldn't sign you in", {
        description: toErrorMessage(
          res?.error,
          "Incorrect email or password. Please try again.",
        ),
        action: {
          label: "Get help",
          onClick: () => window.location.assign(`mailto:${site.email}`),
        },
      });
    } catch (err) {
      setStatus("idle");
      // toErrorMessage surfaces friendly validator messages ("Please enter a
      // valid email…") and rewrites network failures, so no raw stack leaks.
      toast.fromError(err, { fallback: "Sign-in failed. Please try again." });
    }
  }

  const inputCls =
    "w-full rounded-xl border-2 border-orange-100 bg-white px-4 py-3 text-base text-navy-900 placeholder-muted/60 outline-none transition-colors focus:border-brand";

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-orange-50 to-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[1.5rem] border border-orange-100 bg-white p-8 shadow-soft sm:p-10">
            <h1 className="text-center text-2xl font-extrabold tracking-tight text-navy-900">
              Welcome back
            </h1>
            <p className="mt-2 text-center text-sm text-muted">
              Sign in to watch the debt-free video academy.
            </p>

            <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4" noValidate>
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-sm font-bold text-navy-900"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-sm font-bold text-navy-900"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" /> Sign in
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/60 p-5 text-center">
            <p className="text-sm font-semibold text-navy-900">
              Don't have an account yet?
            </p>
            <p className="mt-1 text-sm text-muted">
              SLICE accounts are created in the mobile app. Download it, sign up,
              then come back here to watch.
            </p>
            <div className="mt-3 flex justify-center">
              <AnchorButton href="/" variant="ghost" size="sm">
                <Smartphone className="h-4 w-4" /> Get the SLICE app
              </AnchorButton>
            </div>
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
