import "server-only";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export interface AuthUser {
  id: string;
  email: string | null;
  profile: Profile | null;
}

/**
 * Server-only: the signed-in Supabase user plus their profile row (role,
 * segment, ...), or null if not authenticated. Uses `auth.getUser()`, which
 * validates the session with Supabase Auth (not just decoding the cookie).
 * Memoized per request with React `cache()` so layouts/pages/actions can call it
 * freely without extra round-trips.
 */
export const getUser = cache(async (): Promise<AuthUser | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { id: user.id, email: user.email ?? null, profile: profile ?? null };
});

/** True when the signed-in user is an admin (Derrick). */
export const isAdmin = cache(async (): Promise<boolean> => {
  const user = await getUser();
  return user?.profile?.role === "admin";
});
