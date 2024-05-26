import { stripeEnv } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get("Stripe-Signature") as string;
  let event: Stripe.Event | null = null;

  if (signature === null) {
    return NextResponse.json({ error: "no signature" }, { status: 400 });
  }
  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeEnv().STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.log("⚠️  Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "signature failed" }, { status: 400 });
  }

  switch (event?.type) {
    case "checkout.session.completed": {
      console.log("/////////////// receiving webhook ///////////////");
      console.log("## checkout.session.completed ##");
      return;
    }

    // const line_items = (await stripe.checkout.sessions.listLineItems(
    // 	event.data.object.id,
    // )) as Stripe.ApiList<Stripe.LineItem>;
    // console.log("creating org for ", event.data.object.metadata?.userID);

    // const org = await clerkClient.organizations.createOrganization({
    // 	name: event.data.object.metadata?.workspaceName!,
    // 	createdBy: event.data.object.metadata?.userID!,
    // });

    // console.log("creating workspace for ", event.data.object.metadata?.userID);

    // const workspace: Workspace = {
    // 	workspaceID: newId("ws"),
    // 	plan: "pro",
    // 	stripeCustomerID: event.data.object.customer as string,
    // 	stripeSubscriptionID: event.data.object.subscription as string,
    // 	tenantID: org.id,
    // 	createdAt: new Date(),
    // 	deletedAt: null,
    // 	workspaceName: event.data.object.metadata?.workspaceName!,
    // };

    // const workspaceID = await createProWorkspace(workspace);

    // console.log("workspaceID", workspaceID);

    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event?.type}.`);
  }

  return NextResponse.json({ received: true });
}
