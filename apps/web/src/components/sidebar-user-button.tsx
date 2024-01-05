import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { checkWorkspace } from "@/lib/auth";

async function SidebarUserButton() {
	const user = await currentUser();

	const workspace = await checkWorkspace();
	if (!workspace) {
		return null;
	}
	console.log("workspace in user button", workspace);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="w-full ">
					<Button
						variant={"ghost"}
						className="inline-flex h-max w-full items-center justify-between gap-2 text-base"
					>
						<div className="inline-flex items-center gap-2 ">
							<Avatar className="h-8 w-8">
								<AvatarImage src={user?.imageUrl} />
							</Avatar>
							<p>Ali Bassiouni</p>
						</div>
						{workspace.plan === "free" ? (
							<div className="h-fit w-fit rounded-md bg-neutral-700 text-white px-2 text-sm">Free</div>
						) : (
							<div className="h-fit w-fit rounded-md bg-primary px-2 text-sm text-neutral-900">Pro</div>
						)}
						{/* <div className="h-fit w-fit rounded-md bg-primary px-2 text-sm text-neutral-900">Free</div> */}
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 w-56" align="center" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex justify-between">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{user?.username}</p>
							<p className="text-muted-foreground text-xs leading-none">
								{user?.emailAddresses[0].emailAddress}
							</p>
						</div>
						<ThemeToggle />
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={"/dashboard/account"}>
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							Account
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<SignOutButton>
						<DropdownMenuItem>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</SignOutButton>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default SidebarUserButton;
