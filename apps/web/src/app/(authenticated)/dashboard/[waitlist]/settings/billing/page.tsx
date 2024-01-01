import EmailSwitch from "@/components/email-switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { stripe } from "@/lib/stripe";
import Link from "next/link";

async function PaymentMethod() {

	return (
		<>
			<CardHeader>
				<CardTitle>Payment Method</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center gap-8">
				<p>No payment method added</p>
				<Button>
					<Link href={"billing/stripe"}>Add Payment Method</Link>
				</Button>
			</CardContent>
		</>
	);
}

async function BillingSettingsPage() {
	const products = await stripe.products.list({ expand: ["data.default_price"] }).then((res) => {
		return res.data.sort((a, b) => {
			//weird stripe ts things
			// @ts-ignore
			return a?.default_price?.unit_amount - b?.default_price?.unit_amount;
		});
	});

	console.log(products[1].default_price);

	return (
		<Card className="h-full">
			<CardHeader className="pb-4">
				<CardTitle>Billing Settings</CardTitle>
				<CardDescription>Change your billing settings</CardDescription>
			</CardHeader>
			<Separator />
			<PaymentMethod />
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
								<Button className="w-full">Change Plan</Button>
							</CardFooter>
						</Card>
					);
				})}
			</CardContent>
		</Card>
	);
}

export default BillingSettingsPage;
