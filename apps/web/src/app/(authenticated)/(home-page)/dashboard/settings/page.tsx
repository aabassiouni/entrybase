import React from "react";
import { redirect } from "next/navigation";

function HomeSettingsPage({ params}: { params: { waitlist: string }}) {
	const { waitlist } = params;
	return redirect(`/dashboard/settings/billing`);
}

export default HomeSettingsPage;
