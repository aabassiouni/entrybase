import Chart from "@/components/Chart";
import DashboardSidebar from "../components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PersonIcon, HomeIcon, AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const emails = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default function Home() {
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
					<Card className="">
						<CardHeader>
							<CardTitle>Past Week</CardTitle>
						</CardHeader>
						<CardContent>
							{/* <p className="text-3xl font-bold">10</p> */}
							<Chart />
						</CardContent>
					</Card>
					<Card className="">
						<CardHeader>
							<CardTitle>User List</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-96">
								<div>
									{emails.map((email) => (
										<div key={email}>
											<div className="p-3">{email}</div>
											<Separator />
										</div>
									))}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
