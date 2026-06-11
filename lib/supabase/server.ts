import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/database";

/**
 * Server Supabase client (RSC, Route Handlers, Server Actions). Reads and writes
 * the user's session from cookies via @supabase/ssr, so it acts as the signed-in
 * user and access is enforced by RLS.
 *
 * For privileged/structural writes that must bypass RLS (templates, sending
 * requests, approvals, status, payments), use `createAdminClient()` from
 * `./admin` instead, after an explicit admin role check.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll can be called from a Server Component, where mutating
            // cookies is disallowed. Safe to ignore when middleware refreshes
            // the session on each request.
          }
        },
      },
    },
  );
}
