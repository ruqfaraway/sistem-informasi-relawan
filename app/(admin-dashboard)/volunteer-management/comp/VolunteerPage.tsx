"use client";
import React from "react";
import TableVolunteer from "./TableVolunteer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { VolunteersType } from "../types/volunteer.type";

const VolunteerPage = ({
  dataSource,
}: {
  dataSource: {
    data: VolunteersType[];
    metadata: {
      page: number;
      perPage: number;
      total: number;
    };
  };
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/volunteer-management/add")}>
          Add Volunteer
        </Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableVolunteer dataSource={dataSource} />
      </div>
    </>
  );
};

export default VolunteerPage;
