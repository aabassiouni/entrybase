import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { checkWorkspace } from "@/lib/auth";
import { getSignupsEmailListforUser } from "@/lib/db";
import { notFound } from "next/navigation";

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
	const workspace = await checkWorkspace();
	if (!workspace) {
		return notFound();
	}

	const emailsList = await getSignupsEmailListforUser(waitlistID);

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Latest Signups</CardTitle>
			</CardHeader>
			<CardContent>
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
					<div className="flex h-96 items-center justify-center">
						<div className="flex h-1/2 w-1/2 flex-col items-center justify-center gap-2 rounded-md border border-primary bg-neutral-900 ">
							<p className="text-lg font-medium">No signups yet</p>
							<p className="text-sm text-neutral-500">Your latest signups will show up here</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
function DashboardLoadingPage() {
	return (
		<MainLayout>
			<PageHeading>Dashboard</PageHeading>
			<div className="grid grid-cols-5 gap-4">
				<CountCardsLoading />
			</div>
			<div className="p-4"></div>
			<div className="grid grid-cols-2 gap-4">
				<PastWeekChartLoading />
				<LatestSignupsCardLoading />
			</div>
		</MainLayout>
	);
}

export default DashboardLoadingPage;
