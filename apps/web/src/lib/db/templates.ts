import "server-only";

import { email_templates } from "@entrybase/db";
import { newId } from "@entrybase/id";
import { and, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "./db";

type setEmailTemplateForUserParams = {
	waitlistID: string;
	template: "invite" | "signup";
	subject: string | null;
	bodyText: string | null;
	header: string | null;
};

export async function initEmailTemplates(waitlistID: string) {
	return await db
		.insert(email_templates)
		.values([
			{ waitlistID: waitlistID, templateID: newId("et"), template: "invite" },
			{ waitlistID: waitlistID, templateID: newId("et"), template: "signup" },
		])
		.returning({ templateID: email_templates.templateID });
}

export async function setEmailTemplateForUser({
	bodyText,
	header,
	subject,
	template,
	waitlistID,
}: setEmailTemplateForUserParams) {
	noStore();
	return await db
		.update(email_templates)
		.set({
			bodyText: bodyText,
			header: header,
			subject: subject,
		})
		.where(and(eq(email_templates.waitlistID, waitlistID), eq(email_templates.template, template)));
}

export async function getEmailTemplateForUser({
	waitlistID,
	template,
}: { waitlistID: string; template: "invite" | "signup" }) {
	noStore();
	return await db
		.select()
		.from(email_templates)
		.where(and(eq(email_templates.waitlistID, waitlistID), eq(email_templates.template, template)))
		.then((res) => res[0]);
}
