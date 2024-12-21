"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const ProfilePage = ({
  dataSource,
}: {
  dataSource: {
    name: string;
    builder: string;
    birth_date: string;
    address: string;
    phone: string;
    email?: string;
  };
}) => {
  const router = useRouter();
  return (
    <Card className="p-4 min-h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-4 justify-between h-full">
        <div className="w-full h-full flex flex-col gap-4">
          <h1 className="text-xl font-bold uppercase">Profile</h1>
          <p className="text-md font-light text-gray-500">
            This is your current info
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="text-md font-light text-gray-500">
                {dataSource?.name ?? "no name"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-md font-light text-gray-500">
                {dataSource?.email ?? "no email"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <p className="text-md font-light text-gray-500">
                {dataSource?.phone ?? "no phone"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <p className="text-md font-light text-gray-500">
                {dataSource?.address ?? "no address"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pembina
              </label>
              <p className="text-md font-light text-gray-500">
                {dataSource?.builder ?? "no pembina"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Berdiri
              </label>
              <p className="text-md font-light text-gray-500">
                {dataSource?.birth_date ?? "no birth date"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4 justify-end">
          <Button
            className=""
            variant="outline"
            onClick={() => router.push("/profile/change-password")}
          >
            Change Password
          </Button>
          <Button
            className=""
            variant="default"
            onClick={() => router.push("/profile/change-profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProfilePage;
