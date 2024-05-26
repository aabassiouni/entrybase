import { cn } from "@/lib/utils";
import type React from "react";

export function EmptyComponent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full w-full flex-1 items-center justify-center", className)}>
      <div className="flex h-1/2 w-1/2 flex-col items-center justify-center gap-4 rounded-md border border-primary bg-neutral-900 p-4">
        {children}
      </div>
    </div>
  );
}

export function EmptyComponentTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-center font-medium text-lg">{children}</p>;
}

export function EmptyComponentDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-balance text-center text-neutral-400">{children}</p>;
}
