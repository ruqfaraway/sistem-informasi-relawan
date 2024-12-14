"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import TableAssignmentType from "./TableAssignmentType";
interface AssignmentTypePageProps {
  dataSource: data[];
}
interface data {
  id: string;
  code: string;
  assignment_type: string;
}
const AssignmentTypePage: React.FC<AssignmentTypePageProps> = ({
  dataSource,
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/assignment-type/add")}>
          Add Assignment Type
        </Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableAssignmentType dataSource={dataSource} />
      </div>
    </>
  );
};

export default AssignmentTypePage;
