import { checkWorkspace } from "@/lib/auth";
import { updateStripeDetailsForWorkspace } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function StripeSuccessPage({ searchParams }: { searchParams: { session_id: string } }) {
	const _user = await currentUser();

	const ws = await checkWorkspace();

	if (!ws) {
		return redirect("/dashboard/billing");
	}

	const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
	if (!session) {
		return (
			<p>
				Could not find Stripe session <code>{searchParams.session_id}</code>.
			</p>
		);
	}

	await updateStripeDetailsForWorkspace(ws.workspaceID, session.customer as string, session.subscription as string);

	return redirect("/dashboard/billing");
}
