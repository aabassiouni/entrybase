import { PageHeading } from "@/components/typography";
import { UserProfile } from "@clerk/nextjs";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function AccountPage() {
  return (
    <>
      <PageHeading>
        <Link href="/dashboard">
          <ArrowLeftCircle className="mr-4" />
        </Link>
        Account
      </PageHeading>
      <div className="w-full">
        <div className="flex justify-center">
          <UserProfile />
        </div>
      </div>
    </>
  );
}

export default AccountPage;
