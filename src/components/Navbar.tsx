"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
export default function Navbar() {
  const { isSignedIn } = useAuth();
  return (
    <header className="sticky left-0 top-0 z-50 bg-[#f8f5ee] w-full backdrop-blur border-slate-500/19">
      <div className="max-auto h-[60px]  px-8 md:px-6">
        <div className="flex items-center justify-between h-full w-full">
          <Link href="/">
            <div className="flex items-center">
              <BookOpenCheck className="text-black w-7 h-7 mr-3" />
              <span className="text-lg font-medium text-black">PDF.wisdom</span>
            </div>
          </Link>

          <div className="flex items-center ">
            <Link href={isSignedIn ? "/documents" : "/sign-up"}>
              <Button variant="default">
                Get started
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
