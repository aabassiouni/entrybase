import * as React from "react";

import { Button, Body, Container, Head, Hr, Html, Tailwind, Text, Section, Link } from "@react-email/components";

export function EmailTemplate({ email, headerSectionColor }: { email: string, headerSectionColor: string }) {
	return (
		<Tailwind
			config={{
				darkMode: "media",

			}}
		>
			<Html lang="en" className="">
				<Head>
					{/* <meta */}
					<meta name="color-scheme" content="dark"></meta>
				</Head>
				<Body className="dark:bg-black">
					<Container className="font-sans">
						<Section className={`h-36 ${headerSectionColor}`}>
							<Text className="text-center font-sans text-3xl text-white">Company Name {email}</Text>
						</Section>
						<Section>
							<Text className="font-sans text-xl">Hello!</Text>
							<Text className="font-sans">
								You're in! Head over to waitlister.com to setup your account.
							</Text>
							<Button className="inline-flex h-4 items-center justify-center rounded-md  bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 ring-offset-white transition-colors   dark:ring-offset-neutral-950  hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90">
								Sign Up
							</Button>
							<Text className="font-sans">
								If you have any issues or concerns, please contact our support team at
								aabassiouni@gmail.com.!
							</Text>
						</Section>
						<Section>
							<Text className="font-sans">Thanks!</Text>
							<Text className="font-sans">The Waitlister Team</Text>
						</Section>
						<Section className="h-24">
							<Hr />
							<Text className="text-center font-sans text-sm text-slate-400">
								Sent by <Link className="text-current underline">Waitlister</Link> on behalf{" "}
							</Text>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}

export default EmailTemplate;
