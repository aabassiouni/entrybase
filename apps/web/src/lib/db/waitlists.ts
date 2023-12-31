import { desc, eq, and, isNotNull, isNull } from "drizzle-orm";
import { waitlists } from "./schema";
import { newId } from "../id";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { selectRandomTwColor } from "../utils";
import { db, checkAuth } from "./db";

export async function findWaitlistForUser(userID: string, waitlistID: string) {
	return await db
		.select()
		.from(waitlists)
		.where(and(eq(waitlists.userID, userID), eq(waitlists.waitlistID, waitlistID), isNull(waitlists.deletedAt)));
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
		.where(and(eq(waitlists.userID, userID), isNull(waitlists.deletedAt)))
		.orderBy(desc(waitlists.createdAt));
}

export async function getWaitlistByID(waitlistID: string) {
	return await db.query.waitlists.findFirst({
		where: and(eq(waitlists.waitlistID, waitlistID), isNull(waitlists.deletedAt)),
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

export async function deleteWaitlistByID(waitlistID: string, userID: string) {
	await checkAuth(waitlistID, userID);

	return await db.update(waitlists).set({ deletedAt: new Date() }).where(eq(waitlists.waitlistID, waitlistID));
}

export async function insertWaitlistLogoURL(waitlistID: string, logoURL: string) {

	// revalidatePath(`/dashboard/${waitlistID}/settings/email`, "page");

	return await db
		.update(waitlists)
		.set({
			logoURL: logoURL,
		})
		.where(eq(waitlists.waitlistID, waitlistID));
}

export async function getWaitlistLogoURL(waitlistID: string) {
	return await db
		.select({
			logoURL: waitlists.logoURL,
		})
		.from(waitlists)
		.where(eq(waitlists.waitlistID, waitlistID))
		.then((result) => {
			return result[0].logoURL;
		});
}
