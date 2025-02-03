"use server";

import { getSession } from "@/lib/session";
import { getDataOccupation } from "./actions";
import OccupationPage from "./comp/OccupationPage";
import { redirect } from "next/navigation";
import apiHandler from "@/lib/apiHandler";
import { revalidatePath } from "next/cache";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    page?: number;
    name?: string;
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
  const query = searchParams.name ?? "";

  const result = await getListOcupation({
    page,
    query,
  }).catch((error) => {
    console.error("Error in get list ocupation:", error);
    return null;
  });

  if (!result) {
    return <div>Error fetching data</div>;
  }
  const { data, metadata } = result;
  return (
    <>
      <OccupationPage dataSource={data} query={metadata} />
    </>
  );
};

export default Page;

const getListOcupation = async ({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) => {
  return apiHandler
    .request({
      method: "GET",
      url: "/api/admin/occupation/list",
      params: {
        page,
        query,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      revalidatePath("/occupation");
    });
};
