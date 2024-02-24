import { PageHeading } from "@/components/typography";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function NewWorkspacePageLoading() {
	return (
		<>
			<PageHeading>Create Workspace</PageHeading>
			<Card className="flex flex-col">
				<CardHeader>
					<Skeleton className="w-24 h-6" />
					<Skeleton className="w-48 h-5" />
				</CardHeader>
				<CardContent className="">
					<Skeleton className="w-48 h-10" />
				</CardContent>
				<Separator />
				<CardFooter className="pt-6">
					<Skeleton className="w-24 h-10" />
				</CardFooter>
			</Card>
		</>
	);
}

export default NewWorkspacePageLoading;
