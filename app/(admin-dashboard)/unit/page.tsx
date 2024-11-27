import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import TableUnit from "./comp/TableUnit";

const page = () => {
  return (
    <>
      <div className="flex justify-between">
        <Button>Add Unit</Button>
        <form>
        <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableUnit />
      </div>
    </>
  );
};

export default page;
