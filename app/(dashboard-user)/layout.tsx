import { SidebarComps2 } from "@/components/user-dashboard/SidebarComps2";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return <SidebarComps2 name={session?.name ?? ""}>{children}</SidebarComps2>;
}
