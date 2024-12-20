"use server";
import { getSession } from "@/lib/session";
import { getPaginationEducation } from "./actions";
import EducationPage from "./comp/EducationPage";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    perPage: number;
  };
}) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const page = Number(searchParams?.page) || 1;
  const per_page = Number(searchParams?.perPage) || 10;

  const { data: list } = await getPaginationEducation(page, per_page);
  return (
    <>
      <EducationPage dataSource={list} />
    </>
  );
};

export default Page;
