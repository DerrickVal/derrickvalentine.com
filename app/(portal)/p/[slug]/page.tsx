import { PortalDashboard } from "@/components/portal/portal-dashboard";

// Auth is enforced by app/(portal)/layout.tsx (redirects to /login if signed out).
// Phase 2 will gate on is_project_member() for this slug and load real data.
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PortalDashboard slug={slug} />;
}
