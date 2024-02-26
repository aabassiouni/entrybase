"use client";
import React, { useLayoutEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

function TemplateSelect({ waitlistID }: { waitlistID: string }) {
	const [_isPending, startTransition] = useTransition();
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
					"cursor-pointer min-w-11  text-sm font-normal",
					template === "invite" ? "border border-primary bg-primary dark:text-black" : "",
				)}
				variant={"outline"}
				onClick={() => {
					startTransition(() => {
						router.push(`/dashboard/${waitlistID}/email-preview?template=invite`);
					});
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
					startTransition(() => {
						router.push(`/dashboard/${waitlistID}/email-preview?template=signup`);
					});
				}}
			>
				Signup Template
			</Badge>
		</div>
	);
}

export default TemplateSelect;
