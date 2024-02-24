import { PageHeading } from "@/components/typography";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { currentUser } from "@clerk/nextjs";

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
						<CardTitle>Workspace Name</CardTitle>
						<CardDescription>Enter a name for your workspace</CardDescription>
					</CardHeader>
					<CardContent className="">
						<Input name="workspaceName" required className="w-42" placeholder="Workspace Name" />
					</CardContent>
					<Separator />
					<CardFooter className="pt-6">
						<Button className="w-fit">Create Workspace</Button>
					</CardFooter>
				</form>
			</Card>
		</>
	);
}

export default NewWorkspacePage;
