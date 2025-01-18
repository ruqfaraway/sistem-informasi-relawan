"use server";
import { getSession } from "@/lib/session";
import UnitVolunteerPage from "./comp/UnitVolunteerPage";
import { redirect } from "next/navigation";
import apiHandler from "@/lib/apiHandler";

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
  const page = parseInt(searchParams.page ?? "1", 10); // Default to page 1
  const query = searchParams.name ?? ""; // Default to empty query
  const listUnit = await getListUnit({ page, query });
  if (!listUnit) {
    return <div>Error fetching data</div>;
  }
  const { data, metadata } = listUnit;
  return <UnitVolunteerPage dataSource={data} query={metadata} />;
};

export default page;

const getListUnit = async ({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) => {
  return apiHandler
    .request({
      method: "GET",
      url: "/api/admin/unit/list",
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
    });
};
