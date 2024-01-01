// import { Stripe } from "stripe";
import * as Stripe from "stripe";

export const stripe = new Stripe.Stripe(process.env.STRIPE_API_KEY || "", {
    typescript: true,
});
