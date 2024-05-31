import { EmptyComponent, EmptyComponentDescription, EmptyComponentTitle } from "@/components/empty-component";
import InviteDetailsModal from "@/components/invite-details-modal";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { checkWorkspace } from "@/lib/auth";
import { getInvitesForWaitlist } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function SentInvitesPage({ params }: { params: { waitlist: string } }) {
  const _workspace = await checkWorkspace(params.waitlist);

  const invites = await getInvitesForWaitlist(params.waitlist);

  return (
    <MainLayout>
      <PageHeading>Sent Invites</PageHeading>
      <div className="flex flex-1 flex-col items-center gap-4">
        <Card className="flex w-2/3 justify-around p-4 px-5 dark:bg-transparent">
          <p className="w-44 text-center">Invited</p>
          <p className="w-24 text-center">Date</p>
          <p># of invites</p>
        </Card>
        <Separator className="w-2/3" />
        {invites.length === 0 ? (
          <EmptyComponent>
            <EmptyComponentTitle>No invites sent yet</EmptyComponentTitle>
            <EmptyComponentDescription>
              You can invite people to your waitlist by clicking the invite button at the top of the page
            </EmptyComponentDescription>
            <Link href={"invite"}>
              <Button>Invite</Button>
            </Link>
          </EmptyComponent>
        ) : null}

        {invites.map((invite, index) => (
          <InviteDetailsModal key={index} invite={invite} />
        ))}
      </div>
    </MainLayout>
  );
}

export default SentInvitesPage;
