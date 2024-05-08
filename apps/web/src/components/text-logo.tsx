import { cn } from "@/lib/utils";
import React from "react";

function TextLogo({ className }: { className?: string }) {
	return <h1 className={cn("text-center font-black font-clash-display text-4xl", className)}>entrybase</h1>;
}

export default TextLogo;
