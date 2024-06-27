import { cn } from "@/lib/utils";
import React from "react";
import { EntrybaseLogo } from "./icons/entrybase-logo";

function TextLogo({ className, iconColor }: { className?: string; iconColor?: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <EntrybaseLogo size={24} fill={iconColor} />
      <h1 className={cn("text-center font-black font-clash-display text-4xl", className)}>entrybase</h1>
    </div>
  );
}

export default TextLogo;
