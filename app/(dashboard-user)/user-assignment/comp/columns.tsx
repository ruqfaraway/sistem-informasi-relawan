"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Assignment = {
  id: string;
  name: string;
  type: string;
  start_date: Date;
  end_date: Date;
};

export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return <div className="text-left">{
        new Date(row.original.start_date).toLocaleDateString()
      }</div>;
    }
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      return <div className="text-left">{
        new Date(row.original.end_date).toLocaleDateString()
      }</div>;
    }
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-4">
          <Link href={`/user-assignment/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton id={row.original.id} />
        </div>
      );
    },
  },
];
