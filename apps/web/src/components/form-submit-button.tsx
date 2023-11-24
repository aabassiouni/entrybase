"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function FormSubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button className="w-20 dark:bg-primary dark:hover:bg-primary/80" type="submit">
			{pending ? <Loader2 className="animate-spin" /> : "Submit"}
		</Button>
	);
}

export default FormSubmitButton;
