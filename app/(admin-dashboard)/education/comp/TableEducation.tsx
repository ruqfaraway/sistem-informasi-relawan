import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/MainTable/MainTable";
interface EducationPageProps {
  dataSource: data[];
}
interface data {
  id: string;
  code: string;
  education: string;
}

const TableEducation: React.FC<EducationPageProps> = ({ dataSource }) => {
  return <DataTable columns={columns} data={dataSource} />;
};

export default TableEducation;
