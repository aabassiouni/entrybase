import Chart from "@/components/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getCounts, getDayRangeChartLabelsAndValues, getSignupsEmailListforUser } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ActionsCard from "@/components/actions-card";
import clsx from "clsx";
import InviteAction from "@/components/invite-action";
import { currentUser } from "@clerk/nextjs";

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
							<div>
								<div key={i} className="p-3">
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
	const user = await currentUser();
	if (!user) return;

	const emailsList = await getSignupsEmailListforUser(waitlistID, user.id);

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Latest Signups</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-96">
					<div>
						{emailsList.map((email) => (
							<div key={email.email}>
								<div className="p-3">{email.email}</div>
								<Separator />
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

async function PastWeekChart({ waitlistID }: { waitlistID: string }) {
	const user = await currentUser();
	if (!user) return;

	const today = new Date();
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(today.getDate() - 7);

	const pastWeekSignupsData = await getDayRangeChartLabelsAndValues(
		waitlistID,
		user.id,
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

	const counts = await getCounts(waitlistID, user?.id);

	return (
		<>
			<Card className="h-40 w-full">
				<CardHeader>
					<CardTitle>Signups</CardTitle>
				</CardHeader>
				<CardContent className="flex items-center justify-between gap-4">
					<p className="text-3xl font-bold">{counts.total}</p>
					<Badge className=" relative z-30 inline-flex items-center justify-center bg-green-500 text-sm text-black dark:bg-primary">
						<div className="absolute -inset-0 -z-20 rounded-lg bg-green-400 opacity-100 blur"></div>
						<p className="z-5">{"+" + counts.delta}</p>
					</Badge>
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

function ActionsCardContent({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={clsx("w-[250px] flex-none snap-center  sm:w-[390px] ", className)}>{children}</div>;
}

function ActionsCardStats() {
	return (
		<div className="flex h-full w-full items-center justify-between">
			<div className="">
				<h1 className="text-center text-xl font-bold">Past Week</h1>
				<p className="text-center text-xl font-bold">647</p>
			</div>
			<div className="">
				<h1 className="text-center text-xl font-bold">Past Month</h1>
				<p className="text-center text-xl font-bold">872</p>
			</div>
			<div className="">
				<h1 className="text-center text-xl font-bold">Open Rate</h1>
				<p className="text-center text-xl font-bold">33%</p>
			</div>
		</div>
	);
}

export default async function Home({ params }: { params: { waitlist: string } }) {
	return (
		<main className="flex  min-h-screen w-full">
			<div className="flex w-full flex-col p-10 ">
				<div className="flex justify-between">
					<h1 className="p-3 text-3xl font-bold">Dashboard</h1>
				</div>
				<Separator />
				<div className="p-4"></div>
				<div className="grid grid-cols-5 gap-4">
					<Suspense fallback={<CountCardsLoading />}>
						<CountCards waitlistID={params.waitlist}/>
					</Suspense>
					<ActionsCard>
						<ActionsCardContent>
							<ActionsCardStats />
						</ActionsCardContent>
						<ActionsCardContent>
							<InviteAction />
						</ActionsCardContent>
					</ActionsCard>
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
			</div>
		</main>
	);
}
