import { Toaster } from "@/components/ui/toaster";
import { checkWorkspace } from "@/lib/auth";
import React from "react";

async function InviteLayout({ children, params }: { children: React.ReactNode, params: { waitlist: string }}) {

	const workspace = await checkWorkspace(params.waitlist);

	return (
		<>
			{children}
		</>
	);
}

export default InviteLayout;
