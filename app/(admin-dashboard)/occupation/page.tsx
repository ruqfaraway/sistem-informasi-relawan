"use server";

import { getSession } from "@/lib/session";
import { getDataOccupation } from "./actions";
import OccupationPage from "./comp/EducationPage";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();
  if(!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const data = await getDataOccupation();
  return (
    <>
      <OccupationPage dataSource={data.data} />
    </>
  );
};

export default Page;
