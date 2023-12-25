import { newId } from "@/lib/id";
import { db, checkAuth } from "./db";
import { invites } from "./schema";
export async function createInvite(waitlistID: string, emailID: string[]) {
    // await checkAuth(waitlistID, userID);

    await db.insert(invites).values({
        inviteID: newId("inv"),
        waitlistID,
        email_id: emailID,
    });
}

