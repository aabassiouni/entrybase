import React from "react";
import Chart from "@/components/Chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { EntryResponse, SearchParams } from "@/types";
import { getDayChartLabelsAndValues, getDayRangeChartLabelsAndValues } from "@/lib/db";
import TimeframeSelect from "@/components/timeframe-select";

async function AnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
	let signups: EntryResponse;
	let timeframe = searchParams?.timeframe ?? "today";
	let from, to;

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
		signups = await getDayChartLabelsAndValues(formatDate(from));
	} else {
		signups = await getDayRangeChartLabelsAndValues(formatDate(from), formatDate(to));
	}

	return (
		<div className="min-h-screen grow overflow-y-scroll p-4">
			<div className="p-4">
				<div className="p-4">
					<TimeframeSelect dayString={signups.dayString} />
				</div>
				<Chart
					data={signups.entries}
					margin={{
						top: 30,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				/>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Signups</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{signups.entries.map((row: any) => (
							<TableRow key={row.name}>
								<TableCell>{row.label}</TableCell>
								<TableCell>{row.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default AnalyticsPage;
