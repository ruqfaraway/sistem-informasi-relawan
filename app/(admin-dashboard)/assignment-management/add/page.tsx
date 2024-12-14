"use server";
import React from "react";
import AddAssignmentForm from "./AddAssignmentForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getAllVolunteerData } from "../../volunteer-management/actions";
import { getAssignmentTypeData } from "../../assignment-type/actions";

const AddAssignmentPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }

  const { data: volunteerList } = await getAllVolunteerData();
  const { data: assignmentTypeList } = await getAssignmentTypeData();

  console.log(volunteerList, assignmentTypeList);
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
