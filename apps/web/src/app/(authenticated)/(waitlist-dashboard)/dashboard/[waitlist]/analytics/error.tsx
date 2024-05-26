"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

function AnalyticsPageError() {
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="dark:bg-red-800/70">
        <CardHeader />
        <CardContent className="flex flex-col items-center gap-4 text-gray-300">
          <ExclamationTriangleIcon className="h-14 w-14" />
          <p>There was an error fetching analytics</p>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}

export default AnalyticsPageError;
