import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableAssignment = () => {
  return <DataTable columns={columns} data={[]} />;
};

export default TableAssignment;
