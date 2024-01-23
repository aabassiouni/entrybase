import TeamMembers from "@/app/(authenticated)/(home-page)/dashboard/team/team-members";
import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { checkWorkspace } from "@/lib/auth";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

async function TeamPage() {
	const workspace = await checkWorkspace();

	if (!workspace) {
		return null;
	}

	if (workspace.plan === "free") {
		return (
			<>
				<PageHeading>
					<Link href="/dashboard">
						<ArrowLeftCircle className="mr-4" />
					</Link>
					Team
				</PageHeading>
				<Card className="flex-1">
					<CardHeader>
						<CardTitle>Team</CardTitle>
						<CardDescription>Invite your team members to help you manage your waitlist.</CardDescription>
					</CardHeader>
					<Separator className="" />
					<CardContent className="">
						<div className="flex h-96 items-center justify-center">
							<div className="flex h-1/2 w-1/2 flex-col items-center justify-center gap-2 rounded-md border border-primary bg-neutral-900 ">
								<p className="text-center text-lg font-medium">
									Team members are only available on the Pro plan. Create a new workspace to invite
									members to your team
								</p>
								<Link href="/dashboard/new">
									<Button>Create a new workspace</Button>
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>
			</>
		);
	}

	return (
		<>
			<PageHeading>
				<Link href="/dashboard">
					<ArrowLeftCircle className="mr-4" />
				</Link>
				Team
			</PageHeading>
			<Card className="flex-1">
				<CardHeader>
					<CardTitle>Team</CardTitle>
					<CardDescription>Invite your team members to help you manage your waitlist.</CardDescription>
				</CardHeader>
				<Separator className="" />
				<TeamMembers />
			</Card>
		</>
	);
}

export default TeamPage;
