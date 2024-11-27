"use server";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session.isLoggedIn === true) {
    redirect("/dashboard");
  } else redirect("/login");
  return <></>;
}
