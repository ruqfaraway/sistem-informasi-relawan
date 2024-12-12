"use server";
import React from "react";
import { getDetailVolunteerData } from "@/model/volunteer.data";
import UpdateUserVolunteerForm from "./UpdateUserVolunteerForm";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getDataEducation, getDataOccupation, getDataPosition, getDataReligion, getDataVolunteerType } from "../../actions";


const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getDetailVolunteerData(params.id);
  const initialValues = {
    volunteer_id: data.volunteer_id,
    volunteer_type_id: data.volunteer_type_id,
    religion_id: data.religion_id,
    education_id: data.education_id,
    occupation_id: data.occupation_id,
    position_id: data.position_id,
    name: data.name,
    born_place: data.born_place,
    birth_date: data.birth_date,
    gender: data.gender,
    blood_type: data.blood_type,
    address: data.address,
    phone: data.phone,
    email: data.email,
    join_date: data.join_date,
    period: data?.period ?? undefined,
    status: data.status,
    isOfficer: data.isOfficer,
  };

  const { data: educationList } = await getDataEducation();
  const { data: occupationList } = await getDataOccupation();
  const { data: positionList } = await getDataPosition();
  const { data: volunteerTypeList } = await getDataVolunteerType();
  const { data: religionList } = await getDataReligion();
  return (
    <>
      <div>DetailPage</div>
      <UpdateUserVolunteerForm
        initialValues={initialValues}
        educationList={educationList ?? []}
        occupationList={occupationList ?? []}
        positionList={positionList ?? []}
        volunteerTypeList={volunteerTypeList ?? []}
        religionList={religionList ?? []}
      />
    </>
  );
};

export default DetailPage;
