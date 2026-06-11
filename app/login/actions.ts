"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { AuthActionState } from "./types";

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function safeInternalPath(path: unknown): string | null {
  if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return null;
}

/** Step 1: email a sign-in link and a 6-digit code (passwordless). */
export async function requestOtp(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = formData.get("email");
  if (!isValidEmail(email)) return { error: "Enter a valid email address." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });
  if (error) return { error: error.message };

  return { sent: true };
}

/** Step 2: verify the 6-digit code, set the session, route by role. */
export async function verifyOtp(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = formData.get("email");
  const token = formData.get("token");
  if (!isValidEmail(email)) return { error: "Something went wrong. Start again." };
  if (typeof token !== "string" || !/^\d{6}$/.test(token.trim())) {
    return { error: "Enter the 6-digit code from your email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: token.trim(),
    type: "email",
  });
  if (error) return { error: error.message };

  // Honor a safe internal redirect target, else route by role.
  let dest = safeInternalPath(formData.get("redirect"));
  if (!dest) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    let role: string | null = null;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      role = profile?.role ?? null;
    }
    dest = role === "admin" ? "/admin" : "/portal";
  }
  redirect(dest);
}

/** Sign out and return to the login screen. */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
