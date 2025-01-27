import React from "react";
import UpdateEducationForm from "./UpdateEducationForm";
import apiHandler from "@/lib/apiHandler";
import { revalidatePath } from "next/cache";

const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getDetailEducation(params.id);
  console.log(data)

  return (
    <>
      <div>DetailPage</div>
      <UpdateEducationForm initialValues={data} />
    </>
  );
};

const getDetailEducation = async (id: string) => {
  return apiHandler
    .request({
      method: "GET",
      url: `api/admin/education/detail/${id}`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error in get detail education:", err);
      return null;
    }).finally(() => {
      revalidatePath(`/education/detail/${id}`);
    });
};

export default DetailPage;
