import React, { useState } from "react";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function ExportToCsvButton() {
	const { waitlist } = useParams();
	const [loading, setLoading] = useState(false);

	async function handleClick() {
		setLoading(true);
		const res = await fetch(`/api/export`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ waitlist }),
		});

		const data = await res.json();
		setLoading(false);
	}

	return (
		<Button disabled={loading} onClick={handleClick} className="h-8 px-3 py-2">
			{loading ? <Loader2 className="animate-spin" /> : "Export"}
		</Button>
	);
}

export default ExportToCsvButton;
