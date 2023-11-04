"use client";
import { useInvites } from "@/components/context/invite-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React, { useState } from "react";

function InvitePage() {
	const { invites } = useInvites();
	const [isLoading, setIsLoading] = useState(false);
	console.log(invites);

	async function handleSendInvites() {
		console.log("send invites");
		setIsLoading(true);
		const data = await fetch("/api/send", {
			method: "POST",
			body: JSON.stringify({ invites }),
		});
		const res = await data.json();
		console.log(res);
		setIsLoading(false);
	}
	return (
		<div className="flex w-full items-center justify-center">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<CardTitle>Confirm Your Invitations</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="pb-4">
						<Link href={`/email-preview`}>Preview email</Link>
					</div>
					<div>
						<h1>Iniviting:</h1>
						<ScrollArea className="h-24">
							{invites.length > 0 ? invites.map((invite) => <p>{invite}</p>) : <p>No invites</p>}
						</ScrollArea>
					</div>
				</CardContent>
				<CardFooter className="justify-end">
					<Button onClick={handleSendInvites} disabled={invites.length === 0}>
						{isLoading ? "Sending..." : "Send"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default InvitePage;
