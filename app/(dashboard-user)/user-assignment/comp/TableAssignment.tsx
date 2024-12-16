"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
interface AssignmentPageProps {
  dataSource: {
    data: data[];
    metadata: {
      page: number;
      perPage: number;
      total: number;
    };
  };
}
interface data {
  id: string;
  name: string;
  type: string;
  start_date: Date;
  end_date: Date;
}

const TableAssignment: React.FC<AssignmentPageProps> = ({ dataSource }) => {
  const { data, metadata } = dataSource;
  return <DataTable columns={columns} data={data} query={metadata} />;
};

export default TableAssignment;
