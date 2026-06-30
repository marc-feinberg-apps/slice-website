import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "#/lib/server/supabase";

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: ContactInput): ContactInput => {
    const name = (data?.name ?? "").trim();
    const email = (data?.email ?? "").trim();
    const message = (data?.message ?? "").trim();

    if (name.length < 2) throw new Error("Please enter your name.");
    if (!isEmail(email)) throw new Error("Please enter a valid email address.");
    if (message.length < 5) throw new Error("Please add a short message.");

    return { name, email, message };
  })
  .handler(async ({ data }): Promise<ContactResult> => {
    try {
      const { error } = await supabaseAdmin.from("leads").insert({
        name: data.name,
        email: data.email,
        intent: "contact",
        message: data.message,
      });

      if (error) {
        console.error("[SLICE contact] insert failed", error);
        return { ok: false, error: "Something went wrong. Please try again." };
      }

      return { ok: true };
    } catch (err) {
      console.error("[SLICE contact] failed", err);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  });
