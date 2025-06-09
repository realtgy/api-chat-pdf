"use client";

import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Document } from "@prisma/client";
import { deleteDocument } from "@/actions/db";
import { showToast } from "@/lib/utils";
import { useTransition } from "react";
import { deleteS3PDF } from "@/actions/s3";
interface UpdatePDFProps {
  document: Document;
}

const DeletePDF = ({ document }: UpdatePDFProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // how to use this ?
  let [isPending, startTransition] = useTransition();
  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      console.log("fuck you!");
      deleteS3PDF(document.fileKey);
      await deleteDocument(document.id);
      setOpen(false);
    } catch (error) {
      // handle error as needed
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Trash2
          className="w-4 h-4 cursor-pointer"
          style={{ strokeWidth: "3" }}
        />
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete document</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col mb-2">
          <span className="text-sm mb-4">
            Do you want to delete the following document?
          </span>
          <span className="tex-sm font-semibold border-black border-l-2 px-2 whitespace-nowrap w-20">
            {document.fileName}
          </span>
        </div>

        <DialogFooter>
          <Button variant="light" onClick={() => setOpen(!open)}>
            Cancel
          </Button>
          <Button
            variant="orange"
            onClick={() => handleDelete()}
            disabled={isButtonEnabled || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-white/80 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePDF;
