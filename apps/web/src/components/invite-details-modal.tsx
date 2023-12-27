import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import EmailScrollArea from "./email-scroll-area";

type InviteDetailsModalProps = {
	invite: { inviteID: string; createdAt: Date; invitedEmails: string[] };
};

async function InviteDetailsModal({ invite }: InviteDetailsModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Card className="flex w-2/3 cursor-pointer justify-around p-4 px-5">
					<div className="flex w-48 items-center">
						<p className="w-44 overflow-hidden text-ellipsis text-center">{invite.invitedEmails[0]}</p>
						<span className="ml-2 rounded bg-neutral-800 p-1 text-sm">
							+{invite.invitedEmails.length > 1 ? invite.invitedEmails.length - 1 : null}
						</span>
					</div>
					<p className="w-24 text-center">{invite.createdAt.toLocaleDateString()}</p>
					<p className="w-20 text-center">{invite.invitedEmails.length}</p>
				</Card>
			</DialogTrigger>
			<DialogContent className=" w-2/3">
				<DialogHeader>
					<DialogTitle>Invite Details</DialogTitle>
				</DialogHeader>
				<Separator className="w-full" />
				<div className="grid grid-cols-2 gap-4">
					<p className="w-fit self-center">Invite ID:</p>
					<p className="w-fit self-center">{invite.inviteID}</p>
					<p className="w-fit">Size:</p>
					<p className="w-fit">{invite.invitedEmails.length}</p>
					<p className="w-fit">Sent on:</p>
					<p className="w-fit">{invite.createdAt.toDateString()}</p>
				</div>
				<div className="w-full">
					<EmailScrollArea invitedEmails={invite.invitedEmails} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default InviteDetailsModal;
