import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

export function PageHeading({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<>
			<h1 className={cn("inline-flex items-center text-3xl font-bold tracking-tight lg:text-4xl", className)}>
				{children}
			</h1>
			<Separator className="my-4" />
		</>
	);
}
