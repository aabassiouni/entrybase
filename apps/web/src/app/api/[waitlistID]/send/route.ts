import { checkWorkspace } from "@/lib/auth";
import {
  createInvite,
  getEmailTemplateForUser,
  getInvitesListByCount,
  getWaitlistWebsiteDetails,
  updateRemainingInvitesForWorkspace,
} from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { InviteTemplate } from "@entrybase/email";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env().RESEND_API_KEY);

export async function POST(request: NextRequest, context: { params: { waitlistID: string } }) {
  const type = request.nextUrl.searchParams.get("type");
  const waitlistID = context.params.waitlistID;

  // get user id from clerk
  const { userId } = auth();
  if (!userId) {
    return NextResponse.redirect("/login");
  }

  // check if user has waitlist
  const workspace = await checkWorkspace(waitlistID);
  if (!workspace) {
    return NextResponse.redirect("/dashboard");
  }

  const data = (await request.json()) as {
    selectionMethod: string;
    inviteCount: number;
    invitesList: { email: string; id: string }[];
  };

  const { selectionMethod, inviteCount, invitesList } = data;

  const { bodyText, header, subject } = await getEmailTemplateForUser({
    waitlistID,
    template: "invite",
  });

  const {
    logoFileURL: websiteLogo,
    supportEmail,
    websiteLink,
    websiteName,
    brandColor,
  } = await getWaitlistWebsiteDetails(waitlistID);

  if (websiteLogo === null || websiteName === null || websiteLink === null || supportEmail === null) {
    return NextResponse.json({ code: "NO_WEBSITE_DETAILS", message: "website details not found" }, { status: 400 });
  }

  switch (type) {
    case "count": {
      const emailsList = await getInvitesListByCount(selectionMethod, inviteCount, waitlistID);
      return await handleSend(emailsList);
    }
    case "list": {
      const emailsList = invitesList;
      return await handleSend(emailsList);
    }
  }

  async function handleSend(
    emailsList: {
      email: string;
      id: string;
    }[],
  ) {
    if (!workspace) {
      return NextResponse.redirect("/dashboard");
    }

    const resendResponse =
      process.env.NODE_ENV === "development"
        ? { data: { data: [{ id: "1" }, { id: "2" }] }, error: null }
        : await resend.batch.send(
            emailsList.map((email) => {
              return {
                from: "Ali B <onboarding@resend.dev>",
                to: email.email,
                subject: subject ?? "",
                react: InviteTemplate({
                  bodyText,
                  header,
                  websiteLogo,
                  brandColor,
                  supportEmail,
                  websiteLink,
                  websiteName,
                }),
              };
            }),
          );

    if (!resendResponse.error) {
      if (resendResponse.data) {
        const emailIDs = resendResponse.data.data.map((email) => email.id);
        await createInvite(waitlistID, emailIDs, emailsList);
      }
    } else {
      return NextResponse.json({ message: "error" });
    }

    await updateRemainingInvitesForWorkspace({
      workspaceID: workspace.workspaceID,
      remainingInvites: workspace.remainingInvites - inviteCount,
    });

    if (workspace?.stripeSubscriptionID) {
      const subId = workspace?.stripeSubscriptionID;
      if (!subId) {
        return NextResponse.json({ code: "NO_SUBSCRIPTION_FOUND", message: "error" });
      }

      const sub = await stripe.subscriptions.retrieve(subId);

      await stripe.subscriptionItems.createUsageRecord(sub.items.data[0].id, {
        quantity: inviteCount,
        timestamp: "now",
        action: "increment",
      });
    }

    return NextResponse.json({ message: "success" });
  }
}
