"use server";
import { getSession } from "@/lib/session";
import { FormLogin } from "./form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <FormLogin />
    </div>
  );
}
