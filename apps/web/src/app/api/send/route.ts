import { EmailTemplate } from "@/components/email/template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	console.log("sending email");
	try {
		const data = await resend.emails.send({
			from: "Ali B <onboarding@resend.dev>",
			to: ["aabassiouni@hotmail.com"],
			subject: "Hello world",
			react: EmailTemplate({ email: "John", headerSectionColor: "bg-blue-500", bodyText: "Hello world" }),
		});

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
}
