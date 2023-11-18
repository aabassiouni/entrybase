import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function EmailPreviewPageLoading() {
	return (
		<div className="flex w-full px-4">
			<div className="w-1/2 p-8">
				<h1 className="text-3xl font-bold">Customize Email</h1>
				<Separator className="my-4" />
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
			<div className="w-1/2 py-8">
				<Skeleton className="h-full" />
			</div>
		</div>
	);
}

export default EmailPreviewPageLoading;
