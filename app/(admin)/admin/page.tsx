import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";

export default function AdminHome() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-muted-foreground mt-2">
        Clients, projects, content requests, and payments will be managed here.
      </p>
      <form action={signOut} className="mt-8">
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </main>
  );
}
