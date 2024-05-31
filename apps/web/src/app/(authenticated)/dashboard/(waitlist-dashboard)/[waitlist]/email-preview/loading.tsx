import { PageHeading } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function EmailPreviewPageLoading() {
  return (
    <div className="flex w-full">
      <div className="w-1/2 p-10">
        <PageHeading>Email Preview</PageHeading>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-1/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-1/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-40 w-full" />
            </div>
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>
      <div className="w-1/2 py-8 pr-10">
        <Skeleton className="h-full" />
      </div>
    </div>
  );
}

export default EmailPreviewPageLoading;
