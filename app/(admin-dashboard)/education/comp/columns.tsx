"use client";
import { DeleteButton } from "@/components/Admin";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import apiHandler from "@/lib/apiHandler";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { DeleteEducation } from "../actions";
import { revalidatePath } from "next/cache";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface Education {
  id: string;
  code: string;
  name: string;
}

export const EducationColumns: ColumnDef<Education>[] = [
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
    accessorKey: "action",
    header: "Action",
    cell: function Cell({ row }) {
      const [loading, setLoading] = useState(false);
      const { toast } = useToast();
      const handleDelete = async (id: string) => {
        setLoading(true);
        try {
          const res = await DeleteEducation(id);
          if (res.success) {
            setLoading(false);
            toast({
              title: "Success",
              description: res.message,
            });
          }
        } catch (error) {
          setLoading(false);
          toast({
            title: "Error",
            description: "Error ini bang",
          });
        }
      };
      return (
        <div className="flex space-x-4">
          <Link href={`/education/detail/${row.original.id}`}>
            <Button>Edit</Button>
          </Link>
          <DeleteButton
            id={row.original.id}
            handleDelete={handleDelete}
            loading={loading}
          />
        </div>
      );
    },
  },
];
