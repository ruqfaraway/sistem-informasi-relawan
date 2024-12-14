"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
interface AssignmentPageProps {
  dataSource: data[];
}
interface data {
  id: string;
  name: string;
  type: string;
  start_date: Date;
  end_date: Date;
}

const TableAssignment: React.FC<AssignmentPageProps> = ({
  dataSource,
}) => {
  return <DataTable columns={columns} data={dataSource} />;
};

export default TableAssignment;
