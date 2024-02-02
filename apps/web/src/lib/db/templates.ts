import "server-only";

import { eq, and } from "drizzle-orm";
import { email_templates } from "@waitlister/db";
import { newId } from "@waitlister/id";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "./db";

export async function initEmailTemplates(waitlistID: string) {
	return await db
		.insert(email_templates)
		.values([
			{ waitlistID: waitlistID, templateID: newId("et"), template: "invite" },
			{ waitlistID: waitlistID, templateID: newId("et"), template: "signup" },
		])
		.returning({ templateID: email_templates.templateID });
}

export async function setEmailTemplateForUser(emailTemplate: any) {
	noStore();
	return await db
		.update(email_templates)
		.set({
			bodyText: emailTemplate.bodyText,
			header: emailTemplate.header,
			subject: emailTemplate.subject,
		})
		.where(eq(email_templates.waitlistID, emailTemplate.waitlistID));
}

export async function getEmailTemplateForUser(waitlistID: string, userID: string, template: "invite" | "signup") {
	return await db
		.select()
		.from(email_templates)
		.where(and(eq(email_templates.waitlistID, waitlistID), eq(email_templates.template, template)));
}
