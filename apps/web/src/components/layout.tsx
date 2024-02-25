import React from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
	return <main className="flex min-h-screen w-full flex-col p-4 sm:p-10 overflow-y-scroll">{children}</main>;
}
