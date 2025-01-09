"use server";
import React from "react";
import UpdateUnitVolunteer from "./UpdateUnitVolunteer";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import apiHandler from "@/lib/apiHandler";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  const { data } = await getDetailUnit(id);
  return <UpdateUnitVolunteer initialValues={data} />;
};

export default page;

const getDetailUnit = async (id: string) => {
  return apiHandler
    .request({
      method: "GET",
      url: `api/admin/unit/detail/${id}`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error in getDetailUnit:", err);
      return null;
    });
};
