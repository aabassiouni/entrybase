"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailPreview from "@/components/email-preview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function InvitePage() {
	const [email, setEmail] = useState("");
	const [headerSectionColor, setHeaderSectionColor] = useState("bg-gray-900");

	function handleInputChange(event: any) {
		setEmail(event.target.value);
	}
	return (
		<div className="flex w-full">
			<div className="w-1/2 p-8">
				<h1 className="text-3xl">Edit Invite Email</h1>
				<Separator className="my-4" />
				<Label htmlFor="email">Subject</Label>
				<Input id="email" onChange={handleInputChange} className="my-1 w-1/4" />
				<Select onValueChange={setHeaderSectionColor}>
					<SelectTrigger className="w-fit">
						<SelectValue placeholder="Header Section Color" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="bg-blue-800">blue</SelectItem>
						<SelectItem value="pastDay">Option 2</SelectItem>
						<SelectItem value="pastMonth">Option 3</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="w-1/2">
				<div>
					<h1 className="py-8 text-center text-3xl">Invite Preview</h1>
				</div>

				<EmailPreview email={email} headerSectionColor={headerSectionColor} />
			</div>
		</div>
	);
}

export default InvitePage;
