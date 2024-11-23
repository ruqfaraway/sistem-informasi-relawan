import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session.isLoggedIn) redirect("/dashboard");
  else redirect("/login");
  return <></>;
}
