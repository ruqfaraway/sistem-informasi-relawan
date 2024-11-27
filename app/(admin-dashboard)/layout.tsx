import { SidebarComps } from "../../components/sidebar-admin/SidebarComps";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarComps>{children}</SidebarComps>;
}
