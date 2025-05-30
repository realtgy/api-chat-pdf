import React from "react";
import DashboardBar from "@/components/DashboardBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardBar />
      {children}
    </>
  );
}
