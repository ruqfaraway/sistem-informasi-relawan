"use server";
import React from "react";
import VolunteerPage from "./comp/VolunteerPage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getDataVolunteer } from "./actions";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const { data } = await getDataVolunteer();

  return (
    <>
      <VolunteerPage dataSource={data} />
    </>
  );
};

export default page;
