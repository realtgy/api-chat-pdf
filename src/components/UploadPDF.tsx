"use client";

import { useCallback, useState } from "react";
import { Loader2, Upload, UploadCloud, X } from "lucide-react";
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
import { generatePreSignedURL } from "@/actions/s3";
import { getPDFFileNameFromURL, showToast } from "@/lib/utils";
import { embedPDFToPinecone } from "@/actions/pinecone";
import { createDocument } from "@/actions/db";
import { useRouter } from "next/navigation";

const UploadPDF = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const pdfFile = acceptedFiles[0];
    if (!pdfFile) {
      showToast("Plz upload only PDF file.");
      return;
    }
    if (pdfFile.size > 10 * 1024 * 1024) {
      // bigger 10 MB
      showToast("Max file size: 10Mb.");
      return;
    }
    setFile(pdfFile);
    setUrl("");
    setIsButtonEnabled(true);
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

  const handleRemoveFile = () => {
    setFile(null);
    setIsButtonEnabled(false);
  };

  const resetForm = () => {
    setFile(null);
    setUrl("");
    setIsButtonEnabled(false);
  };

  const handleOpenDialog = () => {
    setOpen(!open);
    resetForm();
  };

  const uploadPDFToS3 = async (file: File | Blob, putUrl: string) => {
    const uploadResponse = await fetch(putUrl, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (file) {
        await processPDF(file, file.name, file.size, file.type);
      } else if (url) {
        const response = await fetch(url);
        const fileName = getPDFFileNameFromURL(url);
        const fileType = response.headers.get("Content-Type");
        const fileSize = Number(response.headers.get("Content-Length") ?? 0);
        // 有点脱裤子放屁
        if (!fileName || fileType !== "application/pdf") {
          throw new Error("Incorrect file format");
        }
        const { putUrl, fileKey } = await generatePreSignedURL(
          fileName,
          fileType
        );
        const fileBlob = await response.blob();
        await processPDF(fileBlob, fileName, fileSize, fileType);
      }
    } catch (e) {
      // showToast()
    } finally {
      // reset the form
      resetForm();
      setIsLoading(false);
    }
  };

  const processPDF = async (
    file: File | Blob,
    fileName: string,
    fileSize: number,
    fileType: string
  ) => {
    // 上传到s3
    const { putUrl, fileKey } = await generatePreSignedURL(fileName, fileType);
    await uploadPDFToS3(file, putUrl);

    // 插入到向量数据库中
    // await embedPDFToPinecone(fileKey);

    // 插入数据库
    const { document } = await createDocument(fileName, fileSize, fileKey);
    if (document) {
      router.push(`/documents/${(await document).id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
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

        <form action="" className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl">
            {/* file drop zone */}
            <div className="border-dashed border-2 rounded-md bg-gray-50 h-36 w-full">
              {file ? (
                <div className="h-full flex justify-center items-center text-black/70 ">
                  <span className="mt-2 overflow-hidden whitespace-nowrap text-ellipsis text-sm max-w-[200px]">
                    {file?.name}
                  </span>
                  <button
                    className="ml-1 cursor-pointer"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="h-full flex flex-col justify-center items-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="w10 h-10 text-[#ff612f]" />
                  <p className="mt-2 text-sm text-slate-200">
                    Drag and drop a PDF file here or click
                  </p>
                </div>
              )}
            </div>
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
                "Upload"
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

export default UploadPDF;
