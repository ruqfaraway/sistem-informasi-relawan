import React from "react";
import { getDetailAssignmentData } from "../../actions";
import UpdateAssignmentForm from "./UpdateAssignmentForm";
import { getAssignmentTypeData } from "@/app/(admin-dashboard)/assignment-type/actions";
import { getDataUserVolunteer } from "@/app/(dashboard-user)/user-volunteer/actions";

const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await getDetailAssignmentData(params.id);
  const { data: volunteerList } = await getDataUserVolunteer();
  const { data: assignmentTypeList } = await getAssignmentTypeData();

  return (
    <>
      <div>
        <h1>Detail Assignment Type</h1>
      </div>
      <UpdateAssignmentForm
        initialValues={data}
        volunteerList={volunteerList}
        assignmentTypeList={assignmentTypeList}
      />
    </>
  );
};

export default DetailPage;
