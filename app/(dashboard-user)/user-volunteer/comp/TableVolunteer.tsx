"use client";
import React from "react";
import { columns, VolunteersType } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableVolunteer = ({
  dataSource,
}: {
  dataSource: {
    data: VolunteersType[];
    metadata: { total: number; page: number; perPage: number };
  };
}) => {
  const { data, metadata } = dataSource;
  return <DataTable columns={columns} data={data} query={metadata} />;
};

export default TableVolunteer;
