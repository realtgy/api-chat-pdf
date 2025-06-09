import { File, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import UploadPDF from "@/components/UploadPDF";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { formatBytes } from "@/lib/utils";
import UpdatePDF from "@/components/UpdatePDF";
import DeletePDF from "@/components/DeletePDF";
export default async function Documents() {
  const { userId } = auth();
  const documents = await prismadb.document.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container mt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <UploadPDF />
        </div>

        {/* table */}
        <div className="bg-white rounded shadow w-full overflow-x-scroll">
          <table className="min-w-full">
            <tbody>
              {documents.length ? (
                documents.map((file, index) => (
                  <tr
                    key={index}
                    className={
                      index === documents.length - 1
                        ? ""
                        : "border-b border-gray-200"
                    }
                  >
                    <td className="p-4 text-left flex items-center">
                      <File
                        className="w-4 h-4 mr-4"
                        style={{ strokeWidth: "3" }}
                      />
                      <Link href={`/documents/${file.id}`}>
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px] text-sm font-medium">
                          {file.fileName}
                        </span>
                      </Link>
                    </td>
                    <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                      {formatBytes(file.fileSize)}
                    </td>

                    <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                      {formatDistanceToNow(file.createdAt, {
                        addSuffix: true,
                      })}
                    </td>

                    <td className="p-4 text-right w-4">
                      <UpdatePDF document={file} />
                    </td>

                    <td className="p-4 text-right w-4">
                      <DeletePDF document={file} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="flex items-center justify-center py-8 text-gray-500">
                      No documents found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
