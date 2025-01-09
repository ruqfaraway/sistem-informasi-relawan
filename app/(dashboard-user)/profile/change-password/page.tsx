import React from "react";
import FormChangePassword from "./FormChangePassword";
import { getSession } from "@/lib/session";

const page = async () => {
  const session = await getSession();
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { user_id } = session;

  return <FormChangePassword userId={user_id ?? ""} />;
};

export default page;
