"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

function TeamSelectLoading({ className }: { className?: string }) {
	return (
		<div className={cn("px-4 py-2", className)}>
			<Skeleton className="h-10" />
		</div>
	);
}

function TeamSelect({ className }: { className?: string }) {
	const {
		isLoaded: listIsLoaded,
		setActive,
		userMemberships,
	} = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});
	const { isLoaded: orgIsLoaded, organization } = useOrganization();
	const router = useRouter();

	if (!listIsLoaded || !orgIsLoaded) {
		return <TeamSelectLoading className={className} />;
	}

	async function changeOrg(orgId: string | null) {
		if (!setActive) {
			return;
		}
		try {
			await setActive({
				organization: orgId,
			});
		} finally {
			router.refresh();
		}
	}

	return (
		<div className={cn("px-4 py-2", className)}>
			<Select
				onValueChange={(value) => {
					console.log("changed");
					if (value === "personal") {
						changeOrg(null);
					} else {
						changeOrg(value);
					}
				}}
				defaultValue={organization?.id || "personal"}
			>
				<SelectTrigger className="">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="personal">
						<p>Personal</p>
					</SelectItem>
					{userMemberships.data?.map((membership) => {
						return (
							<SelectItem key={membership.organization.id} value={membership.organization.id}>
								<p>{membership.organization.name}</p>
							</SelectItem>
						);
					})}
					<Link href={"/dashboard/new"}>
						<button className="relative flex w-full items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-neutral-800 focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
							<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
								<PlusCircledIcon className="h-4 w-4" />
							</span>
							Create Waitlist
						</button>
					</Link>
				</SelectContent>
			</Select>
		</div>
	);
}

export default TeamSelect;
