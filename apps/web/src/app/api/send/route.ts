import { EmailTemplate } from "@/components/email/template";
import { getEmailTemplateForUser } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	console.log("sending email");

	try {
		const data = await resend.emails.send({
			from: "Ali B <onboarding@resend.dev>",
			to: ["aabassiouni@hotmail.com"],
			subject:"",
			react: EmailTemplate({ bodyText: "", header: "",companyWebsite: ""}),
		});

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
}
