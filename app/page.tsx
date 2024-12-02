import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session.isLoggedIn && session.superAdmin) {
    redirect("/dashboard");
  } else redirect("/login");
  return <></>;
}
