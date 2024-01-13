import EmailSwitch from "@/components/email-switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { checkWorkspace } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Workspace } from "@/lib/db";
import Stripe from "stripe";
import { PageHeading } from "@/components/typography";
import { ArrowLeftCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ChangePlanButton from "@/components/change-plan-button";

async function PaymentMethod({ workspace }: { workspace: Workspace }) {
	let paymentMethod: Stripe.PaymentMethod | undefined = undefined;

	if (workspace.stripeCustomerID) {
		const [customer, paymentMethods] = await Promise.all([
			stripe.customers.retrieve(workspace.stripeCustomerID),
			stripe.customers.listPaymentMethods(workspace.stripeCustomerID),
		]);

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
				<Suspense fallback={<Skeleton className="h-10 w-96" />}>
					{paymentMethod ? (
						<div className="flex items-center gap-4">
							{paymentMethod.card?.brand}
							<p className="text-center text-neutral-500">•••• •••• •••• {paymentMethod.card?.last4}</p>
						</div>
					) : (
						<p className="text-neutral-500">No payment method added</p>
					)}
					<Link href={"billing/stripe"}>
						{paymentMethod ? <Button>Change Payment Method</Button> : <Button>Add Payment Method</Button>}
					</Link>
				</Suspense>
			</CardContent>
		</>
	);
}

async function BillingSettingsPage() {
	const workspace = await checkWorkspace();
	if (!workspace) {
		return redirect("/dashboard");
	}
	const products = (await stripe.products.list({ active: true, expand: ["data.default_price"] }).then((res) => {
		return res.data.sort((a, b) => {
			//weird stripe ts things
			// @ts-ignore
			return a.default_price?.unit_amount - b?.default_price?.unit_amount;
		});
	})) as Stripe.Product[];

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
							<PricingCard
								workspaceID={workspace.workspaceID}
								key={product.id}
								plan={workspace.plan}
								product={product}
							/>
						);
					})}
				</CardContent>
			</Card>
		</>
	);
}

function PricingCard({ plan, product, workspaceID }: { plan: string; product: Stripe.Product; workspaceID: string }) {
	return (
		<Card className="flex flex-col ">
			<CardHeader className="w-full text-left">
				<CardTitle className="">{product.name}</CardTitle>
				<CardDescription className="pb-2">Perfect for indie builders and starters</CardDescription>
				<div className="space-x-2 text-white">
					{/* @ts-ignore */}
					{/* <span className="text-5xl text-primary">${product.default_price.unit_amount / 100}</span> */}
					<span className="text-base font-extralight text-neutral-400">/mo</span>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className="flex-1">
				<ul className="pt-4">
					<li className="inline-flex w-full gap-2">
						<span>•</span>
						<p className="text-base font-light text-white">1000 signups</p>
					</li>
					<li className="inline-flex w-full gap-2">
						<span>•</span>

						<p className="text-base font-light text-white">100 invites</p>
					</li>
					<li className="inline-flex w-full gap-2">
						<span>•</span>
						<p className="text-base font-light text-white">1 waitlist</p>
					</li>
				</ul>
			</CardContent>
			<CardFooter>
				{plan !== product.metadata.plan ? (
					<ChangePlanButton plan={product.metadata.plan} workspaceID={workspaceID} />
				) : (
					<Button disabled className="w-full">
						You are on this plan
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}

export default BillingSettingsPage;
