import React from "react";
import AddEducationForm from "./AddEducationForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const AddEducationPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div>Add Education Page</div>
      <AddEducationForm />
    </>
  );
};

export default AddEducationPage;
