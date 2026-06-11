"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { requestOtp, verifyOtp } from "./actions";

// Reskin of the OTP-first sign-in over the EXISTING server actions (requestOtp /
// verifyOtp in ./actions.ts) — the auth behavior is unchanged, only the UI is the
// new design. Actions are invoked via useTransition so the design's resend /
// wrong-email controls work without a useActionState reset dance.

const BRAND_HATCH =
  "repeating-linear-gradient(135deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 2px,transparent 2px,transparent 22px)";
const FIELD =
  "w-full rounded-[11px] border-[1.5px] border-[#DAD6C9] bg-white px-4 py-[14px] text-[15px] text-foreground outline-none transition-colors placeholder:text-[#A9A89F] focus:border-primary";
const LABEL = "mb-2 block text-[11px] font-bold tracking-[.1em] text-[#7C8071]";
const BTN =
  "flex w-full items-center justify-center gap-[9px] rounded-[11px] bg-primary py-[15px] text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-ink disabled:opacity-60";

const STATS: [string, string][] = [
  ["Live", "project status"],
  ["Secure", "file uploads"],
  ["Simple", "invoices"],
];

function ReassuranceChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[18px] flex items-center gap-2.5 rounded-[11px] bg-[#F4F3EC] px-3.5 py-3">
      <span className="size-2 flex-none rounded-full bg-[#6E7A60]" />
      <span className="text-[12.5px] leading-[1.45] text-[#5C6052]">{children}</span>
    </div>
  );
}

