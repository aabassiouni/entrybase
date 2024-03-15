import { db } from "./db";

import { type Workspace, workspaces } from "@entrybase/db";
import { newId } from "@entrybase/id";
import { and, eq, isNull } from "drizzle-orm";

export async function getWorkspaceForTenant(tenantID: string) {
	const workspace = await db.query.workspaces.findFirst({
		where: (table) => and(eq(table.tenantID, tenantID), isNull(table.deletedAt)),
	});
	return workspace;
}

export async function createPersonalWorkspaceForTenant({ tenantID }: { tenantID: string }) {
	const workspace = await db.insert(workspaces).values({
		workspaceID: newId("ws"),
		workspaceName: "Personal",
		tenantID: tenantID,
		createdAt: new Date(),
	});

	return workspace;
}

export async function updateRemainingInvitesForWorkspace({
	workspaceID,
	remainingInvites,
}: { workspaceID: string; remainingInvites: number }) {
	const workspace = await db.update(workspaces).set({ remainingInvites }).where(eq(workspaces.workspaceID, workspaceID));

	return workspace;
}

export async function updateStripeDetailsForWorkspace(
	workspaceID: string,
	stripeCustomerID: string,
	stripeSubscriptionID: string,
) {
	return await db
		.update(workspaces)
		.set({
			plan: "pro",
			stripeCustomerID: stripeCustomerID,
			stripeSubscriptionID: stripeSubscriptionID as string,
		})
		.where(eq(workspaces.workspaceID, workspaceID));
}

export async function updateWorkspacePlan(workspaceID: string, plan: string) {
	switch (plan) {
		case "free":
			await db
				.update(workspaces)
				.set({
					plan: "free",
				})
				.where(eq(workspaces.workspaceID, workspaceID));
			break;
		case "pro":
			await db
				.update(workspaces)
				.set({
					plan: "pro",
				})
				.where(eq(workspaces.workspaceID, workspaceID));
			break;
	}

	return;
}

export async function createProWorkspace(workspace: Workspace) {
	const workspaceRes = await db.insert(workspaces).values(workspace);

	return workspaceRes;
}

export async function findExistingSubscription(subscriptionID: string) {
	const existingSub = await db
		.select({
			subID: workspaces.stripeSubscriptionID,
		})
		.from(workspaces)
		.where(eq(workspaces.stripeSubscriptionID, subscriptionID as string))
		.then((res) => res[0]);

	return existingSub;
}
