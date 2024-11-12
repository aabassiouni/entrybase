import { waitlists } from "@entrybase/db";
import { and, desc, eq, isNotNull, isNull } from "@entrybase/db";
import { newId } from "@entrybase/id";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { utapi } from "../uploadthing/server";
import { selectRandomTwColor } from "../utils";
import { db } from "./db";

export async function findWaitlistForUser(waitlistID: string, workspaceID: string) {
  return await db
    .select()
    .from(waitlists)
    .where(
      and(eq(waitlists.workspaceID, workspaceID), eq(waitlists.waitlistID, waitlistID), isNull(waitlists.deletedAt)),
    );
}

export async function createWaitlist(waitlist: string, workspaceID: string) {
  const color = selectRandomTwColor();
  return await db
    .insert(waitlists)
    .values({ waitlistName: waitlist, workspaceID: workspaceID, waitlistID: newId("wt"), colorString: color })
    .returning({ waitlistID: waitlists.waitlistID });
}

export async function getWaitlistsForUser(workspaceID: string) {
  return await db
    .select({
      waitlistID: waitlists.waitlistID,
      waitlistName: waitlists.waitlistName,
      colorString: waitlists.colorString,
    })
    .from(waitlists)
    .where(and(eq(waitlists.workspaceID, workspaceID), isNull(waitlists.deletedAt)))
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

export async function updateWaitlistEmailSettings(waitlistID: string, _workspaceID: string, emailSettings: any) {
  // await checkAuth(waitlistID, userID);

  return await db
    .update(waitlists)
    .set({
      emailSettings: emailSettings,
    })
    .where(eq(waitlists.waitlistID, waitlistID));
}

export async function getWaitlistEmailSettings(waitlistID: string) {
  return await db
    .select({
      emailSettings: waitlists.emailSettings,
    })
    .from(waitlists)
    .where(eq(waitlists.waitlistID, waitlistID));
}

export async function deleteWaitlistByID(waitlistID: string) {
  return await db.update(waitlists).set({ deletedAt: new Date() }).where(eq(waitlists.waitlistID, waitlistID));
}

export async function insertWaitlistLogoURL(waitlistID: string, logoURL: string, logoKey: string) {
  // revalidatePath(`/dashboard/${waitlistID}/settings/email`, "page");

  const oldLogoKey = await db
    .select({ logoFileKey: waitlists.logoFileKey })
    .from(waitlists)
    .where(eq(waitlists.waitlistID, waitlistID))
    .then((result) => {
      return result[0].logoFileKey;
    });

  const [newLogoURL, deleteFileRes] = await Promise.all([
    db
      .update(waitlists)
      .set({
        logoFileURL: logoURL,
        logoFileKey: logoKey,
      })
      .where(eq(waitlists.waitlistID, waitlistID)),
    oldLogoKey ? utapi.deleteFiles(oldLogoKey) : Promise.resolve(),
  ]);

  console.log("deleteFileRes", deleteFileRes);

  return newLogoURL;
}

export async function getWaitlistLogoURL(waitlistID: string) {
  return await db
    .select({
      logoFileURL: waitlists.logoFileURL,
    })
    .from(waitlists)
    .where(eq(waitlists.waitlistID, waitlistID))
    .then((result) => {
      return result[0].logoFileURL;
    });
}

export async function getWaitlistWithWorkspace(waitlistID: string) {
  return await db.query.waitlists.findFirst({
    where: (table, { eq }) => eq(table.waitlistID, waitlistID),
    with: {
      workspace: true,
    },
  });
}

export async function getWaitlistWebsiteDetails(waitlistID: string) {
  noStore();
  const websiteDetails = await db.query.waitlists.findFirst({
    columns: {
      logoFileURL: true,
      websiteName: true,
      websiteLink: true,
      supportEmail: true,
      brandColor: true,
    },
    where: (table, { eq }) => eq(table.waitlistID, waitlistID),
  });

  return {
    logoFileURL: websiteDetails?.logoFileURL || null,
    websiteName: websiteDetails?.websiteName || null,
    websiteLink: websiteDetails?.websiteLink || null,
    supportEmail: websiteDetails?.supportEmail || null,
    brandColor: websiteDetails?.brandColor || null,
  };
}
export async function updateWaitlistWebsiteDetails({
  waitlistID,
  websiteName,
  websiteLink,
  supportEmail,
  brandColor,
}: {
  waitlistID: string;
  websiteName: string | null;
  websiteLink: string | null;
  supportEmail: string | null;
  brandColor: string | null;
}) {
  return await db
    .update(waitlists)
    .set({
      websiteName: websiteName,
      websiteLink: websiteLink,
      supportEmail: supportEmail,
      brandColor: brandColor,
    })
    .where(eq(waitlists.waitlistID, waitlistID));
}
