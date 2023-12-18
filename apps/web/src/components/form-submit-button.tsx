"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FormSubmitButton({loading, children, className }: {loading:boolean, children: React.ReactNode; className?: string }) {
	const { pending, action,data,method } = useFormStatus();
	// console.log({pending, action,data,method})
	return (
		<Button className={cn( className)} type="submit">
			{pending || loading ? <Loader2 className="animate-spin" /> : children}
		</Button>
	);
}

export default FormSubmitButton;
