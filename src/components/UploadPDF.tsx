"use client";

import { useCallback, useState } from "react";
import { Upload, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
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

const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const pdfFile = acceptedFiles[0];
    console.log("pdfFile ==>", pdfFile);
    if (!pdfFile) {
      alert("Plz uplaod only PDF ile.");
      return;
    }
    if (pdfFile.size > 10 * 1024 * 1024) {
      // bigger 10 MB
      alert("Max file size: 10Mb");
      return;
    }
    setFile(pdfFile);
    setUrl("");
    setIsButtonEnabled(true);
    console.log("acceptedFiles ==>", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop,
  });

  const handlerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setFile(null);
    setIsButtonEnabled(e.target.value !== "");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="orange">
          <Upload className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} />
          Upload
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
        </DialogHeader>

        <form action="" className="space-y-6">
          {/* file drop zone */}
          <div
            {...getRootProps({
              className:
                "border-dashed border-2 rounded-md coursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
            })}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w10 h-10 text-[#ff612f]" />
            <p className="mt-2 text-sm text-slate-200">
              Drag and drop a PDF file here or click
            </p>
            <span className="mt-2 overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
              {file?.name}
            </span>
          </div>

          <div className="flex items-center">
            {/* drop upload */}
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 uppercase text-gray-600 text-xs">
              or
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
            <div></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Import from URL</Label>
            <Input
              id="url"
              name="url"
              onChange={handlerUrlChange}
              className="font-light"
              placeholder="https://cnd.openai.com/gp4.pdf"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" variant="orange" disabled={!isButtonEnabled}>
              Upload
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

export default UploadPDF;
