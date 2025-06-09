import React from "react";
import { BookOpenCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import PricingModal from "./PricingModal";
import { isValidSubscription } from "@/lib/subscription";
import Billing from "./Billing";
export default async function DashboardBar() {
  const isSubsribed = await isValidSubscription();
  return (
    <header className="sticky left-0 top-0 z-50 bg-[#f8f5ee] w-full backdrop-blur border-slate-500/19">
      <div className="mx-auto h-[60px] max-w-7xl px-8 md:px-6">
        <div className="flex items-center justify-between h-full">
          {/* left Icon */}
          <div className="flex items-center">
            <BookOpenCheck className="text-black w-7 h-7 mr-3" />
            <span className="text-lg font-medium text-black">PDF.wisdom</span>
          </div>

          {/* right parts */}
          <div className="flex items-center">
            {isSubsribed ? <Billing /> : <PricingModal />}

            <Link href="/documents">
              <Button variant="link">Documents</Button>
            </Link>

            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}
