"use client";
import React, { useState } from "react";
import { DeleteOccupation } from "../actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DeleteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id: string) => {
    setLoading(true);
    await DeleteOccupation(id).then((res) => {
      if (res.success === true) {
        toast({
          title: "Success",
          description: res.message,
        });
      }
    });
    setLoading(false);
  };
  return (
    <Button
      disabled={loading}
      variant="destructive"
      onClick={() => handleDelete(id)}
    >
      Delete
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
