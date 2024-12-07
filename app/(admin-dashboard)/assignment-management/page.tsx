import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import TableAssignment from "./comp/TableAssignment";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if(!session) {
    redirect("/login");
  }
  if (!session.superAdmin) {
    redirect("/user-dashboard");
  }
  return (
    <>
      <div className="flex justify-between">
        <Button>Add Assignment</Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableAssignment />
      </div>
    </>
  );
};

export default page;
