"use server";
import React from "react";
import { getDetailVolunteerData } from "@/model/volunteer.data";
import UpdateVolunteerForm from "./UpdateVolunteerForm";
import {
  getDataEducation,
  getDataOccupation,
  getDataPosition,
  getDataReligion,
  getDataUnit,
  getDataVolunteerType,
} from "../../actions";
import apiHandler from "@/lib/apiHandler";

const DetailPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const data = await getDetailVolunteerData(params.id);
  const { data: educationList } = await getDataEducation();
  const { data: occupationList } = await getDataOccupation();
  const { data: positionList } = await getDataPosition();
  const { data: unitList } = await getDataUnit();
  const { data: volunteerTypeList } = await getDataVolunteerType();
  const { data: religionList } = await getDataReligion();

  const { data: volunteerDetail } = await getDetailVolunteer(params.id);
  return (
    <>
      <UpdateVolunteerForm
        initialValues={volunteerDetail}
        educationList={educationList}
        occupationList={occupationList}
        positionList={positionList}
        unitList={unitList}
        volunteerTypeList={volunteerTypeList}
        religionList={religionList}
      />
    </>
  );
};

export default DetailPage;

const getDetailVolunteer = async (id: string) => {
  return apiHandler
    .request({
      url: `/api/admin/volunteer/detail/${id}`,
      method: "GET",
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
