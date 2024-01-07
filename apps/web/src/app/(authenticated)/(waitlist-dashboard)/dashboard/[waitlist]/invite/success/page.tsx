"use client";

import { MainLayout } from "@/components/layout";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Confetti } from "@neoconfetti/react";
import { useInvites } from "@/components/context/invite-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function InviteSuccessPage({ params }: { params: { waitlist: string } }) {
	const { setInvites } = useInvites();
    const [render, setRender] = useState(false);

	useEffect(() => {
		setInvites([]);
        setRender(true);
	}, []);

	return (
		<MainLayout>
			<div className="flex h-full w-full items-center justify-center">
				<Card className="relative h-1/2 w-full max-w-lg py-5">
					<div className="absolute left-1/2">
						{render && <Confetti stageWidth={1000} />}
					</div>
					<CardHeader>
						<CardTitle className="text-center text-3xl">🎉 Congrats! 🎉</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Your invites have been sent out successfully. These signups will be marked as invited. </p>
						<p className="mt-2">
							You can view your past invites on the{" "}
							<Link href={`/dashboard/${params.waitlist}/sent-invites`}>
								<span className="underline">Sent Invites</span>
							</Link>{" "}
							page.
						</p>
					</CardContent>
					<CardFooter className="justify-center">
						<Link href={`/dashboard/${params.waitlist}`}>
							<Button variant={"default"}>Go to Dashboard</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</MainLayout>
	);
}

export default InviteSuccessPage;
