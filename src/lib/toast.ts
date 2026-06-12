import { toast as sonner } from "sonner";

/**
 * SLICE toast helpers — one place to keep notifications friendly and on-brand.
 *
 * The golden rule: a user should NEVER see a raw technical error like
 * "undefined is not an object (evaluating 'e.ok')". `toErrorMessage` below
 * scrubs anything that smells like a stack trace / runtime exception and falls
 * back to a calm, human sentence. Pass it any unknown caught value.
 */

const TECHNICAL_NOISE =
  /undefined is not|is not an object|is not a function|cannot read|null is not|networkerror|failed to fetch|unexpected token|json|\.ok\b|e\.ok|status code|\[object|<!doctype/i;

/** A known-friendly server message (a full sentence we wrote ourselves). */
function looksFriendly(msg: string): boolean {
  return (
    msg.length > 0 &&
    msg.length <= 160 &&
    /[.!?]$/.test(msg.trim()) &&
    !TECHNICAL_NOISE.test(msg)
  );
}

/**
 * Turn any thrown/returned value into a message that's safe to show a human.
 * Friendly server strings pass through; technical noise becomes `fallback`.
 */
export function toErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  const raw =
    typeof err === "string"
      ? err
      : err instanceof Error
        ? err.message
        : typeof err === "object" && err && "error" in err
          ? String((err as { error: unknown }).error)
          : "";

  // Network failures get their own, more reassuring copy.
  if (/failed to fetch|networkerror|load failed/i.test(raw)) {
    return "Can't reach our servers. Check your connection and try again.";
  }

  return looksFriendly(raw) ? raw.trim() : fallback;
}

type RichOpts = {
  description?: string;
  /** ms; sonner default is 4000. Errors linger a touch longer by default. */
  duration?: number;
  action?: { label: string; onClick: () => void };
};

export const toast = {
  success(title: string, opts?: RichOpts) {
    return sonner.success(title, opts);
  },

  error(title: string, opts?: RichOpts) {
    return sonner.error(title, { duration: 6000, ...opts });
  },

  /** Show a friendly error derived from any caught/returned value. */
  fromError(err: unknown, opts?: RichOpts & { fallback?: string }) {
    const { fallback, ...rest } = opts ?? {};
    return this.error(toErrorMessage(err, fallback), rest);
  },

  info(title: string, opts?: RichOpts) {
    return sonner(title, opts);
  },

  /** Drive a toast through the lifecycle of a promise. */
  promise: sonner.promise,
  loading: sonner.loading,
  dismiss: sonner.dismiss,
};
