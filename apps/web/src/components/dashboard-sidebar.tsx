import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import UserButton from "./user-button";
import { Home, LineChart, List, SendHorizonal, Mail, Settings } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import WaitlistSelect from "./waitlist-select";

function WaitlistSelectLoading() {
	return (
		<>
			<div className="w-full p-4">
				<Skeleton className="h-10" />
			</div>
		</>
	);
}

function SidebarItem({ icon, children, href }: { icon: React.ReactNode; children: React.ReactNode; href: string }) {
	return (
		<Link href={href}>
			<Button variant="ghost" className="h-10 w-full justify-start gap-2 p-4 text-base ">
				<div className="rounded-md bg-primary p-1">{icon}</div>
				{children}
			</Button>
		</Link>
	);
}

export default function DashboardSidebar({ wtSegment }: { wtSegment: string }) {
	
	const iconProps = { className: "text-secondary", width: "1.125rem", height: "1.125rem" };

	const generalLinks = [
		{
			name: "Home",
			icon: <Home {...iconProps} />,
			href: `/dashboard/${wtSegment}`,
		},
		{
			name: "Signups",
			icon: <List {...iconProps} />,
			href: `/dashboard/${wtSegment}/signups`,
		},
		{
			name: "Analytics",
			icon: <LineChart {...iconProps} />,
			href: `/dashboard/${wtSegment}/analytics`,
		},
	];
	const inviteLinks = [
		{
			name: "Invite",
			icon: <SendHorizonal {...iconProps} />,
			href: `/dashboard/${wtSegment}/invite`,
		},
		{
			name: "Email Preview",
			icon: <Mail {...iconProps} />,
			href: `/dashboard/${wtSegment}/email-preview`,
		},
	];
	const settingsLinks = [
		{
			name: "Settings",
			icon: <Settings {...iconProps} />,
			href: `/dashboard/${wtSegment}/settings`,
		},
	];

	return (
		<div className="flex min-h-screen w-72 shrink-0 flex-col items-center justify-between rounded-r-2xl border-r border-neutral-800  bg-primary/50 dark:bg-black">
			<div>
				<div className="py-10">
					<Link href="/dashboard">
						<h1 className=" text-center text-4xl font-black">waitlister</h1>
					</Link>
				</div>
				<Separator />
				<Suspense fallback={<WaitlistSelectLoading />}>
					<WaitlistSelect />
				</Suspense>
				<div>
					<p className="p self-start px-3 text-sm text-neutral-400">General</p>
					<div className="h-full w-full grow space-y-2 px-4">
						{generalLinks.map((item, i) => (
							<SidebarItem key={i} icon={item.icon} href={item.href}>
								{item.name}
							</SidebarItem>
						))}
					</div>
				</div>
				<div>
					<p className="p self-start px-3 text-sm text-neutral-400">Invite</p>
					<div className="h-full w-full grow space-y-2 px-4">
						{inviteLinks.map((item, i) => (
							<SidebarItem key={i} icon={item.icon} href={item.href}>
								{item.name}
							</SidebarItem>
						))}
					</div>
				</div>
				<div>
					<p className="p self-start px-3 text-sm text-neutral-400">Settings</p>
					<div className="h-full w-full grow space-y-2 px-4">
						{settingsLinks.map((item, i) => (
							<SidebarItem key={i} icon={item.icon} href={item.href}>
								{item.name}
							</SidebarItem>
						))}
					</div>
				</div>
			</div>
			<div className="w-full">
				<Separator />
				<div className=" p-4">
					<UserButton />
				</div>
			</div>
		</div>
	);
}
