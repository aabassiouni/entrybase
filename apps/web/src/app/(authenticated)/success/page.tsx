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
			<div>
				<p>You already have a subscription!</p>
				<p>Subscription ID: {existingSub.subID}</p>
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
		<div>
			<p>Workspace created!</p>
			<p>Workspace ID: {wsID}</p>
			<ChangeOrgButton orgID={org.id} />
		</div>
	);
}

export default SuccessPage;
