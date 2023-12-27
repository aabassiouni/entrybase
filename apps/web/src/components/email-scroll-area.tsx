"use client";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";

function EmailScrollArea({ invitedEmails }: { invitedEmails: string[] }) {
	const [search, setSearch] = React.useState<string>("");

	return (
		<div className="flex w-full flex-col items-center">
			<div className="flex w-full items-center justify-between gap-2 ">
				<p className="w-fit">Invited Users:</p>
				<Input onChange={(e)=>{
                    setSearch(e.target.value)
                }} placeholder="Search" className="w-40" />
			</div>
            <div className="p-2"></div>
			<ScrollArea className="h-40 px-2 py-1 bg-neutral-900 w-48 rounded-md text-sm">
				{invitedEmails.filter(email => email.includes(search)).map((email, index) => (
					<>
						<p key={index} className="w-full">
							{email}
						</p>
					</>
				))}
			</ScrollArea>
		</div>
	);
}

export default EmailScrollArea;
