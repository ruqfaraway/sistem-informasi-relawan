"use client";
import { DeleteButton } from "@/components/Admin";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import apiHandler from "@/lib/apiHandler";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { DeleteEducation } from "../actions";
import { useRouter } from "next/navigation";

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
    cell: function Cell({ row }) {
      const [loading, setLoading] = useState(false);
      const { toast } = useToast();
      const router = useRouter();
      const handleDelete = async (id: string) => {
        setLoading(true);
        try {
          const res = await apiHandler.request({
            method: "DELETE",
            url: `/api/admin/education/delete`,
            data: { id },
          });
          if ([200, 201].includes(res.status)) {
            setLoading(false);
            toast({
              title: "Success",
              description: res.data.message,
            });
          }
        } catch (error) {
          setLoading(false);
          toast({
            title: "Error",
            description: "Error ini bang",
          });
        } finally {
          setLoading(false);
          router.refresh();
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
