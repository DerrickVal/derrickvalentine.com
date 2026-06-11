"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

import { submitContact } from "@/app/(marketing)/contact/actions";

const FIELD =
  "w-full rounded-[11px] border-[1.5px] border-[#DAD6C9] bg-white px-[15px] py-[13px] text-[14.5px] text-foreground outline-none transition-colors placeholder:text-[#A9A89F] focus:border-primary";
const LABEL = "mb-2 block text-[11px] font-bold tracking-[.1em] text-[#7C8071]";

const SELECT_CHEVRON: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' stroke='%2334402A' stroke-width='1.5' fill='none'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 15px center",
};

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await submitContact(formData);
      if (res.ok) setDone(res.firstName ?? "");
      else setError(res.error ?? "Something went wrong. Please try again.");
    });
  }

  if (done !== null) {
    return (
      <div className="rounded-[22px] border-[1.5px] border-border bg-card p-[clamp(24px,3vw,36px)]">
        <div className="px-3 py-8 text-center">
          <div className="mx-auto mb-[22px] flex size-16 items-center justify-center rounded-full bg-primary text-[30px] text-primary-foreground">
            ✓
          </div>
          <h2 className="mb-2.5 text-[28px] font-extrabold uppercase tracking-[-.02em]">
            {done ? `Thanks, ${done}!` : "Thanks!"}
          </h2>
          <p className="mx-auto mb-[26px] max-w-[420px] text-[15.5px] leading-[1.6] text-[#5C6052]">
            Your message is on its way. I’ll get back to you within a few hours,
            usually faster. If it’s urgent, just book a call.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="whitespace-nowrap rounded-full bg-primary px-[26px] py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-ink"
            >
              Book a call
            </Link>
            <button
              type="button"
              onClick={() => {
                setDone(null);
                setError(null);
              }}
              className="cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-primary px-6 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Send another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border-[1.5px] border-border bg-card p-[clamp(24px,3vw,36px)]">
      <h2 className="mb-1.5 text-[24px] font-extrabold uppercase tracking-[-.02em]">
        Send a message
      </h2>
      <p className="mb-6 text-[14.5px] leading-[1.55] text-[#6E7263]">
        A few details is all I need to give you a useful first reply.
      </p>
      <form onSubmit={onSubmit}>
        {/* honeypot — hidden from people, catches bots */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={LABEL}>
              YOUR NAME
            </label>
            <input id="name" name="name" type="text" required placeholder="Jane Smith" className={FIELD} />
          </div>
          <div>
            <label htmlFor="email" className={LABEL}>
              EMAIL
            </label>
            <input id="email" name="email" type="email" required placeholder="jane@business.com" className={FIELD} />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="business" className={LABEL}>
              BUSINESS / WEBSITE <span className="font-medium text-[#B4B2A9]">· optional</span>
            </label>
            <input id="business" name="business" type="text" placeholder="yoursite.com" className={FIELD} />
          </div>
          <div>
            <label htmlFor="platform" className={LABEL}>
              PLATFORM
            </label>
            <select
              id="platform"
              name="platform"
              defaultValue=""
              className={`${FIELD} cursor-pointer appearance-none`}
              style={SELECT_CHEVRON}
            >
              <option value="">Not sure yet</option>
              <option value="Shopify">Shopify</option>
              <option value="Webflow">Webflow</option>
              <option value="WordPress">WordPress</option>
              <option value="Squarespace">Squarespace</option>
              <option value="Other">Something else</option>
            </select>
          </div>
        </div>

        <div className="mb-[22px]">
          <label htmlFor="message" className={LABEL}>
            WHAT DO YOU NEED?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="A new site, a refresh, a rescue, a quick question, whatever it is, tell me here."
            className={`${FIELD} resize-y leading-[1.5]`}
          />
        </div>

        {error ? (
          <p className="mb-4 text-[13.5px] font-medium text-status-due-fg">{error}</p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex cursor-pointer items-center gap-[9px] whitespace-nowrap rounded-full bg-primary px-[30px] py-[15px] text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-ink disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send message"} <span className="text-[17px]">→</span>
          </button>
          <span className="max-w-[240px] text-[12.5px] leading-[1.5] text-[#9A9C8C]">
            Prefer to talk?{" "}
            <Link href="/book" className="font-semibold text-primary underline underline-offset-2">
              Book a call
            </Link>{" "}
            instead.
          </span>
        </div>
      </form>
    </div>
  );
}
