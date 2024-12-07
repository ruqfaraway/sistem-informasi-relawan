import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session.isLoggedIn) {
    if (session.superAdmin) {
      redirect("/dashboard");
    } else {
      redirect("/user-dashboard");
    }
  } else redirect("/login");
  return <></>;
}
