import Chart from "@/components/Chart";
import ActionsCard from "@/components/actions-card";
import { EmptyComponent, EmptyComponentDescription, EmptyComponentTitle } from "@/components/empty-component";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { checkWorkspace } from "@/lib/auth";
import { getCounts, getDayRangeChartLabelsAndValues, getSignupsEmailListforUser } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { RealtimeCount } from "../../../../../components/realtime-count";
import { RealtimeSwitch } from "../../../../../components/realtime-switch";

// export const dynamic = "force-dynamic";

function CountCardsLoading() {
	return (
		<>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Signups</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="h-12 w-24" />
				</CardContent>
			</Card>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Invites</CardTitle>
				</CardHeader>
				<CardContent>
					<Skeleton className="h-12 w-24" />
				</CardContent>
			</Card>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Waiting</CardTitle>
				</CardHeader>
				<CardContent>
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
					<div className="">
						<EmptyComponent className="">
							<EmptyComponentTitle>No signups yet</EmptyComponentTitle>
							<EmptyComponentDescription>Your latest signups will show up here</EmptyComponentDescription>
						</EmptyComponent>
					</div>
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
			<CardContent className="p-4">
				<Chart
					data={pastWeekSignupsData.entries}
					margin={{
						top: 5,
						right: 20,
						left: -20,
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
				<CardContent className="flex flex-wrap items-center justify-between gap-4">
					<p className="font-bold text-3xl">
						<RealtimeCount initialCount={Number(counts.total)} />
					</p>
					{Number.parseInt(counts.delta) > 0 ? (
						<Badge className="relative z-30 inline-flex items-center justify-center bg-green-500 text-black text-sm dark:bg-primary">
							<div className="-inset-0 -z-20 absolute rounded-lg bg-green-400 opacity-100 blur" />
							<p className="z-5">
								+<RealtimeCount initialCount={Number(counts.delta)} />
							</p>
						</Badge>
					) : null}
				</CardContent>
			</Card>
			<Card className="h-40 w-full">
				<CardHeader>
					<CardTitle>Invites</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="font-bold text-3xl">{counts.invited}</p>
				</CardContent>
			</Card>
			<Card className="h-40 w-full">
				<CardHeader>
					<CardTitle>Waiting</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="font-bold text-3xl">
						<RealtimeCount initialCount={Number(counts.waiting)} />
					</p>
				</CardContent>
			</Card>
		</>
	);
}

export default async function Home({ params }: { params: { waitlist: string } }) {
	const _workspace = await checkWorkspace(params.waitlist);

	return (
		<MainLayout>
			<PageHeading className="gap-4 justify-between">
				Dashboard
				<RealtimeSwitch />
			</PageHeading>
			<div className="flex flex-wrap sm:grid sm:grid-cols-5 gap-4">
				<Suspense fallback={<CountCardsLoading />}>
					<CountCards waitlistID={params.waitlist} />
				</Suspense>
				<ActionsCard waitlistID={params.waitlist} />
			</div>
			<div className="p-4" />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
