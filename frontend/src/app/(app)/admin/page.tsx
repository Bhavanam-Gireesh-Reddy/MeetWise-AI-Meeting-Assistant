import { AdminPage } from "@/components/admin/admin-page";
import { getServerAuthUser } from "@/lib/server-auth";

export default async function AdminRoutePage() {
  const user = await getServerAuthUser();

  return <AdminPage initialIsAdmin={Boolean(user?.is_admin)} />;
}
