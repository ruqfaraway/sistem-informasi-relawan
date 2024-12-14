"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Education = {
  id: string;
  code: string;
  assignment_type: string;
};

export const columns: ColumnDef<Education>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-4">
          <Link href={`/assignment-type/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton id={row.original.id} />
        </div>
      );
    },
  },
];
