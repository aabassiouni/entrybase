import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { getWaitlistsForUser } from "@/lib/db";
import CreateWaitlistDialog from "@/components/create-waitlist-dialog";
import UserButton from "@/components/user-button";

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
						<Card className="cursor-pointer flex h-60 w-[330px] flex-col items-center justify-center">
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
