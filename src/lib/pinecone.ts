"use server";

import { auth } from "@clerk/nextjs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const embedPDFToPinecone = async (fileKey: string) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const pdfUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${fileKey}`;
  console.log("pdfUrl ==>", pdfUrl);
  let pdfFile = await fetch(pdfUrl);

  //   split text into small chunks
  const blob = new Blob([await pdfFile.arrayBuffer()]);
  const loader = new PDFLoader(blob);

  const docs = await loader.load();
  return docs;
};
