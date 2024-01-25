import { auth } from "@clerk/nextjs";
import { getWorkspaceForTenant } from "./db";
import { db } from "./db/db";
import { redirect } from "next/navigation";

export function getTenantID() {
	const { userId, orgId } = auth();

	return orgId ?? userId ?? null;
}

export async function checkWorkspace(waitlistID?: string) {
	const tenantID = getTenantID();

	if (!tenantID) {
		return null;
	}
    
	const workspace = await getWorkspaceForTenant(tenantID);

	if (!workspace) {
		return null;
	}

	if (waitlistID) {
		const res = await db.query.waitlists.findFirst({
			where: (table, { and, eq }) =>
				and(eq(table.workspaceID, workspace.workspaceID), eq(table.waitlistID, waitlistID)),
			columns: {
				waitlistID: true,	
			},
		});
		if (!res) {
			redirect("/dashboard");
		}
	}

	return workspace;
}
