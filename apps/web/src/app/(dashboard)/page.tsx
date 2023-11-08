import Chart from "@/components/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getCounts, getDayRangeChartLabelsAndValues, getEmailsList } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 20;

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

async function LatestSignupsCard() {
	const emailsList = await getEmailsList();

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

async function PastWeekChart() {
	const today = new Date();
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(today.getDate() - 7);

	const pastWeekSignupsData = await getDayRangeChartLabelsAndValues(formatDate(sevenDaysAgo), formatDate(today));

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

async function CountCards() {
	const counts = await getCounts();

	return (
		<>
			<Card className="h-40 w-full ">
				<CardHeader>
					<CardTitle>Signups</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{counts.total}</p>
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

export default async function Home() {
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
						<CountCards />
					</Suspense>
					<Card className="col-span-2 h-40 w-full ">
						<CardHeader>
							<CardTitle>Signups</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">10</p>
						</CardContent>
					</Card>
				</div>
				<div className="p-4"></div>
				<div className="grid grid-cols-2 gap-4">
					<Suspense fallback={<PastWeekChartLoading />}>
						<PastWeekChart />
					</Suspense>
					<Suspense fallback={<LatestSignupsCardLoading />}>
						<LatestSignupsCard />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
