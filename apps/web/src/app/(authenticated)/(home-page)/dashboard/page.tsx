import React, { Suspense } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getWaitlistsForUser } from "@/lib/db";
import CreateWaitlistDialog from "@/components/create-waitlist-dialog";
import UserButton from "@/components/user-button";
import { checkWorkspace, getTenantID } from "@/lib/auth";
import { notFound } from "next/navigation";
import TeamSelect from "@/components/team-select";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardSidebar from "@/components/dashboard-sidebar";
import HomeSidebar from "@/components/home-sidebar";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";

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
	const workspace = await checkWorkspace();

	if (!workspace) {
		notFound();
	}

	const waitlists = await getWaitlistsForUser(workspace?.workspaceID);

	return (
		<>
			{/* <MainLayout> */}
				<PageHeading>Waitlists</PageHeading>
				<div className="grid grid-cols-3 gap-10">
					<Suspense
						fallback={
							<>
								{[...Array(3)].map((_, i) => (
									<Skeleton
										key={i}
										className="h-60 w-[330px]  flex-col items-center justify-center"
									/>
								))}
							</>
						}
					>
						<CreateWaitlistDialog>
							<Card className="flex h-60 w-[330px] cursor-pointer flex-col items-center justify-center">
								<Plus className="h-10 w-10 text-primary" />
								<CardHeader className="">
									<CardTitle>Create a new waitlist</CardTitle>
								</CardHeader>
							</Card>
						</CreateWaitlistDialog>
						{waitlists.map((waitlist, i) => (
							<WaitlistCard
								key={i}
								waitlistID={waitlist.waitlistID}
								waitlistName={waitlist.waitlistName}
							/>
						))}
					</Suspense>
				</div>
			{/* </MainLayout> */}
		</>
	);
}

export default HomePage;