"use client";

import React from "react";
import { useParams, useRouter, useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function NavItem({
	selectedLayoutSegment,
	label,
	segment,
	href,
}: {
	selectedLayoutSegment: string | null;
	label: string;
	href: string;
	segment: string;
}) {
	return (
		<div
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300  dark:data-[state=active]:text-neutral-50",
				selectedLayoutSegment === segment &&
					"bg-white text-neutral-950 shadow-sm dark:bg-neutral-950 dark:text-neutral-50",
			)}
		>
			<Link href={href}>{label}</Link>
		</div>
	);
}
function TabNav() {
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const params = useParams();

	const settingsNavItems = [
		{
			label: "Waitlist",
			segment: "waitlist",
			href: `/dashboard/${params.waitlist}/settings/waitlist`,
		},
		{
			label: "Email",
			segment: "email",
			href: `/dashboard/${params.waitlist}/settings/email`,
		},
		// {
		// 	label: "Account",
		// 	segment: "account",
		// 	href: `/dashboard/${params.waitlist}/settings/account`,
		// },
		// {
		// 	label: "Billing",
		// 	segment: "billing",
		// 	href: `/dashboard/${params.waitlist}/settings/billing`,
		// },
	];
	return (
		<div className="inline-flex h-10 w-fit items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
			{settingsNavItems.map((item, i) => (
				<NavItem key={i} {...item} selectedLayoutSegment={selectedLayoutSegment} />
			))}
		</div>
	);
}

export default TabNav;
