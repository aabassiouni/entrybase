"use client";
import { Button } from "@/components/ui/button";
import { useOrganizationList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

function ChangeOrgButton({ orgID }: { orgID: string }) {
	const { isLoaded: listIsLoaded, setActive } = useOrganizationList({});
	const router = useRouter();

	if (!listIsLoaded) {
		return null;
	}

	return (
		<Button
			onClick={async () => {
				try {
					console.log("running onClick");
					await setActive({ organization: orgID });
				} catch (e) {
					console.log(e);
				} finally {
					router.refresh();
					router.push("/dashboard");
				}
			}}
		>
			Go to workspace
		</Button>
	);
}

export default ChangeOrgButton;
