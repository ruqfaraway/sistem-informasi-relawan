'use server';
import React from "react";
import { getDetailOccupation } from "../../actions";
import UpdateOccupationForm from "./UpdateOccupationForm";

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

export default DetailPage;
