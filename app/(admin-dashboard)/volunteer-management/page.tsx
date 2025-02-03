"use server";
import React from "react";
import VolunteerPage from "./comp/VolunteerPage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import apiHandler from "@/lib/apiHandler";
import { revalidatePath } from "next/cache";

const page = async ({
  searchParams,
}: {
  searchParams: { page?: string; name?: string };
}) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }

  // const page = Number(searchParams?.page) || 1;
  // const perPage = Number(searchParams?.perPage) || 10;

  // const { data: list } = await getDataVolunteerAdminPagination({
  //   page,
  //   perPage,
  // });

  const page = parseInt(searchParams.page ?? "1", 10); // Default to page 1
  const query = searchParams.name ?? ""; // Default to empty query
  const listUnit = await getListVolunteer({ page, query });
  if (!listUnit) {
    return <div>Error fetching data</div>;
  }
  const { data, metadata } = listUnit;

  return (
    <>
      <VolunteerPage dataSource={data} query={metadata} />
    </>
  );
};

export default page;

const getListVolunteer = async ({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) => {
  return apiHandler
    .request({
      method: "GET",
      url: "/api/admin/volunteer/list",
      params: {
        page,
        query,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    })
    .finally(() => {
      revalidatePath("/volunteer-management");
    });
};
