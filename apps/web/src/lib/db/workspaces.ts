import { db } from "./db";

import { eq, and, isNull } from "drizzle-orm";
import { workspaces } from "./schema";
import { newId } from "../id";

export async function getWorkspaceForTenant(tenantID: string) {
	const workspace = await db.query.workspaces.findFirst({
		where: (table) => and(eq(table.tenantID, tenantID), isNull(table.deletedAt)),
	});
	return workspace;
}

export async function createWorkspaceForTenant(tenantID: string) {
	const workspace = await db.insert(workspaces).values({
		workspaceID: newId("ws"),
		workspaceName: "Personal",
		tenantID: tenantID,
		createdAt: new Date(),
	});

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
