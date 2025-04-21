"use server";
import React from "react";
import AddEducationForm from "./AddOccupationForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const AddOccupationPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div>Add Occupation Page</div>
      <AddEducationForm />
    </>
  );
};

export default AddOccupationPage;
