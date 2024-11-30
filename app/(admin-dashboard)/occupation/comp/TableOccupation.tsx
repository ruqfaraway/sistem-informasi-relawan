"use client";
import React from "react";

import { DataTable } from "@/components/MainTable/MainTable";
import { columns } from "./columns";

interface OccupationPageProps {
  dataSource: data[];
}
interface data {
  id: string;
  code: string;
  occupation: string;
}
const TableOccupation: React.FC<OccupationPageProps> = ({
  dataSource = [],
}) => {
  return <DataTable columns={columns} data={dataSource} />;
};

export default TableOccupation;
