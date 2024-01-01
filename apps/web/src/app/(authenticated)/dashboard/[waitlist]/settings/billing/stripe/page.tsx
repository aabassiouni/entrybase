import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export default async function StripeRedirect() {

    const user = await currentUser();
  
    
    
  
    // If they have a subscription already, we display the portal
    // if (ws.stripeCustomerId) {
    //   const session = await stripe.billingPortal.sessions.create({
    //     customer: ws.stripeCustomerId,
    //     return_url: headers().get("referer") ?? "https://unkey.dev/app",
    //   });
  
    //   return redirect(session.url);
    // }
  
    // If they don't have a subscription, we send them to the checkout
    // and the checkout will redirect them to the success page, which will add the subscription to the user table
    const baseUrl = "http://localhost:3000";
  
    // do not use `new URL(...).searchParams` here, because it will escape the curly braces and stripe will not replace them with the session id
    const successUrl = `${baseUrl}/app/settings/billing/stripe/success?session_id={CHECKOUT_SESSION_ID}`;
  
    const cancelUrl = headers().get("referer") ?? `${baseUrl}/app`;
    
    const session = await stripe.checkout.sessions.create({
      client_reference_id: user?.id,
      customer_email: user?.emailAddresses.at(0)?.emailAddress,
      billing_address_collection: "auto",
      mode: "setup",
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