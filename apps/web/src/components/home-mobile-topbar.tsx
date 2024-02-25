import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarItem } from "./sidebar-item";
import { CreditCard, Menu, User, Users } from "lucide-react";
import { Separator } from "./ui/separator";
import SidebarUserButton from "./sidebar-user-button";
import TeamSelect from "./team-select";

function HomeMobileTopbar() {
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
		<div className="bg-black gap-2 items-center py-6 rounded-b-2xl border-b border-neutral-800 sm:!hidden flex px-4">
			<Sheet>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent className=" border-b border-neutral-800 rounded-t-3xl" side="bottom">
					<p className="p self-start px-3 text-sm font-medium text-neutral-400">General</p>
					{settingsLinks.map((item, i) => (
						<SidebarItem key={i} icon={item.icon} href={item.href}>
							{item.name}
						</SidebarItem>
					))}
					<div className="w-full">
						<Separator className="my-4" />
						<SidebarUserButton />
					</div>
				</SheetContent>
			</Sheet>
			<div className="flex justify-between w-full">
				<h1 className="text-4xl font-black text-center">w</h1>
				<TeamSelect className="p-0 w-1/2" />
			</div>
		</div>
	);
}

export default HomeMobileTopbar;
