"use server";
import React from "react";
import VolunteerPage from "./comp/VolunteerPage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getDataVolunteer, getDataVolunteerAdminPagination } from "./actions";

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
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const { data } = await getDataVolunteer();

  const page = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 10;

  const { data: list } = await getDataVolunteerAdminPagination({
    page,
    perPage,
  });

  return (
    <>
      <VolunteerPage dataSource={list} />
    </>
  );
};

export default page;
