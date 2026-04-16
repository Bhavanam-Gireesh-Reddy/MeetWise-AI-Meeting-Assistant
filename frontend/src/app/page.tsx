import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/server-auth";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { FeatureGrid } from "@/components/landing/feature-grid";

export default async function Home() {
  const user = await getServerAuthUser();

  // Redirect authenticated users to the dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-[#0A0A0B]">
      <LandingNavbar />
      <main>
        <LandingHero />
        <FeatureGrid />
      </main>
    </div>
  );
}
