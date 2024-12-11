import React from "react";
import UserDashboardPage from "./comps/UserDashboardPage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getDataTotalVolunteers } from "./actions";

const page = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  const data = await getDataTotalVolunteers();
  const dashboardData = {
    total_volunteers: data?.total_volunteers ?? 0,
  };
  return (
    <>
      <UserDashboardPage dataSource={dashboardData} />
    </>
  );
};

export default page;
