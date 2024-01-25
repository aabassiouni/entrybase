import { Workspace, createProWorkspace, findExistingSubscription } from "@/lib/db";
import { db } from "@/lib/db/db";
import { workspaces } from "@/lib/db/schema";
import { newId } from "@/lib/id";
import { stripe } from "@/lib/stripe";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React from "react";
import ChangeOrgButton from "./change-org-button";
import { redirect } from "next/navigation";
import UserButton from "@/components/user-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function SuccessPage({ searchParams }: { searchParams: { session_id: string } }) {
	const user = await currentUser();
	const sessionID = searchParams.session_id;

	if (!sessionID) {
		redirect("/dashboard");
	}

	if (!user || !user.id) {
		return null;
	}

	console.log("sessionID: ", sessionID);

	const session = await stripe.checkout.sessions.retrieve(sessionID);
	console.log("session metadata: ", session.metadata);
	console.log("creating org for ", session.metadata?.userID);

	const existingSub = await findExistingSubscription(session.subscription as string);

	if (existingSub) {
		return (
			<div className="flex min-h-screen w-full flex-col overflow-y-scroll">
				<div className="flex justify-between p-8 px-24 shadow-md">
					<Link href={"/dashboard"}>
						<h1 className="text-4xl font-bold">waitlister</h1>
					</Link>
					<UserButton />
				</div>
				<div className="p-4 flex-1 flex">
				<Card className="mx-auto w-full max-w-lg flex-1">
					<CardHeader>
						<CardTitle className="text-center text-3xl">You already have a subscription</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6"></CardContent>
					<CardFooter className="justify-center">
						<Link href={"/dashboard"}>
							<Button variant={"default"}>Go to Dashboard</Button>
						</Link>
					</CardFooter>
				</Card>
				</div>
			</div>
		);
	}

	const org = await clerkClient.organizations.createOrganization({
		name: session.metadata?.workspaceName!,
		createdBy: session.metadata?.userID!,
	});

	console.log("creating workspace for ", session.metadata?.userID);

	const wsID = newId("ws");

	const workspace: Workspace = {
		workspaceID: wsID,
		plan: "pro",
		stripeCustomerID: session.customer as string,
		stripeSubscriptionID: session.subscription as string,
		tenantID: org.id,
		createdAt: new Date(),
		deletedAt: null,
		workspaceName: session.metadata?.workspaceName!,
	};

	await createProWorkspace(workspace);

	return (
		<div className="flex min-h-screen w-full flex-col overflow-y-scroll ">
			<div className="flex justify-between p-8 px-24 shadow-md">
				<Link href={"/dashboard"}>
					<h1 className="text-4xl font-bold">waitlister</h1>
				</Link>
				<UserButton />
			</div>
			<Card className="mx-auto w-full my-4 max-w-lg flex-1">
				<div className="absolute left-1/2">{/* {render && <Confetti stageWidth={1000} />} */}</div>
				<CardHeader>
					<CardTitle className="text-center text-3xl">🎉 Workspace created! 🎉</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<p className="text-center text-xl font-medium">Your Pro Workspace has been set up successfully.</p>
					<p className="text-center">
						You now have access to custom invites, team members and higher invite limits.
					</p>

					<p className="text-center">Click the button below to go to your new workspace.</p>
					<ChangeOrgButton orgID={org.id} />
				</CardContent>
			</Card>
		</div>
	);
}

export default SuccessPage;
