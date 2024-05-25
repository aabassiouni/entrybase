import InviteTemplate from "@/components/email/invite-template";
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
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(env().RESEND_API_KEY);

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
    case "count":
      return await handleCount();
    case "list":
      return await handleList();
  }

  async function handleCount() {
    if (!workspace) {
      return NextResponse.redirect("/dashboard");
    }

    const emailsList = await getInvitesListByCount(selectionMethod, inviteCount, waitlistID);

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
        console.log("Resend response", resendResponse.data);
        const emailIDs = resendResponse.data.data.map((email) => email.id);
        await createInvite(waitlistID, emailIDs, emailsList);
      }
    } else {
      console.log("Error sending emails:", resendResponse.error);
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
      console.log("recording usage for", sub.items.data[0].id);
      await stripe.subscriptionItems.createUsageRecord(sub.items.data[0].id, {
        quantity: inviteCount,
        timestamp: "now",
        action: "increment",
      });
    }

    return NextResponse.json({ message: "success" });
  }

  async function handleList() {
    if (!workspace) {
      return NextResponse.redirect("/dashboard");
    }

    const emailsList = invitesList;

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
        console.log("Resend response", resendResponse.data);
        const emailIDs = resendResponse.data.data.map((email) => email.id);
        await createInvite(waitlistID, emailIDs, emailsList);
      }
    } else {
      console.log("Error sending emails:", resendResponse.error);
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
      console.log("recording usage for", sub.items.data[0].id);
      await stripe.subscriptionItems.createUsageRecord(sub.items.data[0].id, {
        quantity: inviteCount,
        timestamp: "now",
        action: "increment",
      });
    }

    return NextResponse.json({ message: "success" });
  }
}
