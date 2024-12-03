"use server";
import React from "react";
import AddVolunteerForm from "./AddVolunteer";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import {
  getDataEducation,
  getDataOccupation,
  getDataPosition,
  getDataReligion,
  getDataUnit,
  getDataVolunteerType,
} from "../actions";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { data: educationList } = await getDataEducation();
  const { data: occupationList } = await getDataOccupation();
  const { data: positionList } = await getDataPosition();
  const { data: unitList } = await getDataUnit();
  const { data: volunteerTypeList } = await getDataVolunteerType();
  const { data: religionList } = await getDataReligion();
  return (
    <AddVolunteerForm
      educationList={educationList}
      occupationList={occupationList}
      positionList={positionList}
      unitList={unitList}
      volunteerTypeList={volunteerTypeList}
      religionList={religionList}
    />
  );
};

export default page;
