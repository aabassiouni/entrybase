import { newId } from "@/lib/id";
import { db, checkAuth } from "./db";
import { invites } from "./schema";
import { eq, sql, desc, and } from "drizzle-orm";

export async function createInvite(waitlistID: string, emailIDs: string[], invitedEmails: string[]) {
	// await checkAuth(waitlistID, userID);

	await db.insert(invites).values({
		inviteID: newId("inv"),
		waitlistID,
		email_ids: emailIDs,
		invited_emails: invitedEmails,
	});
}

export async function getInvitesForWaitlist(waitlistID: string, userID: string) {
	await checkAuth(waitlistID, userID);
	const result = await db
		.select({
			inviteID: invites.inviteID,
			createdAt: invites.createdAt,
			invitedEmails: invites.invited_emails,
		})
		.from(invites)
		.where(eq(invites.waitlistID, waitlistID))
		.orderBy(desc(invites.createdAt));

	return result;
}

export async function fetchInviteForWaitlist(waitlistID: string, inviteID: string, userID: string) {
	await checkAuth(waitlistID, userID);

	const result = await db
		.select({
			inviteID: invites.inviteID,
			createdAt: invites.createdAt,
			invitedEmails: invites.invited_emails,
		})
		.from(invites)
		.where(and(eq(invites.waitlistID, waitlistID), eq(invites.inviteID, inviteID)))
		.limit(1)
		.then((res) => res[0]);

	return result;
}
