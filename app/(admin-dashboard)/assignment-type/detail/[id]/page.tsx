import React from "react";
import { getDetailAssignmentTypeData } from "../../actions";
import UpdateAssignmentTypeForm from "./UpdateAssignmentTypeForm";

const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getDetailAssignmentTypeData(params.id);

  return (
    <>
      <div>
        <h1>Detail Assignment Type</h1>
      </div>
      <UpdateAssignmentTypeForm initialValues={data} />
    </>
  );
};

export default DetailPage;
