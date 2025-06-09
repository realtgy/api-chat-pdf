"use client";
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
interface PDFViewerProps {
  pdfUrl: string;
}
export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const testPdfUrl =
    "https://donalaipdf.s3.ap-southeast-2.amazonaws.com/users/user_2xat22XmY83HYaMacLr5JF3d1EO/1748935941819-%E5%86%85%E7%BD%91%E6%B8%97%E9%80%8F%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.pdf";
  return (
    <div className="w-1/2 h-[calc(100vh-60px)]">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
}
