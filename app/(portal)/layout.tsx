import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth/getUser";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login?redirect=/portal");
  return children;
}
