"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Occupation = {
  id: string;
  code: string;
  occupation: string;
};

export const columns: ColumnDef<Occupation>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "occupation",
    header: "Name",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-4">
          <Link href={`/occupation/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton id={row.original.id} />
        </div>
      );
    },
  },
];
