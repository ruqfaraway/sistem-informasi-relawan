"use server";
import { getSession } from "@/lib/session";
import { getUnitVolunteerData } from "./actions";
import UnitVolunteerPage from "./comp/UnitVolunteerPage";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if(!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const dataUnitVolunteer = await getUnitVolunteerData();
  return <UnitVolunteerPage dataSource={dataUnitVolunteer.data} />;
};

export default page;
