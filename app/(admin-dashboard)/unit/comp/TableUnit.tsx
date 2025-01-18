"use client";
import React from "react";
import { columns, Unit } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableUnit = ({
  data,
  query,
}: {
  data: Unit[];
  query: {
    page: number;
    perPage: number;
    total: number;
  };
}) => {
  return (
    <>
      <DataTable columns={columns} data={data} query={query} />
    </>
  );
};

export default TableUnit;
