"use server";

import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Document } from "@prisma/client";
import { needToUpgrade } from "@/lib/subscription";

export const createDocument = async (
  fileName: string,
  fileSize: number,
  fileKey: string
) => {
  const user = await currentUser();
  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized!");
  }

  const reachedFreeQuota = await needToUpgrade();
  if (reachedFreeQuota) {
    throw new Error("Reached free quota. Please upgrade!");
  }

  const document = prismadb.document.create({
    data: {
      userId: user.id,
      userName: user.firstName,
      fileName,
      fileSize,
      fileKey,
    },
  });

  //   刷新缓存
  revalidatePath("/documents");

  return {
    document,
  };
};

export const getDocument = async (documentId: string) => {
  const user = await currentUser();
  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized!");
  }

  const document = await prismadb.document.findUnique({
    where: {
      id: documentId,
      userId: user.id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return {
    document,
  };
};

export const updateDocument = async (
  documentId: string,
  formData: FormData
) => {
  if (!documentId) {
    throw new Error("documentId not provided!");
  }

  const user = await currentUser();
  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized!");
  }
  const fileName = formData.get("documentName") as string;
  if (!fileName) {
    throw new Error("fileName is not provided!");
  }
  const updatedDocument = await prismadb.document.update({
    where: {
      userId: user.id,
      id: documentId,
    },
    data: {
      fileName,
    },
  });

  revalidatePath("/documents");

  return {
    updatedDocument,
  };
};

export const deleteDocument = async (documentId: string) => {
  if (!documentId) {
    throw new Error("documentId not provided!");
  }

  const user = await currentUser();
  if (!user || !user.id || !user.firstName) {
    throw new Error("Unauthorized!");
  }

  const document = prismadb.document.delete({
    where: { userId: user.id, id: documentId },
  });

  revalidatePath("/documents");

  return document;
};
