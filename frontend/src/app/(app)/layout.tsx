import { redirect } from "next/navigation";

import { AppShell } from "@/components/app/app-shell";
import { getServerAuthUser } from "@/lib/server-auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getServerAuthUser();

  if (!user) {
    redirect("/login");
  }

  return <AppShell user={user}>{children}</AppShell>;
}
