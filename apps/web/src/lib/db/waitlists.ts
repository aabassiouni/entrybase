import { desc, eq, and } from "drizzle-orm";
import { waitlists } from "./schema";
import { newId } from "../id";
import { unstable_noStore as noStore } from "next/cache";
import { selectRandomTwColor } from "../utils";
import { db, checkAuth } from "./db";

export async function findWaitlistForUser(userID: string, waitlistID: string) {
	return await db
		.select()
		.from(waitlists)
		.where(and(eq(waitlists.userID, userID), eq(waitlists.waitlistID, waitlistID)));
}

export async function createWaitlist(waitlist: string, userID: string) {
	const color = selectRandomTwColor();
	return await db
		.insert(waitlists)
		.values({ waitlistName: waitlist, userID: userID, waitlistID: newId("wt"), colorString: color })
		.returning({ waitlistID: waitlists.waitlistID });
}

export async function getWaitlistsForUser(userID: string) {
	return await db
		.select({
			waitlistID: waitlists.waitlistID,
			waitlistName: waitlists.waitlistName,
			colorString: waitlists.colorString,
		})
		.from(waitlists)
		.where(eq(waitlists.userID, userID))
		.orderBy(desc(waitlists.createdAt));
}

export async function getWaitlistByID(waitlistID: string) {
	return await db.query.waitlists.findFirst({
		where: eq(waitlists.waitlistID, waitlistID),
	});
}

export async function updateWaitlistByID(waitlistID: string, waitlistName: string) {
	noStore();
	return await db
		.update(waitlists)
		.set({
			waitlistName: waitlistName,
		})
		.where(eq(waitlists.waitlistID, waitlistID));
}

export async function updateWaitlistEmailSettings(waitlistID: string, userID: string, emailSettings: any) {
	await checkAuth(waitlistID, userID);

	return await db
		.update(waitlists)
		.set({
			emailSettings: emailSettings,
		})
		.where(eq(waitlists.waitlistID, waitlistID));
}

export async function getWaitlistEmailSettings(waitlistID: string, userID: string) {
	await checkAuth(waitlistID, userID);

	return await db
		.select({
			emailSettings: waitlists.emailSettings,
		})
		.from(waitlists)
		.where(eq(waitlists.waitlistID, waitlistID));
}
