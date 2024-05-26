import { PageHeading } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function TeamSettingsLoading() {
  return (
    <>
      <PageHeading>
        <Link href="/dashboard">
          <ArrowLeftCircle className="mr-4" />
        </Link>
        Team
      </PageHeading>
      <Skeleton className="flex-1" />
    </>
  );
}

export default TeamSettingsLoading;
