import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth/getUser";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/login?redirect=/admin");
  if (user.profile?.role !== "admin") redirect("/portal");
  return children;
}
