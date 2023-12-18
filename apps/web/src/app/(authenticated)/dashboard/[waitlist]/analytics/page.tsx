import React from "react";
import Chart from "@/components/Chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { EntryResponse, SearchParams } from "@/types";
import { getDayChartLabelsAndValues, getDayRangeChartLabelsAndValues } from "@/lib/db";
import TimeframeSelect from "@/components/timeframe-select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";

async function AnalyticsPage({ params, searchParams }: { params: { waitlist: string }; searchParams: SearchParams }) {

	const user = await currentUser();
	if (!user) return null;

	let signups: EntryResponse;
	let timeframe = searchParams?.timeframe ?? "today";
	let from, to;

	//this is just here to make the url look nice
	switch (timeframe) {
		case "today":
			from = new Date();
			to = new Date();
			break;
		case "yesterday":
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			from = yesterday;
			to = yesterday;
			break;
		case "pastWeek":
			const lastWeek = new Date();
			lastWeek.setDate(lastWeek.getDate() - 7);
			from = lastWeek;
			to = new Date();
			break;
		case "pastMonth":
			const lastMonth = new Date();
			lastMonth.setDate(lastMonth.getDate() - 30);
			from = lastMonth;
			to = new Date();
			break;
	}

	if (from === undefined || to === undefined) {
		throw new Error("Invalid timeframe");
	}

	if (timeframe === "today" || timeframe === "yesterday") {
		signups = await getDayChartLabelsAndValues(params.waitlist, user.id, formatDate(from));
	} else {
		signups = await getDayRangeChartLabelsAndValues(params.waitlist, user.id, formatDate(from), formatDate(to));
	}

	return (
		<MainLayout>
			<PageHeading>Analytics</PageHeading>
			<TimeframeSelect waitlistID={params.waitlist} dayString={signups.dayString} />
			<div className="p-2"></div>
			<Card>
				<CardHeader>
					<CardTitle>{signups.dayString}</CardTitle>
				</CardHeader>
				<CardContent>
					<Chart
						data={signups.entries}
						margin={{
							right: 30,
						}}
					/>
				</CardContent>
				<CardFooter />
			</Card>
			<div className="py-4">
				<div className="rounded-md border border-gray-800">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Signups</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{signups.entries.map((row: any, i: number) => (
								<TableRow className="even:bg-zinc-950/50" key={i}>
									<TableCell className="w-fit border-r border-slate-700">{row.label}</TableCell>
									<TableCell className="w-fit">{row.value}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</MainLayout>
	);
}

export default AnalyticsPage;
