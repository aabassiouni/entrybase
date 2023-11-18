import { redirect } from "next/navigation";
import React from "react";

function LandingPage() {
	return redirect("dashboard");
	// return <div>LandingPage</div>;
}

export default LandingPage;
