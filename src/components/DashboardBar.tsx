"use client";
import React from "react";
import { BookOpenCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
export default function DashboardBar() {
  return (
    <header className="sticky left-0 top-0 z-50 bg-[#f8f5ee] w-full backdrop-blur border-slate-500/19">
      <div className="max-auto h-[60px] max-w-7xl px-8 md:px-6">
        <div className="flex items-center justify-between  border-red-600 h-full">
          {/* left Icon */}
          <div className="flex">
            <BookOpenCheck className="text-black w-7 h-7 mr-3" />
            <span className="text-lg font-medium text-black">PDF.wisdom</span>
          </div>

          {/* right user button ？？*/}
          <div
            style={{
              border: "1px solid red",
            }}
          >
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}
