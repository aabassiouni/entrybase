import { getWaitlistsForUser} from "@/lib/db";
import WaitlistDropdown from "./waitlist-dropdown";
import { checkWorkspace } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function WaitlistSelect() {
	const workspace = await checkWorkspace();

	if (!workspace) {
		return notFound();
	}

	const waitlists = await getWaitlistsForUser(workspace.workspaceID);
	if (waitlists.length === 0) {
		return redirect("/dashboard");
	}

	return <WaitlistDropdown waitlists={waitlists} />;
}
