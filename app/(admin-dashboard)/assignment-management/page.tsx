"use server";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getAssignmentDataAdminPaginate } from "./actions";
import AssignmentPage from "./comp/AssignmentPage";

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
  const perPage = Number(searchParams?.perPage) || 10;
  const { data: list } = await getAssignmentDataAdminPaginate(page, perPage);

  return (
    <>
      <AssignmentPage dataSource={list} />
    </>
  );
};

export default Page;
