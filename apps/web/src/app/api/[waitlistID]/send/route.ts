import { InviteTemplate } from "@/components/email/invite-template";
import { findWaitlistForUser, getEmailTemplateForUser, getInvitesListByCount } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest, context: { params: { waitlistID: string } }) {
	console.log("sending email");

	// get user id from clerk
	const { userId } = auth();

	if (!userId) {
		return NextResponse.redirect("/login");
	}

	const type = request.nextUrl.searchParams.get("type");

	const waitlistID = context.params.waitlistID;
	const data = await request.json();

	// check if user has waitlist
	const waitlist = await findWaitlistForUser(userId, waitlistID);
	if (waitlist.length === 0) {
		return NextResponse.redirect("/dashboard");
	}

	const emailTemplate = await getEmailTemplateForUser(userId, waitlistID, "invite").then((res) => res[0]);

	switch (type) {
		case "count":
			return await handleCount();
		case "list":
			return await handleList();
	}

	async function handleCount() {
		const emailsList = await getInvitesListByCount(data.selectionMethod, data.inviteCount, waitlistID);
		for (const email of emailsList) {
			console.log("sending email to", email.email);
		}
		// const resendResponse = await resend.emails.send({
		// 	from: "Ali B <onboarding@resend.dev>",
		// 	to: emailsList.map((email) => email.email),
		// 	subject: emailTemplate.subject ?? "",
		// 	react: EmailTemplate({
		// 		bodyText: emailTemplate.bodyText,
		// 		header: emailTemplate.header,
		// 		companyWebsite: "https://usesideprojectai.com",
		// 	}),
		// });

		// console.log(resendResponse);

		return NextResponse.json({ message: "success" });
	}

	async function handleList() {
		const emailsList = data.invitesList;
		for (const email of emailsList) {
			console.log("sending email to", email.email);
		}
		// const resendResponse = await resend.emails.send({
		// 	from: "Ali B <onboarding@resend.dev>",
		// 	to: emailsList.map((email) => email.email),
		// 	subject: emailTemplate.subject ?? "",
		// 	react: EmailTemplate({
		// 		bodyText: emailTemplate.bodyText,
		// 		header: emailTemplate.header,
		// 		companyWebsite: "https://usesideprojectai.com",
		// 	}),
		// });
		return NextResponse.json({ message: "success" });
	}
}