function LoginPanels() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "";

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const [pending, startTransition] = useTransition();

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    const fd = new FormData();
    fd.set("email", email.trim());
    startTransition(async () => {
      const res = await requestOtp({}, fd);
      if (res?.error) setError(res.error);
      else {
        setStep("code");
        setCode("");
        setResent(false);
      }
    });
  }

  function resend() {
    setError(null);
    const fd = new FormData();
    fd.set("email", email.trim());
    startTransition(async () => {
      const res = await requestOtp({}, fd);
      if (res?.error) setError(res.error);
      else setResent(true);
    });
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) return;
    setError(null);
    const fd = new FormData();
    fd.set("email", email.trim());
    fd.set("token", code);
    fd.set("redirect", redirectTo);
    startTransition(async () => {
      // verifyOtp redirects on success; only an error comes back here.
      const res = await verifyOtp({}, fd);
      if (res?.error) setError(res.error);
    });
  }

  const codeReady = code.length === 6;

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* brand panel */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 text-[#E9EAE0] md:flex"
        style={{ background: "linear-gradient(160deg,#3c4a30,#1e2618)" }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: BRAND_HATCH }} />
        <Link href="/" className="relative flex items-center gap-[11px] text-[#F1EFE8]">
          <span className="flex size-9 items-center justify-center rounded-[9px] bg-background text-[16px] font-extrabold tracking-[-.02em] text-foreground">
            DV
          </span>
          <span className="text-[17px] font-bold">Derrick Valentine</span>
        </Link>
        <div className="relative">
          <h1 className="mb-[18px] text-[clamp(30px,3.6vw,48px)] font-extrabold uppercase leading-[1.02] tracking-[-0.025em]">
            Your project,
            <br />
            <span className="text-accent-on-dark">in one place.</span>
          </h1>
          <p className="max-w-[380px] text-[15px] leading-[1.6] text-[#C2C6B5]">
            Track progress, upload your content, and handle invoices, no
            passwords, no chasing email threads.
          </p>
          <div className="mt-[30px] flex gap-[26px]">
            {STATS.map(([v, l]) => (
              <div key={l}>
                <div className="text-[22px] font-extrabold">{v}</div>
                <div className="mt-[3px] text-[12px] text-[#9AA683]">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-[12.5px] text-[#7E8C62]">© 2026 Derrick Valentine</div>
      </div>

      {/* form panel */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-[7px] text-[13px] font-semibold text-[#7C8071] transition-colors hover:text-primary"
          >
            ← Back to site
          </Link>
          {/* TODO(content): on /p/[slug] this chip reflects the real project slug */}
          <div className="mb-[22px] flex w-fit max-w-full items-center gap-2 rounded-full border border-[#D4DBC4] bg-[#EEF1E6] px-[13px] py-[7px]">
            <span className="size-[7px] flex-none rounded-full bg-[#5E7245]" />
            <span className="truncate text-[12px] font-semibold text-[#3F4A2C]">
              digitaldog.io/p/harbor-goods
            </span>
          </div>

          {step === "email" ? (
            <div>
              <h2 className="mb-2 text-[30px] font-extrabold uppercase tracking-[-.025em]">
                Sign in
              </h2>
              <p className="mb-[26px] text-[14.5px] leading-[1.55] text-[#6E7263]">
                No password to remember. Enter your email and I’ll send a secure
                link <em>and</em> a 6-digit code, use whichever’s easier.
              </p>
              <form onSubmit={submitEmail}>
                <label htmlFor="email" className={LABEL}>
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="you@business.com"
                  className={`${FIELD} mb-[18px]`}
                />
                {error ? (
                  <p className="mb-3 text-[13px] font-medium text-status-due-fg">{error}</p>
                ) : null}
                <button type="submit" disabled={pending} className={BTN}>
                  {pending ? "Sending…" : "Email me a secure link"}{" "}
                  <span className="text-[17px]">→</span>
                </button>
              </form>
              <ReassuranceChip>
                You’ll stay signed in on this device for months, just bookmark this
                page.
              </ReassuranceChip>
              <p className="mt-[22px] text-center text-[13.5px] text-[#6E7263]">
                Not a client yet?{" "}
                <Link href="/contact" className="font-semibold text-primary hover:underline">
                  Get in touch
                </Link>
              </p>
            </div>
          ) : (
            <div>
              <h2 className="mb-2 text-[30px] font-extrabold uppercase tracking-[-.025em]">
                Check your email
              </h2>
              <p className="mb-6 text-[14.5px] leading-[1.55] text-[#6E7263]">
                I sent a secure link and a 6-digit code to{" "}
                <span className="font-bold text-foreground">{email}</span>. Enter the
                code below, or just tap the link in the email.
              </p>
              <form onSubmit={submitCode}>
                <label htmlFor="code" className={LABEL}>
                  6-DIGIT CODE
                </label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError(null);
                    setResent(false);
                  }}
                  placeholder="••••••"
                  className="mb-[18px] w-full rounded-[11px] border-[1.5px] border-[#DAD6C9] bg-white p-4 text-center text-[30px] font-bold tracking-[.42em] text-foreground outline-none transition-colors placeholder:text-[#A9A89F] focus:border-primary"
                />
                {error ? (
                  <p className="mb-3 text-[13px] font-medium text-status-due-fg">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={!codeReady || pending}
                  className={
                    codeReady
                      ? BTN
                      : "flex w-full cursor-not-allowed items-center justify-center rounded-[11px] bg-[#D7D2C4] py-[15px] text-[15.5px] font-semibold text-[#9A9C8C]"
                  }
                >
                  {pending ? "Verifying…" : "Verify & sign in"}
                  {codeReady ? <span className="ml-[9px] text-[17px]">→</span> : null}
                </button>
              </form>
              <ReassuranceChip>
                Prefer the link? Open the email and tap <b>Sign in</b>, same result.
              </ReassuranceChip>
              <div className="mt-5 flex items-center justify-center gap-3.5">
                {resent ? (
                  <span className="text-[13px] font-bold text-status-paid-fg">✓ New code sent</span>
                ) : (
                  <button
                    type="button"
                    onClick={resend}
                    disabled={pending}
                    className="text-[13px] font-semibold text-primary underline underline-offset-2 disabled:opacity-60"
                  >
                    Resend code
                  </button>
                )}
                <span className="text-border-strong">·</span>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setResent(false);
                    setError(null);
                  }}
                  className="text-[13px] font-semibold text-[#6E7263] transition-colors hover:text-primary"
                >
                  Wrong email?
                </button>
              </div>
              <p className="mt-5 text-center text-[12px] leading-[1.5] text-[#9A9C8C]">
                The link and code expire in 1 hour and can be used once. The newest
                email always works.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <LoginPanels />
    </Suspense>
  );
}
