// import { Stripe } from "stripe";
import * as Stripe from "stripe";
import { stripeEnv } from "./env";

export const stripe = new Stripe.Stripe(stripeEnv().STRIPE_API_KEY || "", {
	typescript: true,
});
