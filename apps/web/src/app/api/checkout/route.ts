import { stripeEnv } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const user = await currentUser();

	const workspaceName = await request.formData().then((data) => data.get("workspaceName"));

	console.log("workspaceName", workspaceName);

	if (!user) {
		return redirect("/signin");
	}

	const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : "http://localhost:3000";
	const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = headers().get("referer") ?? `${baseUrl}/dashboard/billing`;

	const session = await stripe.checkout.sessions.create({
		client_reference_id: user?.id,
		line_items: [
			{
				price: stripeEnv().STRIPE_PRO_PLAN_USAGE,
			},
			{
				price: stripeEnv().STRIPE_PRO_PLAN_FLAT,
				quantity: 1,
			},
		],
		customer_email: user?.emailAddresses.at(0)?.emailAddress,
		billing_address_collection: "auto",
		mode: "subscription",
		success_url: successUrl,
		cancel_url: cancelUrl,
		currency: "USD",
		metadata: {
			userID: user?.id,
			workspaceName: workspaceName as string,
		},
	});

	if (!session.url) {
		return redirect("/dashboard/billing");
	}
	return redirect(session.url);
}
