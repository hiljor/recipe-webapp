import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthComponents from "@/ui/auth/authComponents"

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Welcome to My App</h1>
      <AuthComponents />
    </main>
  );
}
