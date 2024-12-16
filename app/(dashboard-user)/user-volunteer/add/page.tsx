"use server";
import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
  getDataEducation,
  getDataOccupation,
  getDataPosition,
  getDataReligion,
  getDataVolunteerType,
} from "../actions";
import AddUserVolunteerForm from "./AddVolunteer";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { data: educationList } = await getDataEducation();
  const { data: occupationList } = await getDataOccupation();
  const { data: positionList } = await getDataPosition();
  const { data: volunteerTypeList } = await getDataVolunteerType();
  const { data: religionList } = await getDataReligion();

  return (
    <AddUserVolunteerForm
      educationList={educationList}
      occupationList={occupationList}
      positionList={positionList}
      volunteerTypeList={volunteerTypeList}
      religionList={religionList}
    />
  );
};

export default page;
