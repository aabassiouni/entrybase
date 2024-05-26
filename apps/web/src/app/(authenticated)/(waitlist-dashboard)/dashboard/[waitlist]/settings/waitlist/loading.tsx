import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AccountSettingsPageLoading() {
  return (
    <Card className="h-full p-6">
      <Skeleton className="h-full" />
    </Card>
  );
}

export default AccountSettingsPageLoading;
