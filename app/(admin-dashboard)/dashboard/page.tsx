import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminDashboardPage from "./comp/DashboardPage";
import { getDataTotalVolunteersAdmin } from "./actions";

export default async function Page() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const data = await getDataTotalVolunteersAdmin();
  const dashboardData = {
    total_volunteers: data?.total_volunteers ?? 0,
    total_assignment: data?.total_assignment ?? 0,
  };
  return (
    <>
      <AdminDashboardPage dataSource={dashboardData} />
    </>
  );
}
