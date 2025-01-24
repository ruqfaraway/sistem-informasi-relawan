"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { EducationDataTypes } from "@/types/education";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { DataTable } from "@/components/MainTable/MainTable";
import { EducationColumns } from "./columns";

const EducationPage = ({
  dataSource,
  query,
}: {
  dataSource: EducationDataTypes[];
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
        <Button onClick={() => router.push("/education/add")}>
          Add Education
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
        <DataTable columns={EducationColumns} data={dataSource} query={query} />
      </div>
    </>
  );
};

export default EducationPage;
