import { auth } from "@clerk/nextjs";
import { getWorkspaceForTenant } from "./db";

export function getTenantID() {
	const { userId, orgId } = auth();

	return orgId ?? userId ?? null;
}

export async function checkWorkspace() {
	const tenantID = getTenantID();

	if (!tenantID) {
		return null;
	}
    
	const workspace = await getWorkspaceForTenant(tenantID);

	if (!workspace) {
		return null;
	}

	return workspace;
}
