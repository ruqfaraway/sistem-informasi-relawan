import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import UserVolunteerPage from "./comp/UserVolunteerPage";
import { getDataUserVolunteerPagination } from "./actions";

const page = async ({
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
  if (session.superAdmin) {
    redirect("/dashboard");
  }
  const page = searchParams.page ?? 1;
  const perPage = searchParams.perPage ?? 10;
  const { data } = await getDataUserVolunteerPagination(page, perPage);
  return <UserVolunteerPage dataSource={data} />;
};

export default page;
