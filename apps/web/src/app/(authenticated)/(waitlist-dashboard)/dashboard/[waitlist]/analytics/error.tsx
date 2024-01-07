"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


function AnalyticsPageError() {
	return (
		<div className="flex w-full items-center justify-center">
			<Card className="dark:bg-red-800/70">
				<CardHeader></CardHeader>
				<CardContent className="flex text-gray-300 flex-col items-center gap-4">
					<ExclamationTriangleIcon className="h-14 w-14" />
					<p>There was an error fetching analytics</p>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	);
}

export default AnalyticsPageError;
