import PDFViewer from "@/components/PDFViewer";
import Chat from "@/components/Chat";
import { getDocument } from "@/actions/db";
import { redirect } from "next/navigation";
import { ExtendedDocument } from "@/types";

interface Props {
  params: {
    id: string;
  };
}

// 注意这个params是next.js传入的
export default async function ChatPage({ params: { id } }: Props) {
  const { document } = await getDocument(id);
  console.log("document ==>", document);
  if (!document) {
    return redirect("/documents");
  }

  const s3Url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${document.fileKey}`;

  return (
    <div className="flex ">
      <PDFViewer pdfUrl={s3Url} />
      <Chat document={document as ExtendedDocument} />
    </div>
  );
}
