import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import UserVolunteerPage from "./comp/UserVolunteerPage";
import { getDataUserVolunteer } from "./actions";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.superAdmin) {
    redirect("/dashboard");
  }
  const { data } = await getDataUserVolunteer();
  return <UserVolunteerPage dataSource={data} />;
};

export default page;
