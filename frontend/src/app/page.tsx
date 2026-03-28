import { redirect } from "next/navigation";

import { getServerAuthUser } from "@/lib/server-auth";

export default async function Home() {
  const user = await getServerAuthUser();

  redirect(user ? "/dashboard" : "/login");
}
