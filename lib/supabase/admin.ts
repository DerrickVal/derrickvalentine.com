import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

/**
 * Service-role Supabase client. Uses the SECRET key and BYPASSES RLS, so it is
 * server-only and every caller MUST first verify the actor is an admin
 * (`role === "admin"`) before touching data.
 *
 * Use for admin/structural writes (templates, creating/sending requests,
 * approvals, status changes, payments) and cron jobs. Never import this into a
 * Client Component.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
