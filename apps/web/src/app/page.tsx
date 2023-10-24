import Chart from "@/components/Chart";
import DashboardSidebar from "../components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PersonIcon, HomeIcon, AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { getDayRangeChartLabelsAndValues, getEmailsList, getSignupsCountForDayRange } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const data = [
	{ name: "Day 1", signups: 400 },
	{ name: "Day 2", signups: 300 },
	{ name: "Day 3", signups: 200 },
	{ name: "Day 4", signups: 278 },
	{ name: "Day 5", signups: 189 },
];
const emails = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

function UserListCard({ emailsList }: { emailsList: { email: string }[] }) {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>User List</CardTitle>
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
function PastWeekChart({ data }: { data: any }) {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Past Week</CardTitle>
			</CardHeader>
			<CardContent>
				{/* <p className="text-3xl font-bold">10</p> */}
				<Chart
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				/>
			</CardContent>
		</Card>
	);
}
export default async function Home() {
	
	const emails = await getEmailsList();
	const today = new Date();
	const fiveDaysAgo = formatDate(new Date(today.getDate() - 5));
	const pastWeekSignupsCount = await getDayRangeChartLabelsAndValues(fiveDaysAgo, formatDate(today));
	console.log(pastWeekSignupsCount);

	return (
		<main className="flex  min-h-screen w-full">
			{/* <DashboardSidebar /> */}
			<div className="flex w-full flex-col p-10 ">
				<h1 className="p-3 text-3xl font-bold">Dashboard</h1>
				<Separator />
				<div className="p-4"></div>
				<div className="grid grid-cols-4 gap-4">
					<Card className="h-40 w-full ">
						<CardHeader>
							<CardTitle>Signups</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">32</p>
						</CardContent>
					</Card>
					<Card className="h-40 w-full ">
						<CardHeader>
							<CardTitle>Invites</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-bold">15</p>
						</CardContent>
					</Card>
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
					<PastWeekChart data={pastWeekSignupsCount} />
					<UserListCard emailsList={emails} />
				</div>
			</div>
		</main>
	);
}
