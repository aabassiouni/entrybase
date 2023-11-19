"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import CreateWaitlistDialog from "../create-waitlist-dialog";

function WaitlistDropdown({
	waitlists,
	userID,
}: {
	waitlists: { waitlistID: string; waitlistName: string }[];
	userID: string;
}) {
	const router = useRouter();
	const params = useParams();
	const defaultWaitlist = params.waitlist as string;

	return (
		<div className="w-full p-4 ">
			<Select
				defaultValue={defaultWaitlist}
				onValueChange={(value) => {
					router.push(`/dashboard/${value}`);
				}}
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{waitlists.map((waitlist) => (
						<SelectItem key={waitlist.waitlistID} value={waitlist.waitlistID}>
							{waitlist.waitlistName}
						</SelectItem>
					))}
					<Separator className="my-0.5" />
					<CreateWaitlistDialog userID={userID}>
						<button className="relative flex w-full items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-neutral-800 focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
							<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
								<PlusCircledIcon className="h-4 w-4" />
							</span>
							Create Waitlist
						</button>
					</CreateWaitlistDialog>
				</SelectContent>
			</Select>
		</div>
	);
}

export default WaitlistDropdown;
