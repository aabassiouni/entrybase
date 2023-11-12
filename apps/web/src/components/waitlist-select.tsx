import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";

const data = [
	{
		id: 1,
		name: "Waitlist 1",
	},
	{
		id: 2,
		name: "Waitlist 2",
	},
	{
		id: 3,
		name: "Waitlist 3",
	},
	{
		id: 4,
		name: "Waitlist 4",
	},
];

function WaitlistSelect() {
	const defaultWaitlist = "Waitlist 1";
	return (
		<div className="w-full p-4 ">
			<Select defaultValue={defaultWaitlist}>
				<SelectTrigger className=" h-fit rounded-lg p-1.5">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent>
					{data.map((item) => (
						<SelectItem key={item.id} value={item.name}>
							{item.name}
						</SelectItem>
					))}
					<Separator className="my-0.5"/>
					<button className="relative flex w-full items-center py-1.5 pl-8 pr-2 text-sm outline-none rounded-sm hover:bg-neutral-800 focus:bg-neutral-100 focus:text-neutral-900 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
						<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
							<PlusCircledIcon className="h-4 w-4" />
						</span>
						Create Waitlist
					</button>
				</SelectContent>
			</Select>
		</div>
	);
}

export default WaitlistSelect;
