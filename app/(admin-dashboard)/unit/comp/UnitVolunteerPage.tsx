"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import TableUnit from "./TableUnit";
import { useRouter } from "next/navigation";
import { Unit } from "./columns";

const UnitVolunteerPage = ({ dataSource }: { dataSource: Unit[] }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/unit/add")}>Add Unit</Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableUnit data={dataSource} />
      </div>
    </>
  );
};

export default UnitVolunteerPage;
