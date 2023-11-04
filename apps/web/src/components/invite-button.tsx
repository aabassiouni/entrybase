import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useInvites } from "./context/invite-context";

function InviteButton() {
    const { invites } = useInvites();
	return (
		<Link href={`/invite`}>
			<Button variant="default" className="gap-2">
				<p>Invite{}</p>

				<PaperPlaneIcon width={20} height={20} />
			</Button>
		</Link>
	);
}

export default InviteButton;
