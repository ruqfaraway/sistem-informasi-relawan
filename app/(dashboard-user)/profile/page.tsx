import React from "react";
import ProfilePage from "./comps/profilePage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import axios from "axios";
const page = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  if (session.superAdmin) {
    redirect("/dashboard");
  }
  const data = await getDetailData();
  const sourceData = {
    ...data,
    birth_date: dayjs(data.birth_date).format("YYYY-MM-DD"),
  };
  return <ProfilePage dataSource={sourceData} />;
};

export default page;

const getDetailData = async () => {
  const session = await getSession();
  const { unit_id } = session;
  const res = await axios
    .request({
      method: "GET",
      url: `http://localhost:3000/api/change-profile/detail/${unit_id ?? ""}`,
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
