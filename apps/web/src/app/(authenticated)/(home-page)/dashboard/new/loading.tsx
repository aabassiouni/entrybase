import { PageHeading } from "@/components/typography";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function NewWorkspacePageLoading() {
  return (
    <>
      <PageHeading>Create Workspace</PageHeading>
      <Card className="flex flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="">
          <Skeleton className="h-10 w-48" />
        </CardContent>
        <Separator />
        <CardFooter className="pt-6">
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    </>
  );
}

export default NewWorkspacePageLoading;
