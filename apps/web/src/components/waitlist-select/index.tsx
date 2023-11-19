import { currentUser } from "@clerk/nextjs";
import { getWaitlistsForUser } from "@/lib/db";
import WaitlistDropdown from "./waitlist-dropdown";

export default async function WaitlistSelect() {

	const user = await currentUser();
	if (!user) {
		return null;
	}
	const waitlists = await getWaitlistsForUser(user.id);

	return <WaitlistDropdown waitlists={waitlists} userID={user.id} />;
}
