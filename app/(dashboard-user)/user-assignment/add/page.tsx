"use server";
import React from "react";
import AddAssignmentForm from "./AddAssignmentForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getDataUserVolunteer } from "../../user-volunteer/actions";
import { getAssignmentTypeData } from "@/app/(admin-dashboard)/assignment-type/actions";

const AddAssignmentPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.superAdmin) {
    redirect("/dashboard");
  }

  const { data: volunteerList } = await getDataUserVolunteer();
  const { data: assignmentTypeList } = await getAssignmentTypeData();
  return (
    <>
      <div>Add Assignment Page</div>
      <AddAssignmentForm
        volunteerList={volunteerList}
        assignmentTypeList={assignmentTypeList}
      />
    </>
  );
};

export default AddAssignmentPage;
