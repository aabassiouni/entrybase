import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function InvitePageLoading() {
  return (
    <MainLayout>
      <PageHeading>Invite</PageHeading>
      <div className="flex h-full w-full items-center justify-center">
        <Skeleton className="h-full w-full max-w-lg" />
      </div>
    </MainLayout>
  );
}

export default InvitePageLoading;
