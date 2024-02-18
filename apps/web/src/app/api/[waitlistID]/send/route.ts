import { InviteTemplate } from "@/components/email/invite-template";
import { checkWorkspace } from "@/lib/auth";
import {
	createInvite,
	findWaitlistForUser,
	getEmailTemplateForUser,
	getInvitesListByCount,
	getWaitlistWebsiteDetails,
} from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest, context: { params: { waitlistID: string } }) {
	console.log("sending emails");

	const data = (await request.json()) as {
		selectionMethod: string;
		inviteCount: number;
		invitesList: { email: string; id: string }[];
	};

	const { selectionMethod, inviteCount, invitesList } = data;

	// get user id from clerk
	const { userId } = auth();

	if (!userId) {
		return NextResponse.redirect("/login");
	}

	const type = request.nextUrl.searchParams.get("type");

	const waitlistID = context.params.waitlistID;

	// check if user has waitlist
	const workspace = await checkWorkspace(waitlistID);

	if (!workspace) {
		return NextResponse.redirect("/dashboard");
	}

	const { bodyText, header, subject } = await getEmailTemplateForUser(userId, waitlistID, "invite").then(
		(res) => res[0],
	);
	const { logoFileURL, supportEmail, websiteName, websiteLink } = await getWaitlistWebsiteDetails(waitlistID);

	if (logoFileURL === null || websiteName === null || websiteLink === null || supportEmail === null) {
		return NextResponse.json({ message: "error", error: "website details not found" });
	}

	console.log("Email values:", subject, bodyText, header);

	switch (type) {
		case "count":
			return await handleCount();
		case "list":
			return await handleList();
	}

	async function handleCount() {
		const emailsList = await getInvitesListByCount(selectionMethod, inviteCount, waitlistID);
		for (const email of emailsList) {
			console.log("sending email to", email.email);
		}

		const resendResponse = { data: { data: [{ id: "1" }, { id: "2" }] }, error: null };
		// const resendResponse = await resend.batch.send(
		// 	emailsList.map((email) => {
		// 		return {
		// 			from: "Ali B <onboarding@resend.dev>",
		// 			to: email.email,
		// 			subject: emailTemplate?.subject ?? "",
		// 			react: InviteTemplate({
		// 				bodyText: emailTemplate?.bodyText,
		// 				header: emailTemplate?.header,
		// 				companyWebsite: "https://usesideprojectai.com",
		// 			}),
		// 		};
		// 	}),
		// );

		if (!resendResponse.error) {
			if (resendResponse.data) {
				console.log("Resend response", resendResponse.data);
				const emailIDs = resendResponse.data.data.map((email) => email.id);
				await createInvite(waitlistID, emailIDs, emailsList);
			}
		} else {
			console.log("Error sending emails:", resendResponse.error);
			return NextResponse.json({ message: "error" });
		}

		return NextResponse.json({ message: "success" });
	}

	async function handleList() {
		const emailsList = invitesList;

		const resendResponse = { data: { data: [{ id: "1" }, { id: "2" }] }, error: null };

		// const resendResponse = await resend.batch.send(
		// 	emailsList.map((email: { email: string; id: string }) => {
		// 		console.log("sending email to", email.email);

		// 		return {
		// 			from: "Ali B <onboarding@resend.dev>",
		// 			to: email.email,
		// 			subject: emailTemplate?.subject ?? "",
		// 			react: InviteTemplate({
		// 				bodyText: emailTemplate?.bodyText,
		// 				header: emailTemplate?.header,
		// 				companyWebsite: "https://usesideprojectai.com",
		// 			}),
		// 		};
		// 	}),
		// );

		if (!resendResponse.error) {
			if (resendResponse.data) {
				console.log("Resend response", resendResponse.data);
				const emailIDs = resendResponse.data.data.map((email) => email.id);
				await createInvite(waitlistID, emailIDs, emailsList);
			}
		} else {
			console.log("Error sending emails:", resendResponse.error);
			return NextResponse.json({ message: "error" });
		}

		return NextResponse.json({ message: "success" });
	}
}
