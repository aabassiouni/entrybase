import React from "react";
import { redirect } from "next/navigation";

function SettingsPage({ params }: { params: { waitlist: string }}) {
	const { waitlist } = params;
	console.log(params)
	return redirect(`/dashboard/${waitlist}/settings/waitlist`);
}

export default SettingsPage;
