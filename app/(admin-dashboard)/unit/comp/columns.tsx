"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Unit = {
  id: string;
  name: string;
  builder: string;
  birth_date: Date;
};

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "builder",
    header: "Coach",
  },
  {
    accessorKey: "birth_date",
    header: "Birth Date",
    cell: ({ row }) => {
      return <div>{new Date(row.original.birth_date).toDateString()}</div>;
    },
  },
  
];
