import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import React from "react";
import { Card } from "@/components/ui/card";
import { getInvitesForWaitlist } from "@/lib/db";
import InviteDetailsModal from "@/components/invite-details-modal";
import { Separator } from "@/components/ui/separator";
import { checkWorkspace } from "@/lib/auth";
import { notFound } from "next/navigation";

async function SentInvitesPage({ params }: { params: { waitlist: string } }) {
	
	const workspace = await checkWorkspace(params.waitlist);
	

	const invites = await getInvitesForWaitlist(params.waitlist);

	return (
		<MainLayout>
			<PageHeading>Sent Invites</PageHeading>
			<div className="flex flex-col items-center gap-4">
				<Card className=" flex w-2/3 justify-around  p-4 px-5 dark:bg-transparent">
					<p className="w-44 text-center">Invited</p>
					<p className="w-24 text-center">Date</p>
					<p># of invites</p>
				</Card>
				<Separator className="w-2/3" />
				{invites.length === 0 ? <p>No invites sent yet</p> : null}

				{invites.map((invite, index) => (
					<InviteDetailsModal key={index} invite={invite} />
				))}
			</div>
		</MainLayout>
	);
}

export default SentInvitesPage;
