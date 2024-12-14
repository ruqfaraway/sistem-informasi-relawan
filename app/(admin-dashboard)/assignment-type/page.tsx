"use server";
import { getSession } from "@/lib/session";
import { getAssignmentTypeData } from "./actions";
import { redirect } from "next/navigation";
import AssignmentTypePage from "./comp/AssignmentTypePage";

const Page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const data = await getAssignmentTypeData();
  return (
    <>
      <AssignmentTypePage dataSource={data.data} />
    </>
  );
};

export default Page;
