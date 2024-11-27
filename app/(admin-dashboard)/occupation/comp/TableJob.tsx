import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableOccupation = () => {
  return <DataTable columns={columns} data={[]} />;
};

export default TableOccupation;
