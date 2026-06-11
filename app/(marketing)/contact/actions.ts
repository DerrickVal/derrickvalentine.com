"use server";

// Contact form Server Action. Sends via the Resend REST API (no SDK dependency,
// which keeps it portable to the Cloudflare/OpenNext target). Env keys live in
// .env.local: RESEND_API_KEY, CONTACT_FROM_EMAIL (verified sender),
// CONTACT_TO_EMAIL (Derrick's inbox).
// TODO(handoff): add a Cloudflare Turnstile widget + siteverify gate before send
// (TURNSTILE_* keys exist); the design has no visible captcha, so it is deferred.

export type ContactResult = { ok: boolean; firstName?: string; error?: string };

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function submitContact(formData: FormData): Promise<ContactResult> {
  // Honeypot: a real person never fills this hidden field. Pretend success.
  if (str(formData.get("company"))) return { ok: true, firstName: "" };

  const name = str(formData.get("name"));
  const email = str(formData.get("email"));
  const business = str(formData.get("business"));
  const platform = str(formData.get("platform"));
  const message = str(formData.get("message"));

  if (
    !name ||
    name.length > 100 ||
    !isEmail(email) ||
    email.length > 200 ||
    !message ||
    message.length > 5000
  ) {
    return { ok: false, error: "Please add your name, a valid email, and a short message." };
  }

  const firstName = name.split(/\s+/)[0];

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("[contact] Missing RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL");
    return {
      ok: false,
      error: "Sorry, the form is not available right now. Please book a call instead.",
    };
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    business ? `Business / website: ${business}` : null,
    `Platform: ${platform || "Not specified"}`,
    "",
    "Message:",
    message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New contact form: ${name}`,
        text: body,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend send failed", res.status, await res.text().catch(() => ""));
      return { ok: false, error: "Sorry, that didn’t send. Please try again, or book a call instead." };
    }
  } catch (err) {
    console.error("[contact] Resend request error", err);
    return { ok: false, error: "Sorry, that didn’t send. Please try again, or book a call instead." };
  }

  return { ok: true, firstName };
}
