import React from "react";
import AddUnitVolunteer from "./AddUnitVolunteer";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  return <AddUnitVolunteer />;
};

export default page;
