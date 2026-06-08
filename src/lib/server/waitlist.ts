import { createServerFn } from "@tanstack/react-start";

export type LeadInput = {
  name: string;
  email: string;
  /** "waitlist" or "contact" — lets one endpoint serve both forms */
  intent: "waitlist" | "contact";
  message?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Placeholder lead capture endpoint for the MVP. It validates input and logs
 * server-side. Swap the marked block for Supabase (insert row) or Resend
 * (send email) when the backend is ready — the client contract stays the same.
 */
export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput): LeadInput => {
    const name = (data?.name ?? "").trim();
    const email = (data?.email ?? "").trim();
    const intent = data?.intent === "contact" ? "contact" : "waitlist";
    const message = (data?.message ?? "").trim();

    if (name.length < 2) throw new Error("Please enter your name.");
    if (!isEmail(email)) throw new Error("Please enter a valid email address.");
    if (intent === "contact" && message.length < 5)
      throw new Error("Please add a short message.");

    return { name, email, intent, message };
  })
  .handler(async ({ data }): Promise<LeadResult> => {
    try {
      // ---------------------------------------------------------------------
      // TODO: connect a real backend here. For example:
      //   await supabase.from("leads").insert(data)
      //   await resend.emails.send({ to: site.email, subject: ..., html: ... })
      // ---------------------------------------------------------------------
      console.log("[SLICE lead]", {
        ...data,
        at: new Date().toISOString(),
      });
      return { ok: true };
    } catch (err) {
      console.error("[SLICE lead] failed", err);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  });
