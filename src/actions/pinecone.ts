"use server";

import { auth } from "@clerk/nextjs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { needToUpgrade } from "@/lib/subscription";

export const embedPDFToPinecone = async (fileKey: string) => {
  // Authorize users to protect your action
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const reachedFreeQuota = await needToUpgrade();
  if (reachedFreeQuota) {
    throw new Error("Reached free quota. Please upgrade!");
  }

  let pdfFile = await fetch(
    `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${fileKey}`
  );

  // Step #1 - Split text into small chunks
  const blob = new Blob([await pdfFile.arrayBuffer()]);
  const loader = new PDFLoader(blob);

  const docs = await loader.load();

  // Step #1B - Trim useless metadata for each document
  const trimedDocs = docs.map((doc) => {
    const metadata = { ...doc.metadata };
    delete metadata.pdf;
    return new Document({
      pageContent: doc.pageContent,
      metadata: metadata,
    });
  });

  // Step #2 - Split document into smaller chunks
  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 500,
    chunkOverlap: 10,
  });

  const splitDocs = await splitter.splitDocuments(trimedDocs);

  // Step #3 = Initialize Pinecone
  const pinecone = new Pinecone();

  // Step #4 - Connect to the Pinecone Index
  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  // Step #5 - Embedings documents
  await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
    pineconeIndex: index,
    namespace: fileKey,
  });
};

/**
 *
 */
export const deletePineconeNamespace = async (fileKey: string) => {
  if (!fileKey) {
    throw new Error("could not find the file!");
  }

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized!");
  }

  const pinecone = new Pinecone();
  const index = pinecone.Index(process.env.PINECONE_INDEX as string);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      pineconeIndex: index,
      namespace: fileKey,
    }
  );

  await vectorStore.delete({
    deleteAll: true,
  });
};
