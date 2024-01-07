import EmailSwitch from "@/components/email-switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { checkWorkspace } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Workspace } from "@/lib/db";
import Stripe from "stripe";
import { PageHeading } from "@/components/typography";
import { ArrowLeftCircle } from "lucide-react";

async function PaymentMethod({ workspace }: { workspace: Workspace }) {
	let paymentMethod: Stripe.PaymentMethod | undefined = undefined;
	let invoices: Stripe.Invoice[] = [];
	let coupon: Stripe.Coupon | undefined = undefined;

	if (workspace.stripeCustomerID) {
		const [customer, paymentMethods, paid, open] = await Promise.all([
			stripe.customers.retrieve(workspace.stripeCustomerID),
			stripe.customers.listPaymentMethods(workspace.stripeCustomerID),
			stripe.invoices.list({
				customer: workspace.stripeCustomerID,
				limit: 3,
				status: "paid",
			}),
			stripe.invoices.list({
				customer: workspace.stripeCustomerID,
				limit: 3,
				status: "open",
			}),
		]);

		invoices = [...open.data, ...paid.data].sort((a, b) => a.created - b.created);
		if (!customer.deleted) {
			coupon = customer.discount?.coupon;
		}
		if (paymentMethods && paymentMethods.data.length > 0) {
			paymentMethod = paymentMethods.data.at(0);
		}
	}

	return (
		<>
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center gap-8">
				{paymentMethod ? (
					<div className="flex items-center gap-4">
						{paymentMethod.card?.brand}
						<p className="text-neutral-500 text-center">•••• •••• •••• {paymentMethod.card?.last4}</p>
					</div>
				) : (
					<p className="text-neutral-500">No payment method added</p>
				)}

				<Button>
					<Link href={"billing/stripe"}>Add Payment Method</Link>
				</Button>
			</CardContent>
		</>
	);
}

async function BillingSettingsPage() {
	const workspace = await checkWorkspace();
	if (!workspace) {
		return redirect("/dashboard");
	}
	const products = await stripe.products.list({ expand: ["data.default_price"] }).then((res) => {
		return res.data.sort((a, b) => {
			//weird stripe ts things
			// @ts-ignore
			return a?.default_price?.unit_amount - b?.default_price?.unit_amount;
		});
	});

	return (
		<>
			<PageHeading>
				<Link href="/dashboard">
					<ArrowLeftCircle className="mr-4" />
				</Link>
				Billing
			</PageHeading>
			<Card className="h-full">
				<CardHeader className="pb-4">
					<CardTitle>Billing Settings</CardTitle>
					<CardDescription>Change your billing settings</CardDescription>
				</CardHeader>
				<Separator />
				<CardHeader>
					<CardTitle>Usage</CardTitle>
				</CardHeader>
				<CardContent className="">
					<div className="w-1/3 space-y-4">
						<div className="flex justify-between">
							<h1 className="text-lg font-medium">Signup emails</h1>
							<p className="">500/1000</p>
						</div>
						<Progress className="w-" value={50} />
					</div>
				</CardContent>
				<Separator />
				<PaymentMethod workspace={workspace} />
				<Separator />
				<CardHeader>
					<CardTitle>Plan</CardTitle>
				</CardHeader>
				<CardContent className="flex justify-center gap-10">
					{products.map((product) => {
						return (
							<Card className="flex h-80 w-60 flex-col items-center">
								<CardHeader className="text-center">
									<CardTitle>{product.name}</CardTitle>
									<CardDescription>Card Description</CardDescription>
									<div className="text-center text-4xl text-white">
										{/*@ts-ignore*/}
										<span>${product.default_price.unit_amount / 100}</span>
										<span className="text-base">/m</span>
									</div>
								</CardHeader>
								<Separator />
								<CardContent className="flex-1">
									<div className=" pt-4">
										<p className="text-base text-white">1000 signups</p>
										<p className="text-base text-white">100 invites</p>
										<p className="text-base text-white">1 waitlist</p>
									</div>
								</CardContent>
								<CardFooter>
									<Link href="/billing/stripe">
										<Button className="w-full">Change Plan</Button>
									</Link>
								</CardFooter>
							</Card>
						);
					})}
				</CardContent>
			</Card>
		</>
	);
}

export default BillingSettingsPage;
