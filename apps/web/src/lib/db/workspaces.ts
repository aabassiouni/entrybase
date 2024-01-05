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
