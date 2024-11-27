"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import TableEducation from "./TableEducation";
interface EducationPageProps {
  dataSource: data[];
}
interface data {
  id: string;
  code: string;
  education: string;
}
const EducationPage: React.FC<EducationPageProps> = ({ dataSource }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Button onClick={() => router.push("/education/add")}>
          Add Education
        </Button>
        <form>
          <Input placeholder="Search" />
        </form>
      </div>
      <div>
        <TableEducation dataSource={dataSource} />
      </div>
    </>
  );
};

export default EducationPage;
