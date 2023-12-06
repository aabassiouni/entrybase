import * as React from "react";

import { Button, Body, Container, Head, Hr, Html, Tailwind, Text, Section, Link, Img } from "@react-email/components";
import { EmailTemplateProps } from "@/types";

export function EmailTemplate({ bodyText, header, companyWebsite }: EmailTemplateProps) {
	return (
		<Html lang="en" className="">
			<Head>{/* <meta name="color-scheme" content="dark"></meta> */}</Head>
			<Tailwind
				config={{
					darkMode: "class",
				}}
			>
				<Body className="mx-auto bg-white">
					<Container className="w-[465px] rounded border border-solid border-[#eaeaea] p-5 font-sans">
						<Section className={`h-fit pb-5 pt-10`}>
							<Img src="/sideprojectAI.png"></Img>
						</Section>
						<Section className="">
							{/* <Text className="font-sans">
								{bodyText ? bodyText : "You're in! Head over to waitlister.com to setup your account."}
							</Text> */}
							<Text className="font-sans text-3xl font-bold">
								{header ? header : "You're Signed Up!"}
							</Text>
							<Text className="font-sans">Hello [User's Name],</Text>
							{bodyText ? (
								<Text className="w-32 font-sans">{bodyText}</Text>
							) : (
								<>
									<Text className="font-sans">
										Thank you for signing up for [Product Name]! You're now on our waitlist.
									</Text>
									<Text className="font-sans ">
										What's next?
										<Text>
											<ul className="font-sans text-sm">
												<li>
													We'll keep you updated on our progress and let you know as soon as
													[Product Name] is ready.
												</li>
												<li>Look out for an email from us with early access details.</li>
											</ul>
										</Text>
										<Text className="font-sans">
											Questions or feedback? Reach out to [Support Email].
										</Text>
									</Text>
								</>
							)}
						</Section>
						<Section>
							<Text className="font-sans">Thanks!</Text>
							<Text className="font-sans">The Waitlister Team</Text>
						</Section>
						<Section className="h-24">
							<Hr />
							<Text className="text-center font-sans text-sm text-slate-400">
								Sent by&nbsp;
								<Link href="" className="text-current underline">
									Waitlister
								</Link>
								&nbsp;on behalf of {companyWebsite ? companyWebsite : "[Company Website]"}
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default EmailTemplate;
