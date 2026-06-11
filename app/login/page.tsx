"use client";

import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestOtp, verifyOtp } from "./actions";
import type { AuthActionState } from "./types";

const INITIAL: AuthActionState = {};

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "";
  const [email, setEmail] = useState("");
  const [reqState, requestAction, requestPending] = useActionState(requestOtp, INITIAL);
  const [verifyState, verifyAction, verifyPending] = useActionState(verifyOtp, INITIAL);

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-muted-foreground text-sm">
          No password required. We will email you a sign-in link and a code.
        </p>
      </div>

      {!reqState.sent ? (
        <form action={requestAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@business.com"
            />
          </div>
          {reqState.error ? (
            <p className="text-destructive text-sm">{reqState.error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={requestPending}>
            {requestPending ? "Sending…" : "Send me a sign-in code"}
          </Button>
        </form>
      ) : (
        <form action={verifyAction} className="space-y-4">
          <p className="text-muted-foreground text-sm">
            We sent a 6-digit code and a sign-in link to{" "}
            <span className="text-foreground font-medium">{email}</span>. Enter the
            code below, or click the link in the email.
          </p>
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="redirect" value={redirectTo} />
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium">
              6-digit code
            </label>
            <Input
              id="token"
              name="token"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              placeholder="123456"
            />
          </div>
          {verifyState.error ? (
            <p className="text-destructive text-sm">{verifyState.error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={verifyPending}>
            {verifyPending ? "Verifying…" : "Verify and continue"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Suspense
        fallback={<div className="text-muted-foreground text-sm">Loading…</div>}
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
