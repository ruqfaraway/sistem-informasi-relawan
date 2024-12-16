"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import TableAssignment from "./TableAssignment";
interface AssignmentPageProps {
  dataSource: {
    data : data[];
    metadata: {
      page: number;
      perPage: number;
      total: number;
    };
  }
}
interface data {
  id: string;
  name: string;
  type: string;
  start_date: Date;
  end_date: Date;
}
const AssignmentPage: React.FC<AssignmentPageProps> = ({
  dataSource,
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/user-assignment/add")}>
          Add Assignment 
        </Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableAssignment dataSource={dataSource} />
      </div>
    </>
  );
};

export default AssignmentPage;
