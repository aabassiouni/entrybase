"use client";
import React, { useLayoutEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function TemplateSelect({ waitlistID }: { waitlistID: string }) {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const template = searchParams.get("template") ?? "invite";

	useLayoutEffect(() => {
		router.prefetch(`/dashboard/${waitlistID}/email-preview?template=signup`);
	}, [waitlistID, searchParams]);
	return (
		<div className="mx-auto flex gap-5 ">
			<Badge
				className={cn(
					"cursor-pointer text-sm font-normal",
					template === "invite" ? "border border-primary bg-primary dark:text-black" : "",
				)}
				variant={"outline"}
				onClick={() => {
					router.push(`/dashboard/${waitlistID}/email-preview?template=invite`);
				}}
			>
				Invite Template
			</Badge>
			<Badge
				className={cn(
					"cursor-pointer text-sm font-normal",
					template === "signup" ? "border border-primary bg-primary dark:text-black" : "",
				)}
				variant={"outline"}
				onClick={() => {
					setIsLoading(true);
					router.push(`/dashboard/${waitlistID}/email-preview?template=signup`);
					setIsLoading(false);
				}}
			>
				{isLoading ? <Loader2 className="animate-spin" /> : "Signup Template"}
			</Badge>
		</div>
	);
}

export default TemplateSelect;
