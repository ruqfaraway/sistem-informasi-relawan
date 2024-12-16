"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
import { VolunteersType } from "../types/volunteer.type";

const TableVolunteer = ({
  dataSource,
}: {
  dataSource: {
    data: VolunteersType[];
    metadata: {
      page: number;
      perPage: number;
      total: number;
    };
  };
}) => {
  const { data, metadata } = dataSource;

  return <DataTable columns={columns} data={data} query={metadata} />;
};

export default TableVolunteer;
