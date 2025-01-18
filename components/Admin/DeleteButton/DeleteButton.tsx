"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const DeleteButton = ({
  id,
  handleDelete,
  loading,
}: {
  id: string;
  handleDelete: (id: string) => void;
  loading: boolean;
}) => {
  return (
    <Button
      disabled={loading}
      variant="destructive"
      onClick={() => handleDelete(id)}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};

export default DeleteButton;
