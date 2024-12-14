import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface AdminDashboardPages {
  total_volunteers: number;
}

const AdminDashboardPage = ({
  dataSource,
}: {
  dataSource: AdminDashboardPages;
}) => {
  const data = {
    totalVolunteers: dataSource.total_volunteers,
    totalAssignment: 0,
  };
  return (
    <div className="p-3 border rounded-md min-h-[70vh]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-right font font-semibold text-4xl">
              {data.totalVolunteers}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-right font font-semibold text-4xl">
              {data.totalAssignment}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
