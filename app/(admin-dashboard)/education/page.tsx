"use server";
import { getSession } from "@/lib/session";
import { getDataEducation } from "./actions";
import EducationPage from "./comp/EducationPage";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession();
  if(!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const data = await getDataEducation();
  return (
    <>
      <EducationPage dataSource={data.data} />
    </>
  );
};

export default Page;
