"use client";
import React from "react";
import TableVolunteer from "./TableVolunteer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { VolunteersType } from "./columns";

const UserVolunteerPage = ({ dataSource }: { dataSource: VolunteersType[] }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/user-volunteer/add")}>
          Add Volunteer
        </Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableVolunteer data={dataSource} />
      </div>
    </>
  );
};

export default UserVolunteerPage;