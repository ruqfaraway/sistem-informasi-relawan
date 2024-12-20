import React from "react";
import UpdateEducationForm from "./UpdateEducationForm";
import { getDetailEducation } from "../../actions";

const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getDetailEducation(params.id);

  return (
    <>
      <div>DetailPage</div>
      <UpdateEducationForm initialValues={data} />
    </>
  );
};

export default DetailPage;
