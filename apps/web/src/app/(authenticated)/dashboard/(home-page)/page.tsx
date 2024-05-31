import CreateWaitlistDialog from "@/components/create-waitlist-dialog";
import { PageHeading } from "@/components/typography";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { checkWorkspace } from "@/lib/auth";
import { getWaitlistsForUser } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function WaitlistCard({ waitlistID, waitlistName }: { waitlistID: string; waitlistName: string }) {
  return (
    <Link className="w-full" href={`/dashboard/${waitlistID}`}>
      <Card className="h-32 sm:h-60 sm:w-[330px]">
        <div className="relative h-16 w-full rounded-t-lg sm:h-40">
          <div className="absolute inset-0 z-10 h-full w-full rounded-t-lg bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] bg-primary" />
        </div>
        <CardHeader className="">
          <CardTitle>{waitlistName}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

async function HomePage() {
  const workspace = await checkWorkspace();

  if (!workspace) {
    notFound();
  }

  const waitlists = await getWaitlistsForUser(workspace?.workspaceID);

  return (
    <>
      <PageHeading>Waitlists</PageHeading>
      <div className="sm:!grid flex flex-wrap gap-4 sm:grid-cols-3 sm:gap-10">
        <CreateWaitlistDialog>
          <Card className="flex h-32 w-full cursor-pointer flex-col items-center justify-center sm:h-60 sm:w-[330px]">
            <Plus className="h-10 w-10 text-primary" />
            <CardHeader className="">
              <CardTitle>Create a new waitlist</CardTitle>
            </CardHeader>
          </Card>
        </CreateWaitlistDialog>
        {waitlists.map((waitlist, i) => (
          <WaitlistCard key={i} waitlistID={waitlist.waitlistID} waitlistName={waitlist.waitlistName} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
