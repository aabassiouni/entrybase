import { PageHeading } from "@/components/typography";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { currentUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

async function NewWorkspacePage() {
	const user = await currentUser();
	if (!user || !user.id) {
		return null;
	}

	return (
		<>
			<PageHeading>Create Workspace</PageHeading>
			<Card className="flex flex-col">
				<form method="POST" action="/api/checkout">
					<CardHeader>
						<CardTitle>Create Pro workspace</CardTitle>
						<div>
							<p className="text-neutral-500">Get access to all the features</p>
						</div>
					</CardHeader>
					<CardContent className="">
						<Label>Workspace Name</Label>
						<Input name="workspaceName" required className="w-42" placeholder="Pro workspace" />
					</CardContent>
					<Separator />
					<CardFooter className="pt-6 gap-4">
						<Button className="w-fit">Checkout</Button>
						<div className="flex items-center gap-2 text-neutral-500">
							<Info size={16}/>
							<p className="text-sm">You will be taken to a Stripe checkout page</p>
						</div>
					</CardFooter>
				</form>
			</Card>
		</>
	);
}

export default NewWorkspacePage;
