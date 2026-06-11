import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth/getUser";
import { signOut } from "@/app/login/actions";

export default async function PortalHome() {
  const user = await getUser();
  const name = user?.profile?.full_name ?? user?.email ?? "there";

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
      <p className="text-muted-foreground mt-2">
        Your projects, content requests, and invoices will live here.
      </p>
      <form action={signOut} className="mt-8">
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </main>
  );
}
