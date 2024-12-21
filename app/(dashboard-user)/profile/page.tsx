import React from "react";
import ProfilePage from "./comps/profilePage";
import { getSession } from "@/lib/session";
import { getDetailProfileData } from "./actions";

const page = async () => {
  const session = await getSession();
  const { data } = await getDetailProfileData();

  return <ProfilePage dataSource={data} />;
};

export default page;
