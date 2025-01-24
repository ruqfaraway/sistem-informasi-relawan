"use server";
import { getSession } from "@/lib/session";
import EducationPage from "./comp/EducationPage";
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

  const result = await getListEducation({
    page,
    query,
  });
  if (!result) {
    return <div>Error fetching data</div>;
  }
  const { data, metadata } = result;
  return (
    <>
      <EducationPage dataSource={data} query={metadata} />
    </>
  );
};

export default Page;

const getListEducation = async ({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) => {
  return apiHandler
    .request({
      method: "GET",
      url: "/api/admin/education/list",
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
      revalidatePath("/education");
    });
};
