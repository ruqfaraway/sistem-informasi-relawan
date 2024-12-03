"use client";
import React from "react";
import TableVolunteer from "./TableVolunteer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const VolunteerPage = () => {
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
        <TableVolunteer />
      </div>
    </>
  );
};

export default VolunteerPage;
