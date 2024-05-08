import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

const clashDisplay = localFont({
	src: "../../fonts/ClashDisplay-Variable.ttf",
	display: "swap",
	variable: "--font-clash-display",
});

const clashGrotesk = localFont({
	src: "../../fonts/ClashGrotesk-Variable.ttf",
	display: "swap",
	variable: "--font-clash-grotesk",
});
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
					// clashGrotesk.className
					// biome-ignore lint/nursery/useSortedClasses: <explanation>
				} ${clashDisplay.variable} ${clashGrotesk.variable} flex h-screen bg-[#020705]`}
			>
				{children}
			</body>
		</html>
	);
}
