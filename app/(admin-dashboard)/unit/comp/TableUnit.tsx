"use client";
import React from "react";
import { columns, Unit } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableUnit = ({ data }: { data: Unit[] }) => {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default TableUnit;
