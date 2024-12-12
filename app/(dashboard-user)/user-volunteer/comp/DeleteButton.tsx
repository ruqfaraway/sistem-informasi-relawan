"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DeleteUserVolunteer } from "../actions";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    setLoading(true);
    await DeleteUserVolunteer(id)
      .then((res) => {
        if (res.success === true) {
          toast({
            title: "Success",
            description: res.message,
          });
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: res.message,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Button
      disabled={loading}
      variant="destructive"
      onClick={() => {
        handleDelete(id);
      }}
    >
      {!loading && "Delete"}
      {loading && (
        <>
          <Loader2 className="animate-spin" />
          Please wait...
        </>
      )}
    </Button>
  );
};

export default DeleteButton;
