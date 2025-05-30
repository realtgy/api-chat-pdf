import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Navbar() {
  return (
    <header className="sticky left-0 top-0 z-50 bg-[#f8f5ee] w-full backdrop-blur border-slate-500/19">
      <div className="max-auto h-[60px] max-w-7xl px-8 md:px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <BookOpenCheck className="text-black w-7 h-7 mr-3" />
            <span className="text-lg font-medium text-black">PDF.wisdom</span>
          </div>

          <Button variant="link">
            Get started
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
