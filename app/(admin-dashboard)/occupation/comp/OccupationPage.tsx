"use client";
import { DataTable } from "@/components/MainTable/MainTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OccupationDataTypes } from "@/types/occupation";
import { useRouter } from "next/navigation";
import React from "react";
import { OccupationColumns } from "./columns";
const OccupationPage = ({
  dataSource,
  query,
}: {
  dataSource: OccupationDataTypes[];
  query: {
    page: number;
    perPage: number;
    total: number;
  };
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/occupation/add")}>
          Add Occupation
        </Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <DataTable
          columns={OccupationColumns}
          data={dataSource}
          query={query}
        />
      </div>
    </>
  );
};

export default OccupationPage;
