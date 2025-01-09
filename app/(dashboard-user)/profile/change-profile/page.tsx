"use server";
import React from "react";
import FormChangeProfile from "./FormChangeProfile";
import { getSession } from "@/lib/session";
import apiHandler from "@/lib/apiHandler";

const page = async () => {
  const initialData = await getData();
  return (
    <>
      <FormChangeProfile initialValues={initialData} />
    </>
  );
};

export default page;

const getData = async () => {
  const session = await getSession();
  const { unit_id } = session;
  const res = await apiHandler(`/api/change-profile/detail/${unit_id ?? ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error:", error);
    });
  return res;
};
