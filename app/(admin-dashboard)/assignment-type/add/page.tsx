import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AddAssignmentTypeForm from "./AddAssignmentTypeForm";

const AddAssignmentTypePage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div>Add Education Page</div>
      <AddAssignmentTypeForm />
    </>
  );
};

export default AddAssignmentTypePage;
