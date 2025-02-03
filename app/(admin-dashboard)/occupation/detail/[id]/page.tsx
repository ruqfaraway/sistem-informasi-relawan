import React from "react";
import UpdateOccupationForm from "./UpdateOccupationForm";
import apiHandler from "@/lib/apiHandler";
import { revalidatePath } from "next/cache";

const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getDetailOccupation(params.id);
  return (
    <>
      <div>DetailPage</div>
      <UpdateOccupationForm initialValues={data} />
    </>
  );
};

const getDetailOccupation = async (id: string) => {
  return apiHandler
    .request({
      method: "GET",
      url: `api/admin/occupation/detail/${id}`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error in get detail occupation:", err);
      return null;
    })
    .finally(() => {
      revalidatePath(`/occupation/detail/${id}`);
    });
};

export default DetailPage;
