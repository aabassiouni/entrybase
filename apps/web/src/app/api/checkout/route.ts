import { db } from "@/lib/db/db";
import { workspaces } from "@waitlister/db";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const user = await currentUser();

	const workspaceName = await request.formData().then((data) => data.get("workspaceName"));

	console.log("workspaceName", workspaceName);

	if (!user) {
		return redirect("/signin");
	}


	// If they don't have a subscription, we send them to the checkout
	// and the checkout will redirect them to the success page, which will add the subscription to the user table
	const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : "http://localhost:3000";;

	// do not use `new URL(...).searchParams` here, because it will escape the curly braces and stripe will not replace them with the session id
	const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`;

	const cancelUrl = headers().get("referer") ?? `${baseUrl}/dashboard/billing`;

	const session = await stripe.checkout.sessions.create({
		client_reference_id: user?.id,
		line_items: [
			{
				price: process.env.STRIPE_PRO_PLAN,
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
