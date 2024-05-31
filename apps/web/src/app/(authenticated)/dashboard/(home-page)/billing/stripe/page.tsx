import { checkWorkspace } from "@/lib/auth";
import { getWorkspaceForTenant } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function StripeRedirect({ params }: { params: { waitlist: string } }) {
  const user = await currentUser();

  console.log("params in StripeRedirect: ", params);
  const ws = await checkWorkspace();

  if (!ws) {
    return redirect("/new");
  }

  const baseUrl = env().VERCEL_URL ? `https://${env().VERCEL_URL}` : "http://localhost:3000";

  // If they have a subscription already, we display the portal
  if (ws.stripeCustomerID) {
    const session = await stripe.billingPortal.sessions.create({
      customer: ws.stripeCustomerID,
      return_url: headers().get("referer") ?? `${baseUrl}/dashboard/billing`,
    });

    return redirect(session.url);
  }

  // If they don't have a subscription, we send them to the checkout
  // and the checkout will redirect them to the success page, which will add the subscription to the user table

  // do not use `new URL(...).searchParams` here, because it will escape the curly braces and stripe will not replace them with the session id
  const successUrl = `${baseUrl}/dashboard/billing/stripe/success?session_id={CHECKOUT_SESSION_ID}`;

  const cancelUrl = headers().get("referer") ?? `${baseUrl}/dashboard/billing`;

  const session = await stripe.checkout.sessions.create({
    client_reference_id: user?.id,
    customer_email: user?.emailAddresses?.at(0)?.emailAddress,
    billing_address_collection: "auto",
    mode: "setup",
    payment_method_collection: "always",
    success_url: successUrl,
    cancel_url: cancelUrl,
    currency: "USD",
    customer_creation: "always",
  });

  if (!session.url) {
    return <div>Could not create checkout session</div>;
  }

  return redirect(session.url);
}
