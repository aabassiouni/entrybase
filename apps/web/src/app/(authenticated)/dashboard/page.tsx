import React, { Suspense } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import { getWaitlistsForUser } from "@/lib/db";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import CreateWaitlistDialog from "@/components/create-waitlist-dialog";

function WaitlistCard({ waitlistID, waitlistName }: { waitlistID: string; waitlistName: string }) {
	return (
		<Link href={`/dashboard/${waitlistID}`}>
			<Card className="h-60 w-[330px]">
				<div className="relative h-40 w-full rounded-t-lg">
					<div className="absolute inset-0 z-10 h-full w-full rounded-t-lg bg-primary bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
				</div>
				<CardHeader className="">
					<CardTitle>{waitlistName}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
}

async function UserButton() {
	const user = await currentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
						<Avatar>
							<AvatarImage src={user?.imageUrl} />
						</Avatar>
					</Suspense>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2 w-56" align="center" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user?.username}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{user?.emailAddresses[0].emailAddress}
						</p>
					</div>
				</DropdownMenuLabel>
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

async function HomePage() {
	const user = await currentUser();
	if (!user) {
		return null;
	}

	const waitlists = await getWaitlistsForUser(user.id);
	return (
		<div className="w-screen">
			<div className="flex justify-between p-8 px-24 shadow-md">
				<h1 className="text-4xl font-bold">waitlister</h1>
				<UserButton />
			</div>
			<div className="mx-auto flex w-4/6  flex-col justify-center ">
				<p className="py-10 text-3xl font-semibold">Waitlists</p>
				<div className="grid grid-cols-3 gap-10">
					<CreateWaitlistDialog userID={user.id}>
						<Card className="flex h-60 w-[330px] flex-col items-center justify-center">
							<Plus className="h-10 w-10 text-primary" />
							<CardHeader className="">
								<CardTitle>Create a new waitlist</CardTitle>
							</CardHeader>
						</Card>
					</CreateWaitlistDialog>
					{waitlists.map((waitlist, i) => (
						<WaitlistCard key={i} waitlistID={waitlist.waitlistID} waitlistName={waitlist.waitlistName} />
					))}
				</div>
			</div>
		</div>
	);
}

export default HomePage;
