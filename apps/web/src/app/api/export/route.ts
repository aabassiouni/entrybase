import * as fs from "node:fs";
import { checkWorkspace } from "@/lib/auth";
import { getSignupsList } from "@/lib/db";
import { env } from "@/lib/env";
import { currentUser } from "@clerk/nextjs";
import { ExportTemplate } from "@entrybase/email";
import { stringify } from "csv/sync";
import { type NextRequest, NextResponse } from "next/server";
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
    const data = res.map((signup) => {
      return {
        email: signup.email,
        firstName: signup.firstName,
        lastName: signup.lastName,
        status: signup.status,
        createdAt: new Date(signup.createdAt!).toLocaleString(),
      };
    });
    return [
      {
        email: "Email",
        firstName: "First Name",
        lastName: "Last Name",
        status: "Status",
        createdAt: "Created At",
      },
      ...data,
    ];
  });

  const filename = `${waitlist}-signups`;
  const filePath = process.env.NODE_ENV === "production" ? `/tmp/${filename}.csv` : `${filename}.csv`;

  try {
    fs.writeFileSync(filePath, stringify(signups));

    const resend = new Resend(env().RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Ali B <onboarding@resend.dev>",
      to: user.emailAddresses[0].emailAddress,
      subject: "Your signups are ready!",
      attachments: [
        {
          filename: `${filename}.csv`,
          content: fs.readFileSync(filePath, "base64"),
        },
      ],
      react: ExportTemplate(),
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  } catch (_error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }

  return NextResponse.json({ message: "success" });
}
