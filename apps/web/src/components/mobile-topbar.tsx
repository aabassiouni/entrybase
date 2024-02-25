import React, { Suspense } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Archive, Home, LineChart, List, Mail, Menu, SendHorizonal, Settings } from "lucide-react";
import TeamSelect from "./team-select";
import Link from "next/link";
import { Button } from "./ui/button";
import WaitlistSelect from "./waitlist-select";
import { Skeleton } from "./ui/skeleton";
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
function WaitlistSelectLoading() {
	return (
		<>
			<div className="w-full p-4">
				<Skeleton className="h-10" />
			</div>
		</>
	);
}
function MobileTopbar({ wtSegment }: { wtSegment: string }) {
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
			name: "Sent Invites",
			icon: <Archive {...iconProps} />,
			href: `/dashboard/${wtSegment}/sent-invites`,
		},
		{
			name: "Email Preview",
			icon: <Mail {...iconProps} />,
			href: `/dashboard/${wtSegment}/email-preview`,
		},
	];
	const settingsLinks = [
		{
			name: "Waitlist Settings",
			icon: <Settings {...iconProps} />,
			href: `/dashboard/${wtSegment}/settings`,
		},
	];
	return (
		<div className="bg-black gap-2 items-center py-6 rounded-b-2xl border-b border-neutral-800 sm:hidden flex  px-4">
			<Sheet>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent className=" border-b border-neutral-800 rounded-t-3xl" side="bottom">
					<Suspense fallback={<WaitlistSelectLoading />}>
						<WaitlistSelect />
					</Suspense>
					<p className="p self-start px-3 text-sm font-medium text-neutral-400">General</p>
					{generalLinks.map((item, i) => (
						<SidebarItem key={i} icon={item.icon} href={item.href}>
							<span className="">{item.name}</span>
						</SidebarItem>
					))}
					<p className="p self-start px-3 text-sm font-medium text-neutral-400">Invite</p>
					{inviteLinks.map((item, i) => (
						<SidebarItem key={i} icon={item.icon} href={item.href}>
							{item.name}
						</SidebarItem>
					))}
					<p className="p self-start px-3 text-sm font-medium text-neutral-400">Settings</p>
					{settingsLinks.map((item, i) => (
						<SidebarItem key={i} icon={item.icon} href={item.href}>
							{item.name}
						</SidebarItem>
					))}
				</SheetContent>
			</Sheet>
			<div className="flex justify-between w-full">
				<h1 className="text-4xl font-black text-center">w</h1>
				<TeamSelect className="p-0" />
			</div>
		</div>
	);
}

export default MobileTopbar;
