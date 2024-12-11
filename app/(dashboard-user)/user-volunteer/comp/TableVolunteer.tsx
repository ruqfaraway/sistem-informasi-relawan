'use client'
import React from "react";
import { columns, VolunteersType } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";

const TableVolunteer = ({ data }: { data: VolunteersType[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default TableVolunteer;
