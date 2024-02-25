import Link from "next/link";
import { Separator } from "./ui/separator";
import TeamSelect from "./team-select";
import { CreditCard, User, Users } from "lucide-react";
import SidebarUserButton from "./sidebar-user-button";
import { SidebarItem } from "./sidebar-item";

function HomeSidebar() {
	const iconProps = { className: "text-secondary", width: "1.125rem", height: "1.125rem" };


	const settingsLinks = [
		{
			name: "Account",
			icon: <User {...iconProps} />,
			href: "/dashboard/account",
		},
		{
			name: "Billing",
			icon: <CreditCard {...iconProps} />,
			href: "/dashboard/billing",
		},
		{
			name: "Team",
			icon: <Users {...iconProps} />,
			href: "/dashboard/team",
		},
	];

	return (
		<div className="hidden sm:flex min-h-screen w-72 shrink-0 flex-col items-center justify-between rounded-r-2xl border-r border-neutral-800  bg-primary/50 dark:bg-black">
			<div className="w-full">
				<div className="py-10">
					<Link href="/dashboard">
						<h1 className=" text-center text-4xl font-black">waitlister</h1>
					</Link>
				</div>
				<Separator className="mb-2" />
				<div>
					<p className="p self-start px-3 text-sm text-neutral-400">Workspace</p>
					<TeamSelect />
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
					<SidebarUserButton />
				</div>
			</div>
		</div>
	);
}

export default HomeSidebar;
