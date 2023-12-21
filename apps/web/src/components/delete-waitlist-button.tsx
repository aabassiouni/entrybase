"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function DeleteWaitlistButton({ waitlistName }: { waitlistName: string }) {
	const { pending } = useFormStatus();

	const [disabled, setDisabled] = React.useState(true);

	return (
		<>
			<Input
				autoComplete="off"
				onChange={(event) => {
					if (event.target.value === waitlistName) {
						setDisabled(false);
					} else {
						setDisabled(true);
					}
				}}
				name="waitlistID"
			/>
			<Button disabled={disabled} variant={"destructive"} className="">
				{pending ? <Loader2 className="animate-spin" /> : "Delete"}
			</Button>
		</>
	);
}

export default DeleteWaitlistButton;
