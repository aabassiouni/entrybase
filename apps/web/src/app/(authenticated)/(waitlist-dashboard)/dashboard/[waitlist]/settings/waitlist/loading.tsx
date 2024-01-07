import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function AccountSettingsPageLoading() {
	return (
		<Card className="h-full p-6">
			<Skeleton className="h-full"></Skeleton>
		</Card>
	);
}

export default AccountSettingsPageLoading;
