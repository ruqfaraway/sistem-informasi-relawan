"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
interface AssignmentTypePageProps {
  dataSource: data[];
}
interface data {
  id: string;
  code: string;
  assignment_type: string;
}

const TableAssignmentType: React.FC<AssignmentTypePageProps> = ({
  dataSource,
}) => {
  return <DataTable columns={columns} data={dataSource} />;
};

export default TableAssignmentType;
