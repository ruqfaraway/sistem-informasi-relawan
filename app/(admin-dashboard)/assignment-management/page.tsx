import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import TableAssignment from "./comp/TableAssignment";

const page = () => {
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
