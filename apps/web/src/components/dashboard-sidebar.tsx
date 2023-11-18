import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import UserButton from "./user-button";
import WaitlistSelect from "./waitlist-select";
import { Home, LineChart, List, SendHorizonal } from "lucide-react";

function SidebarItem({ icon, children, href }: { icon: React.ReactNode; children: React.ReactNode; href: string }) {
	return (
		<Link href={href}>
			<Button variant="ghost" className="h-10 w-full justify-start gap-2 p-4 text-base ">
				<div className="rounded-md bg-secondary p-1">{icon}</div>
				{children}
			</Button>
		</Link>
	);
}

export default function DashboardSidebar({ wtSegment }: { wtSegment: string }) {
	return (
		<div className="flex min-h-screen w-72 shrink-0 flex-col items-center rounded-r-2xl border-r border-neutral-800  bg-primary/50 dark:bg-black">
			<div className="py-10">
				<h1 className=" text-4xl font-black">waitlister</h1>
			</div>
			<Separator />
			<WaitlistSelect />
			<p className="p self-start px-3 text-sm text-neutral-400">General</p>
			<div className="h-full w-full grow space-y-2 px-4">
				<SidebarItem
					href={`/dashboard/${wtSegment}`}
					icon={<Home className="text-neutral-200" width={"1.125rem"} height={"1.125rem"} />}
				>
					Home
				</SidebarItem>
				<SidebarItem
					href={`/dashboard/${wtSegment}/users`}
					icon={<List className="text-neutral-200" width={"1.125rem"} height={"1.125rem"} />}
				>
					Signups
				</SidebarItem>
				<SidebarItem
					href={`/dashboard/${wtSegment}/email-preview`}
					icon={<SendHorizonal className="text-neutral-200" width={"1.125rem"} height={"1.125rem"} />}
				>
					Email Preview
				</SidebarItem>
				<SidebarItem
					href={`/dashboard/${wtSegment}/analytics`}
					icon={<LineChart className="text-neutral-200" width={"1.125rem"} height={"1.125rem"} />}
				>
					Analytics
				</SidebarItem>
			</div>
			<Separator />
			<div className="w-full p-4">
				<UserButton />
			</div>
		</div>
	);
}
