import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminDashboardPage from "./comp/DashboardPage";
import { getDataTotalVolunteers } from "@/app/(dashboard-user)/user-dashboard/actions";

export default async function Page() {
  const session = await getSession();
  if (session.isLoggedIn === false) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
 const data = await getDataTotalVolunteers();
  const dashboardData = {
    total_volunteers: data?.total_volunteers ?? 0,
  };
  return (
    <>
      <AdminDashboardPage dataSource={dashboardData}/>
    </>
  );
}
