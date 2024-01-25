import React from "react";
import { redirect } from "next/navigation";
import { checkWorkspace } from "@/lib/auth";

async function SettingsPage({ params }: { params: { waitlist: string }}) {
	const { waitlist } = params;
	const workspace = await checkWorkspace(waitlist);
	return redirect(`/dashboard/${waitlist}/settings/waitlist`);
}

export default SettingsPage;
