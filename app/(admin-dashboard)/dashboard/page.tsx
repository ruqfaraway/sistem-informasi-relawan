import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (session.isLoggedIn === false) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }

  return (
    <>
      <div>hehe</div>
    </>
  );
}
