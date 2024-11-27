import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableUnit = () => {
  return (
    <>
      <DataTable columns={columns} data={[]} />
    </>
  );
};

export default TableUnit;
