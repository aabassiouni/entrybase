"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FormSubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
	const { pending } = useFormStatus();
	return (
		<Button className={cn( className)} type="submit">
			{pending ? <Loader2 className="animate-spin" /> : children}
		</Button>
	);
}

export default FormSubmitButton;
