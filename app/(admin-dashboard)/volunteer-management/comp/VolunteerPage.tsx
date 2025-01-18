"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VolunteersType } from "../types/volunteer.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { DataTable } from "@/components/MainTable/MainTable";
import { Columns } from "./columns";

const VolunteerPage = ({
  dataSource,
  query,
}: {
  dataSource: VolunteersType[];
  query: {
    page: number;
    perPage: number;
    total: number;
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const form = useForm<{ name: string }>();
  const onSubmit = (data: { name: string }) => {
    const { name } = data;
    const params = new URLSearchParams(searchParams);
    if (name) {
      params.set("name", name);
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}`);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/volunteer-management/add")}>
          Add Volunteer
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" size="icon" type="submit">
                <SearchIcon />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div>
        <DataTable columns={Columns} data={dataSource} query={query} />
      </div>
    </>
  );
};

export default VolunteerPage;
