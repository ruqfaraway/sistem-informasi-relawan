"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
interface EducationPageProps {
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
  code: string;
  education: string;
}

const TableEducation: React.FC<EducationPageProps> = ({ dataSource }) => {
  return <DataTable columns={columns} data={dataSource.data} query={dataSource.metadata} />;
};

export default TableEducation;
