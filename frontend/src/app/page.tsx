import { LandingPage } from "@/components/landing/landing-page";
import { getServerAuthUser } from "@/lib/server-auth";

export default async function Home() {
  const user = await getServerAuthUser();

  return <LandingPage isLoggedIn={Boolean(user)} />;
}
