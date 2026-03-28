import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getServerAuthUser } from "@/lib/server-auth";

export default async function RegisterPage() {
  const user = await getServerAuthUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      alternateHref="/login"
      alternateLabel="Sign in instead"
      alternateText="Already have access to the workspace?"
      description="Launch the migration with a polished light-themed account flow that stays close to your current API behavior while feeling much more production-ready."
      eyebrow="Account Setup"
      title="Create a professional front door for the new Next.js app"
    >
      <RegisterForm />
    </AuthShell>
  );
}
