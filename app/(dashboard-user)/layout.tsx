import { SidebarComps2 } from "@/components/user-dashboard/SidebarComps2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarComps2>{children}</SidebarComps2>;
}
