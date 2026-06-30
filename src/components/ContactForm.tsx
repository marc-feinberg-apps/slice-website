import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./Button";
import { submitContact } from "../lib/server/contact";
import { toast, toErrorMessage } from "../lib/toast";

type Status = "idle" | "submitting" | "success";

export function ContactForm({
  buttonLabel = "Send message",
  dark = false,
}: {
  buttonLabel?: string;
  dark?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("submitting");

    try {
      const res = await submitContact({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      if (res?.ok) {
        setStatus("success");
        form.reset();
        toast.success("Message sent!", {
          description: "We'll get back to you within 2 business days.",
        });
      } else {
        setStatus("idle");
        toast.error("Couldn't send your message", {
          description: toErrorMessage(res?.error),
          action: { label: "Try again", onClick: () => form.requestSubmit() },
        });
      }
    } catch (err) {
      setStatus("idle");
      toast.fromError(err, {
        description: "Check your connection and try again in a moment.",
        fallback: "Something went wrong",
        action: { label: "Try again", onClick: () => form.requestSubmit() },
      });
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-center gap-3 rounded-2xl border p-8 text-center ${
          dark
            ? "border-white/15 bg-white/10 text-white"
            : "border-orange-100 bg-orange-50 text-navy-900"
        }`}
        role="status"
      >
        <CheckCircle2 className="h-12 w-12 text-brand" />
        <h3 className="text-xl font-extrabold">Thanks for reaching out.</h3>
        <p className={dark ? "text-white/75" : "text-muted"}>
          We'll get back to you within 2 business days.
        </p>
      </div>
    );
  }

  const labelCls = `mb-1.5 block text-sm font-bold ${dark ? "text-white" : "text-navy-900"}`;
  const inputCls = `w-full rounded-xl border-2 px-4 py-3 text-base outline-none transition-colors ${
    dark
      ? "border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-orange-400"
      : "border-orange-100 bg-white text-navy-900 placeholder-muted/60 focus:border-brand"
  }`;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jordan Smith"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          How can we help?
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          required
          placeholder="Tell us what you need..."
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
            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          buttonLabel
        )}
      </Button>

      <p className={`text-xs ${dark ? "text-white/55" : "text-muted"}`}>
        We respect your privacy. No spam, ever. See our{" "}
        <a href="/privacy" className="underline hover:text-brand">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
