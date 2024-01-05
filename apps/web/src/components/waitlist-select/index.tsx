import { getWaitlistsForUser} from "@/lib/db";
import WaitlistDropdown from "./waitlist-dropdown";
import { checkWorkspace, getTenantID } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function WaitlistSelect() {
	const workspace = await checkWorkspace();

	if (!workspace) {
		return notFound();
	}

	const waitlists = await getWaitlistsForUser(workspace.workspaceID);

	return <WaitlistDropdown waitlists={waitlists} />;
}
