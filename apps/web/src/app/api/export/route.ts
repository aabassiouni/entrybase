import { checkWorkspace } from "@/lib/auth";
import { getSignupsList } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "csv";
import * as fs from "fs";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ message: "no user" }, { status: 401 });
	}

	const { waitlist } = await request.json();
	const workspace = await checkWorkspace(waitlist);

	if (!workspace) {
		return NextResponse.json({ message: "not your waitlist" }, { status: 401 });
	}

	const signups = await getSignupsList(waitlist).then((res) => {
		return res.map((signup) => {
			return {
				email: signup.email,
				firstName: signup.firstName,
				lastName: signup.lastName,
				status: signup.status,
				createdAt: new Date(signup.createdAt!).toLocaleString(),
			};
		});
	});

	const filename = `${waitlist}-signups`;
    const filePath = process.env.NODE_ENV === "production" ? `/tmp/${filename}.csv` : `${filename}.csv`;

	stringify(signups, function (err, output) {
		if (err) throw err;
		fs.writeFile(filePath, output, (err) => {
			if (err) {
				console.error(err);
				return NextResponse.json({ message: "error" }, { status: 500 });
			}
		});
	});

	const resend = new Resend(process.env.RESEND_API_KEY);

	const { data, error } = await resend.emails.send({
		from: "Ali B <onboarding@resend.dev>",
		to: user.emailAddresses[0].emailAddress,
		subject: "Signups CSV",
		attachments: [
			{
				filename: `${filename}.csv`,
				content: fs.readFileSync(filePath).toString("base64"),
			},
		],
		html: `<p>Here is your CSV file for ${waitlist}.</p>`,
	});

    if (error) {
        console.error(error);
        return NextResponse.json({ message: "error" }, { status: 500 });
    }

	return NextResponse.json({ message: "success" });
}
