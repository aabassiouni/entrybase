import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Entrybase",
	description: "Open source waitlist management and analytics platform",
};

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${
					inter.className
					// biome-ignore lint/nursery/useSortedClasses: <explanation>
				} flex h-screen bg-[#020705]`}
			>
				{children}
			</body>
		</html>
	);
}
