"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

function TemplateSelect({waitlistID}: {waitlistID: string}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const template = searchParams.get("template") ?? "invite";

	return (

		<Select
			name="template"
            value={template}
			onValueChange={(value) => {
				router.push(`/dashboard/${waitlistID}/email-preview?template=${value}`);
			}}
		>
			<SelectTrigger className="w-40">
				<SelectValue placeholder="Select a template " />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="invite">Invite</SelectItem>
				<SelectItem value="signup">Signup</SelectItem>
			</SelectContent>
		</Select>
	);
}

export default TemplateSelect;
