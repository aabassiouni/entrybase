"use client";

import React, { useEffect, useState } from "react";
import Chart from "@/components/Chart";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Entry } from "@/types";

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

function AnalyticsPageLoading() {
	return (
		<div className=" min-h-screen grow overflow-y-scroll p-4 ">
			<div className="p-4">
				<div className="p-4">
					<Skeleton className="h-8 w-32" />
				</div>
				<Skeleton className="h-[350px] w-full" />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...Array(5)].map((_, i) => (
							<TableRow className="" key={i}>
								<TableCell>
									<Skeleton className="h-8 w-32" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-8 w-32" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
function AnalyticsPage() {

	const [signups, setSignups] = useState<{entries: Entry[], dayString: string }>({entries: [], dayString: ""});
	const [timeframe, setTimeframe] = useState("today");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);

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

			if (!from || !to) {
				return;
			}

			const params = new URLSearchParams({
				from: formatDate(from),
				to: formatDate(to),
			}).toString();
			console.log(params);

			const data = await fetch(`/api/stats?${params}`, {}).then((res) => res.json());
			console.log(data);
			setSignups(data);
			setIsLoading(false);
		}

		fetchData();
	}, [timeframe]);

	if (isLoading) {
		return <AnalyticsPageLoading />;
	}

	const selectLabel = (timeframe: string) => {
		switch (timeframe) {
			case "today":
				return "Today";
			case "yesterday":
				return "Yesterday";
			case "pastWeek":
				return "Past Week";
			case "pastMonth":
				return "Past Month";
			default:
				return "Select a timeframe";
		}
	}

	return (
		<div className=" min-h-screen grow overflow-y-scroll p-4 ">
			<div className="p-4">
				<div className="p-4">
					<Select defaultValue={timeframe} onValueChange={setTimeframe}>
						<SelectTrigger className="w-fit">
							<SelectValue placeholder="Select a timeframe ">{selectLabel(timeframe) + ` (${signups.dayString})`}</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="today">Today</SelectItem>
							<SelectItem value="yesterday">Yesterday</SelectItem>
							<SelectItem value="pastWeek">Past Week</SelectItem>
							<SelectItem value="pastMonth">Past month</SelectItem>
						</SelectContent>
					</Select>
					<p>{}</p>
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
						{isLoading ? (
							<></>
						) : (
							signups.entries.map((row: any) => (
								<TableRow className="" key={row.name}>
									<TableCell>{row.label}</TableCell>
									<TableCell>{row.value}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default AnalyticsPage;
