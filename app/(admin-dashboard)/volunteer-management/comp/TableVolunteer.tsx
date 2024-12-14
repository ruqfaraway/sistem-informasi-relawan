'use client'
import React from "react";
import { columns,  } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
import { VolunteersType } from "../types/volunteer.type";

const TableVolunteer = ({ data }: { data: VolunteersType[] }) => {
  return <DataTable columns={columns} data={data} />;
};

export default TableVolunteer;
