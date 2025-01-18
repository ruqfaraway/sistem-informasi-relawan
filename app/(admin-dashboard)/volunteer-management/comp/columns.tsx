"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { VolunteersType } from "../types/volunteer.type";
import { DeleteButton } from "@/components/Admin";
import { useState } from "react";

export const Columns: ColumnDef<VolunteersType>[] = [
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
    accessorKey: "gender",
    header: "Jenis Kelamin"
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: function Cell({ row }) {
      const [loading, setLoading] = useState(false);
      const handleDelete = (id: string) => {
        console.log(id);
        setLoading(true);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      };
      return (
        <div className="flex justify-center space-x-4">
          <Link href={`/volunteer-management/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton
            handleDelete={handleDelete}
            loading={loading}
            id={row.original.id}
          />
        </div>
      );
    },
  },
];
