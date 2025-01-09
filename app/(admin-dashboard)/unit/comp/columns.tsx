"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-4">
          <Link href={`/unit/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          {/* <DeleteButton id={row.original.id} /> */}
        </div>
      );
    },
  },
];
