import Chart from "@/components/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	getCounts,
	getDayRangeChartLabelsAndValues,
	getSignupsEmailListforUser,
	getWaitlistByID,
	getWaitlistWithWorkspace,
} from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ActionsCard from "@/components/actions-card";
import { currentUser } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { checkWorkspace, getTenantID } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db/db";
import { EmptyComponent, EmptyComponentDescription, EmptyComponentTitle } from "@/components/empty-component";

// export const revalidate = 20;

function CountCardsLoading() {
	return (
		<>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Signups</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <p className="text-3xl font-bold">{counts.total}</p> */}
					<Skeleton className="h-12 w-24" />
				</CardContent>
			</Card>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Invites</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <p className="text-3xl font-bold">{counts.invited}</p> */}
					<Skeleton className="h-12 w-24" />
				</CardContent>
			</Card>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Waiting</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <p className="text-3xl font-bold">{counts.waiting}</p> */}
					<Skeleton className="h-12 w-24" />
				</CardContent>
			</Card>
		</>
	);
}

function LatestSignupsCardLoading() {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Latest Signups</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-96">
					<div>
						{[...Array(6)].map((_, i) => (
							<div key={i}>
								<div className="p-3">
									<Skeleton className="h-8 w-1/2" />
								</div>
								<Separator />
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

function PastWeekChartLoading() {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Past Week</CardTitle>
			</CardHeader>
			<CardContent className="">
				<Skeleton className="h-96 w-full" />
			</CardContent>
		</Card>
	);
}

async function LatestSignupsCard({ waitlistID }: { waitlistID: string }) {
	const emailsList = await getSignupsEmailListforUser(waitlistID);

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle>Latest Signups</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				{emailsList.length > 0 ? (
					<ScrollArea className="h-96">
						{emailsList.map((email, i) => (
							<div key={i}>
								<div className="p-3">{email.email}</div>
								<Separator />
							</div>
						))}
					</ScrollArea>
				) : (
					<EmptyComponent className="">
						<EmptyComponentTitle>No signups yet</EmptyComponentTitle>
						<EmptyComponentDescription>Your latest signups will show up here</EmptyComponentDescription>
					</EmptyComponent>
				)}
			</CardContent>
		</Card>
	);
}

async function PastWeekChart({ waitlistID }: { waitlistID: string }) {
	const today = new Date();
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(today.getDate() - 6);

	const pastWeekSignupsData = await getDayRangeChartLabelsAndValues(
		waitlistID,
		formatDate(sevenDaysAgo),
		formatDate(today),
	);

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Past Week</CardTitle>
			</CardHeader>
			<CardContent className="">
				<Chart
					data={pastWeekSignupsData.entries}
					margin={{
						top: 5,
						right: 20,
						left: -5,
						bottom: 0,
					}}
				/>
			</CardContent>
		</Card>
	);
}

async function CountCards({ waitlistID }: { waitlistID: string }) {
	const user = await currentUser();
	if (!user) return;

	const counts = await getCounts(waitlistID);

	return (
		<>
			<Card className="h-40 w-full">
				<CardHeader>
					<CardTitle>Signups</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center justify-between gap-4">
					<p className="text-3xl font-bold">{counts.total}</p>
					{counts.delta > 0 ? (
						<Badge className=" relative z-30 inline-flex items-center justify-center bg-green-500 text-sm text-black dark:bg-primary">
							<div className="absolute -inset-0 -z-20 rounded-lg bg-green-400 opacity-100 blur"></div>
							<p className="z-5">{"+" + counts.delta}</p>
						</Badge>
					) : null}
				</CardContent>
			</Card>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Invites</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{counts.invited}</p>
				</CardContent>
			</Card>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Waiting</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{counts.waiting}</p>
				</CardContent>
			</Card>
		</>
	);
}

export default async function Home({ params }: { params: { waitlist: string } }) {
	const workspace = await checkWorkspace(params.waitlist);

	return (
		<MainLayout>
			<PageHeading>Dashboard</PageHeading>
			<div className="grid grid-cols-5 gap-4">
				<Suspense fallback={<CountCardsLoading />}>
					<CountCards waitlistID={params.waitlist} />
				</Suspense>
				<ActionsCard waitlistID={params.waitlist} />
			</div>
			<div className="p-4"></div>
			<div className="grid grid-cols-2 gap-4">
				<Suspense fallback={<PastWeekChartLoading />}>
					<PastWeekChart waitlistID={params.waitlist} />
				</Suspense>
				<Suspense fallback={<LatestSignupsCardLoading />}>
					<LatestSignupsCard waitlistID={params.waitlist} />
				</Suspense>
			</div>
		</MainLayout>
	);
}
