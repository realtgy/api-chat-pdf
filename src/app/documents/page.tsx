import { Button } from "@/components/ui/button";
import { Pencil, File, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import UploadPDF from "@/components/UploadPDF";
export default function Documents() {
  const documents = [
    {
      fileName: "User_Manual.pdf",
      fileSize: "1 MB",
      createAt: "yesterday",
    },
    {
      fileName: "Learn Python.pdf",
      fileSize: "7 MB",
      createAt: "2 days ago",
    },
    {
      fileName: "Google Financial Report.pdf",
      fileSize: "1 MB",
      createAt: "today",
    },
  ];
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
              {documents.map((file, index) => (
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
                    <Link href="#">
                      <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px] text-sm font-medium">
                        {file.fileName}
                      </span>
                    </Link>
                  </td>
                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                    {file.fileSize}
                  </td>

                  <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                    {file.createAt}
                  </td>

                  <td className="p-4 text-right w-4">
                    <Pencil
                      className="w-4 h-4 cursor-pointer"
                      style={{ strokeWidth: "3" }}
                    />
                  </td>

                  <td className="p-4 text-right w-4">
                    <Trash2
                      className="w-4 h-4 cursor-pointer"
                      style={{ strokeWidth: "3" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
