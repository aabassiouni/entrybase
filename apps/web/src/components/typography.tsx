import { Separator } from "@/components/ui/separator";
import React from "react";

export function PageHeading({ children }: { children: React.ReactNode }) {
	return (
		<>
			<h1 className="text-3xl font-bold tracking-tight lg:text-4xl inline-flex items-baseline">{children}</h1>
			<Separator className="my-4" />
		</>
	);
}
