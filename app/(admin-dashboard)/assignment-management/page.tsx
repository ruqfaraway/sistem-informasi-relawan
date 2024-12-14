"use server";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getAssignmentData } from "./actions";
import AssignmentPage from "./comp/AssignmentPage";

const Page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const data = await getAssignmentData();
  return (
    <>
      <AssignmentPage dataSource={data.data} />
    </>
  );
};

export default Page;
