import { Body, Container, Hr, Html, Tailwind, Text, Section, Link, Img, Column } from "@react-email/components";

type InviteTemplateProps = {
	bodyText: string | null;
	header: string | null;
	websiteName: string | null;
	websiteLink: string | null;
	websiteLogo: string | null;
	supportEmail: string | null;
};

export function InviteTemplate({
	bodyText,
	header,
	websiteName,
	websiteLogo,
	websiteLink,
	supportEmail,
}: InviteTemplateProps) {
	return (
		<Html lang="en" className="">
			<Tailwind
				config={{
					darkMode: "class",
				}}
			>
				{/* <Head><meta name="color-scheme" content="dark"/></Head> */}
				<Body className="mx-auto">
					<Container className=" bg- w-[465px] rounded border border-solid border-[#eaeaea] font-sans dark:bg-black">
						<Section className={`flex h-[150px] items-center justify-center rounded-t bg-[#4BE7AE]`}>
							<Column>
								<Text className="text-center text-3xl font-black">waitlister</Text>
							</Column>
							<Column>
								{websiteLogo && (
									<Img className=" max-h-[150px] max-w-[150px] object-contain" src={websiteLogo} />
								)}
							</Column>
						</Section>
						<Section>
							<Text className="font-sans text-3xl font-bold">
								{header ? header : "You're Signed Up!"}
							</Text>
							<Text className="font-sans">Hello [User's Name],</Text>
							{bodyText ? (
								<Text className="w-32 font-sans">{bodyText}</Text>
							) : (
								<>
									<Text className="font-sans">
										Thank you for signing up for {websiteName ?? "[Product Name]"}! You're now on
										our waitlist.
									</Text>
									<Text className="font-sans ">
										What's next?
										<Text>
											<ul className="font-sans text-sm">
												<li>
													We'll keep you updated on our progress and let you know as soon as&nbsp;
													{websiteName ?? "[Product Name]"} is ready.
												</li>
												<li>Look out for an email from us with early access details.</li>
											</ul>
										</Text>
										<Text className="font-sans">
											Questions or feedback? Reach out to {supportEmail ?? "[Support Email]"}.
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
								<Link href={"https://localhost:3000"} className="text-current underline">
									Waitlister
								</Link>
								&nbsp;on behalf of&nbsp;
								<Link href={websiteLink ?? ""} className="text-current underline">
									{websiteName ?? "[Website Name]"}
								</Link>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default InviteTemplate;
