import { createProWorkspace } from "@/lib/db";
import type { Workspace } from "@waitlister/db";
import { db } from "@/lib/db/db";
import { newId } from "@waitlister/id";
import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";
import Stripe from "stripe";


async function buffer(readable: Readable) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks);
}

export async function POST(request: NextRequest) {
	const body = await request.text();
	const headersList = headers();
	const signature = headersList.get("Stripe-Signature") as string;
	let event;

	if (signature === null) {
		return NextResponse.json({ error: "no signature" }, { status: 400 });
	}
	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string);
	} catch (err: any) {
		console.log(`⚠️  Webhook signature verification failed.`, err.message);
		return NextResponse.json({ error: "signature failed" }, { status: 400 });
	}

	switch (event?.type) {
		case "checkout.session.completed":
			console.log("/////////////// receiving webhook ///////////////");
			console.log("## checkout.session.completed ##");

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
