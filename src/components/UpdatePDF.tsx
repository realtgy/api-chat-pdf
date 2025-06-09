"use client";

import React, { useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Document } from "@prisma/client";
import { updateDocument } from "@/actions/db";

interface UpdatePDFProps {
  document: Document;
}

const UpdatePDF = ({ document }: UpdatePDFProps) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>("");

  const handleDocumentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
    setIsButtonEnabled(e.target.value !== "");
  };

  const handleOpenDialog = () => {
    setOpen(!open);
    setDocumentName(document.fileName);
  };

  const updateDocumentWithId = updateDocument.bind(null, document.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateDocumentWithId(formData);
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
        <Pencil
          className="w-4 h-4 cursor-pointer"
          style={{ strokeWidth: "3" }}
        />
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Update a document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Name</Label>
            <Input
              id="documentName"
              name="documentName"
              value={documentName}
              onChange={handleDocumentName}
              className="font-light"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="submit"
              variant="orange"
              disabled={!isButtonEnabled || isLoading}
            >
              {isLoading ? (
                <Loader2
                  className="h-5 w-5 text-white/80 animate-spin"
                  style={{ strokeWidth: "3" }}
                />
              ) : (
                "Update"
              )}
            </Button>
            <DialogClose asChild>
              <Button variant="light">Close</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePDF;
