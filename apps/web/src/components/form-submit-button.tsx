"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function FormSubmitButton({
	loading,
	children,
	className,
	...props
}: { loading?: boolean; children: React.ReactNode; className?: string } & ButtonProps) {
	const { pending, action, data, method } = useFormStatus();
	return (
		<Button {...props} className={cn(className)} type="submit">
			{pending || loading ? <Loader2 className="animate-spin" /> : children}
		</Button>
	);
}

export default FormSubmitButton;
