import { createWorkspaceForTenant, getWorkspaceForTenant } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function SetupPage() {
	const user = await currentUser();

	if (!user || !user.id) {
		return null;
	}

	const workspace = await getWorkspaceForTenant(user.id);
	console.log(workspace);

	if (!workspace) {
		const workspace = await createWorkspaceForTenant(user.id);
		console.log(workspace);
		return redirect("/dashboard");
	}

	return redirect("/dashboard");
}

export default SetupPage;
