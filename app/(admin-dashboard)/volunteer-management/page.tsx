import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import TableVolunteer from "./comp/TableVolunteer";

const page = () => {
  return (
    <>
      <div className="flex justify-between">
        <Button>Add Volunteer</Button>
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

export default page;
