import { CreditCard, ScrollText, User, Users } from "lucide-react";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import SidebarUserButton from "./sidebar-user-button";
import TeamSelect from "./team-select";
import TextLogo from "./text-logo";
import { Separator } from "./ui/separator";

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
		<div className="hidden min-h-screen w-72 shrink-0 flex-col items-center justify-between rounded-r-2xl border-neutral-800 border-r bg-primary/50 sm:flex dark:bg-black">
			<div className="w-full">
				<div className="py-10">
					<Link href="/dashboard">
						<TextLogo />
					</Link>
				</div>
				<Separator className="mb-2" />
				<div>
					<p className="p self-start px-3 text-neutral-400 text-sm">Workspace</p>
					<TeamSelect />
				</div>
				<div>
					<div className="px-4">
						<SidebarItem icon={<ScrollText {...iconProps} />} href="/dashboard">
							Waitlists
						</SidebarItem>
					</div>
					<p className="p self-start px-3 text-neutral-400 text-sm">Settings</p>
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
				<div className="p-4">
					<SidebarUserButton />
				</div>
			</div>
		</div>
	);
}

export default HomeSidebar;
