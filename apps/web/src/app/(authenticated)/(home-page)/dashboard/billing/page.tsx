import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { checkWorkspace } from "@/lib/auth";
import { getWaitlistsForUser } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import type { Workspace } from "@waitlister/db";
import { ArrowLeftCircle, Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import type Stripe from "stripe";

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
			<CardContent className="flex flex-col items-center justify-between gap-8 md:flex-row">
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

	const usageAmount = (workspace.remainingInvites - 1000) * -1;
	const limit = workspace.plan === "free" ? 1000 : 3000;
	const waitlistsUsed = await getWaitlistsForUser(workspace.workspaceID).then((waitlists) => waitlists.length);
	const waitlistsLimit = workspace.plan === "free" ? 5 : undefined;

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
					<CardContent className="flex flex-col justify-between md:flex-row">
						<div>
							<p className="font- text-lg">
								You are currently on the {workspace.plan === "free" ? "Free" : "Pro"} plan
							</p>
						</div>
						<p className="text-neutral-500">{workspace.workspaceID}</p>
					</CardContent>
				</div>
				<Separator />
				<div className="flex flex-col md:flex-row">
					<div className="flex-1">
						<CardHeader>
							<CardTitle>Usage</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<h1 className="font-medium text-lg">Waitlists</h1>
								<p>
									{`${waitlistsUsed}/`}
									{waitlistsLimit ?? <span>&#8734;</span>}
								</p>
							</div>
							<Progress value={(waitlistsUsed / 5) * 100} />
							<div className="flex items-center justify-between">
								<h1 className="font-medium text-lg">Invite emails sent</h1>
								<p>{`${usageAmount}/1000`}</p>
							</div>
							<Progress value={((usageAmount ?? 0) / limit) * 100} />
						</CardContent>
					</div>
					<PaymentMethod workspace={workspace} />
				</div>
				<Separator />
				<CardHeader>
					<CardTitle>Plan</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col justify-center gap-10 md:flex-row">
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
	return (
		<Card className="flex max-w-xs flex-col">
			<CardHeader className="w-full text-left">
				<CardTitle className="text-[#D3FDEE]">{plan.displayName}</CardTitle>
				<CardDescription className="pb-2">Perfect for indie builders and starters</CardDescription>
				<div className="flex items-end pb-2 text-white">
					<span className="self-start text-lg text-primary">$</span>
					<span className="font-medium text-5xl text-primary">{plan.price}</span>
					<span className="font-extralight text-base text-neutral-400">/mo</span>
				</div>
				{activePlan !== plan.name ? (
					<Link className="w-full" href={"/dashboard/new"}>
						<Button className="w-full dark:bg-[#D3FDEE]">Change Plan</Button>
					</Link>
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
							<p className="font-light text-[#D3FDEE] text-base">{feature}</p>
						</div>
					);
				})}
			</CardContent>
			<CardFooter />
		</Card>
	);
}

export default BillingSettingsPage;
