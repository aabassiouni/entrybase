import { newId } from "@/lib/id";
import { db,  } from "./db";
import { signups, invites } from "./schema";
import { eq, desc, and, inArray } from "drizzle-orm";

export async function createInvite(
	waitlistID: string,
	emailIDs: string[],
	invitedEmails: { email: string; id: string }[],
) {

	//mark signups as invited
	await db
		.update(signups)
		.set({
			status: "invited",
		})
		.where(inArray(signups.signupID, invitedEmails.map((email) => email.id)));

	return await db.insert(invites).values({
		inviteID: newId("inv"),
		waitlistID,
		email_ids: emailIDs,
		invited_emails: invitedEmails.map((email) => email.email),
	});
}

export async function getInvitesForWaitlist(waitlistID: string) {
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

export async function fetchInviteForWaitlist(waitlistID: string, inviteID: string) {

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
