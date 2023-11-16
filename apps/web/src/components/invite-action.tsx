import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

function InviteAction() {
	return (
		<div className="flex flex-col h-full items-center justify-center">
			<p className="inline-flex items-center gap-2 text-lg">
				Invite
				<Select defaultValue={"10"}>
					<SelectTrigger className="w-12 px-1 py-1">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="20">20</SelectItem>
						<SelectItem value="50">50</SelectItem>
					</SelectContent>
				</Select>
				signups off your waitlist
			</p>
			<Button size={"sm"} className=" font-medium dark:bg-primary">
				Invite
			</Button>
		</div>
	);
}

export default InviteAction;
