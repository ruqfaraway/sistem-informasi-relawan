"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { VolunteersType } from "../types/volunteer.type";

export const columns: ColumnDef<VolunteersType>[] = [
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
    accessorKey: "position_id",
    header: "Posisi",
  },
  {
    accessorKey: "unit_id",
    header: "Unit",
  },
  {
    accessorKey: "occupation_id",
    header: "Pekerjaan",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-4">
          <Link href={`/volunteer-management/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton id={row.original.id} />
        </div>
      );
    },
  },
];
