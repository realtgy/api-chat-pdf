import { Button } from "@/components/ui/button";
import { Pencil, File, Trash2, Upload } from "lucide-react";
import Link from "next/link";
export default function Documents() {
  return (
    <section className="bg-[#faf9f6] min-h-screen">
      <div className="section-container">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">Documents</h1>
          <Button variant="orange">
            <Upload className="w-4 h-4 mr-2" style={{ strokeWidth: "3" }} />
            Upload
          </Button>
        </div>

        {/* table */}
        <div className="bg-white rounded shadow w-full overflow-x-scroll">
          <table className="min-w-full">
            <tbody>
              <tr>
                <td className="p-4 text-left flex items-center">
                  <File className="w-4 h-4 mr-4" style={{ strokeWidth: "3" }} />
                  <Link href="#">
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[300px] text-sm font-medium">
                      Tonnny_Rbins.pdf
                    </span>
                  </Link>
                </td>
                <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                  1MB
                </td>

                <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap w-20">
                  3 days ago
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
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
