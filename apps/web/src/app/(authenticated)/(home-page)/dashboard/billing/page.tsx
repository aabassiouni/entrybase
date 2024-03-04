import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { checkWorkspace } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import type { Workspace } from "@waitlister/db";
import { ArrowLeftCircle, Check } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Stripe from "stripe";

const plans = [
	{
		name: "free",
		displayName: "Free",
		price: 0,
		description: "For indie builders and starters",
		features: ["Unlimited Signups", "5 Waitlists", "100 Invites"],
	},
	{
		name: "pro",
		displayName: "Pro",
		price: 10,
		features: [
			"Unlimited Signups",
			"Unlimited Waitlists",
			"3000 invites included, $0.01 per invite after",
			"Custom Email templates",
			"Team members",
		],
	},
];

async function PaymentMethod({ workspace }: { workspace: Workspace }) {
	let paymentMethod: Stripe.PaymentMethod | undefined = undefined;

	if (workspace.stripeCustomerID) {
		const [_customer, paymentMethods] = await Promise.all([
			stripe.customers.retrieve(workspace.stripeCustomerID),
			stripe.customers.listPaymentMethods(workspace.stripeCustomerID),
		]);

		if (paymentMethods && paymentMethods.data.length > 0) {
			paymentMethod = paymentMethods.data.at(0);
		}
	}

	return (
		<div className="flex-1">
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-between items-center gap-8">
				<Suspense fallback={<Skeleton className="h-10 w-96" />}>
					{paymentMethod ? (
						<div className="flex items-center gap-4">
							<span className="text-neutral-500">•••• •••• •••• {paymentMethod.card?.last4}</span>
						</div>
					) : (
						<p className="text-neutral-500">No payment method added</p>
					)}
					<Link href={"billing/stripe"}>
						{paymentMethod ? (
							<Button className="dark:bg-light">Change Payment Method</Button>
						) : (
							<Button>Add Payment Method</Button>
						)}
					</Link>
				</Suspense>
			</CardContent>
		</div>
	);
}

async function BillingSettingsPage() {
	const workspace = await checkWorkspace();
	if (!workspace) {
		return redirect("/dashboard");
	}
	return (
		<>
			<PageHeading>
				<Link href="/dashboard">
					<ArrowLeftCircle className="mr-4" />
				</Link>
				Billing
			</PageHeading>
			<Card className="h-fit">
				<CardHeader className="pb-4">
					<CardTitle>Billing Settings</CardTitle>
					<CardDescription>Change your billing settings</CardDescription>
				</CardHeader>
				<Separator />
				<div>
					<CardHeader>
						<CardTitle>Workspace</CardTitle>
					</CardHeader>
					<CardContent className="flex justify-between">
						<div>
							<p className="text-lg font-">
								You are currently on the {workspace.plan === "free" ? "Free" : "Pro"} plan
							</p>
						</div>
						<p className="text-neutral-500">{workspace.workspaceID}</p>
					</CardContent>
				</div>
				<Separator />
				<div className="flex">
					<div className="flex-1">
						<CardHeader>
							<CardTitle>Usage</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<h1 className="text-lg font-medium">Waitlists</h1>
								<p>2/5</p>
							</div>
							<Progress value={(2/5)*100} />
							<div className="flex items-center justify-between">
								<h1 className="text-lg font-medium">Invite emails sent</h1>
								<p>500/1000</p>
							</div>
							<Progress value={50} />
						</CardContent>
					</div>
					<PaymentMethod workspace={workspace} />
				</div>
				<Separator />
				<CardHeader>
					<CardTitle>Plan</CardTitle>
				</CardHeader>
				<CardContent className="flex justify-center gap-10">
					{plans.map((plan, index) => {
						return <PricingCard plan={plan} key={index} activePlan={workspace.plan} />;
					})}
				</CardContent>
			</Card>
		</>
	);
}

function PricingCard({
	activePlan,
	plan,
}: {
	activePlan: string;
	plan: any;
}) {
	async function changePlan() {
		"use server";
		const user = await currentUser();

		const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
		const successUrl = `${baseUrl}/dashboard/billing/stripe/success?session_id={CHECKOUT_SESSION_ID}`;

		const cancelUrl = headers().get("referer") ?? `${baseUrl}/dashboard/billing`;
		const ws = await checkWorkspace();

		console.log("ws: ", ws?.stripeCustomerID!);
		const session = await stripe.checkout.sessions.create({
			client_reference_id: user?.id,
			billing_address_collection: "auto",
			mode: "subscription",
			line_items: [
				{
					price: process.env.STRIPE_PRO_PLAN,
					quantity: 1,
				},
			],
			customer: ws?.stripeCustomerID ?? undefined,
			success_url: successUrl,
			cancel_url: cancelUrl,
			currency: "USD",
		});

		if (!session.url) {
			redirect("/dashboard/billing");
		}
		redirect(session.url);
	}
	return (
		<Card className="flex flex-col max-w-xs ">
			<CardHeader className="w-full text-left">
				<CardTitle className="text-[#D3FDEE]">{plan.displayName}</CardTitle>
				<CardDescription className="pb-2">Perfect for indie builders and starters</CardDescription>
				<div className="flex items-end pb-2 text-white">
					<span className="self-start text-lg text-primary">$</span>
					<span className="text-5xl font-medium text-primary">{plan.price}</span>
					<span className="text-base font-extralight text-neutral-400">/mo</span>
				</div>
				{activePlan !== plan.name ? (
					<form className="w-full" action={changePlan}>
						<Button className="dark:bg-[#D3FDEE] w-full">Change Plan</Button>
					</form>
				) : (
					<Button disabled className="w-full dark:bg-[#D3FDEE]">
						You are on this plan
					</Button>
				)}
			</CardHeader>
			<Separator />
			<CardContent className="flex-1 pt-4">
				{plan.features.map((feature: string, index: number) => {
					return (
						<div key={index} className="flex items-center gap-2">
							<Check className="text-primary" size={16} />
							<p className="text-base font-light text-[#D3FDEE]">{feature}</p>
						</div>
					);
				})}
			</CardContent>
			<CardFooter />
		</Card>
	);
}

export default BillingSettingsPage;
