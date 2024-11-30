"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import TableOccupation from "./TableOccupation";
interface OccupationPageProps {
  dataSource: data[];
}
interface data {
  id: string;
  code: string;
  occupation: string;
}
const OccupationPage: React.FC<OccupationPageProps> = ({ dataSource }) => {
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
        <TableOccupation dataSource={dataSource} />
      </div>
    </>
  );
};

export default OccupationPage;
