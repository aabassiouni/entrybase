import { Body, Container, Hr, Html, Tailwind, Text, Section, Link, Img, Column } from "@react-email/components";
import EmailFooter from "./email-footer";

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
							{/* <Column>
								<Text className="text-center text-3xl font-black">waitlister</Text>
							</Column> */}
							<Column>
								{websiteLogo && (
									<Img className=" max-h-[150px] max-w-[150px] object-contain" src={websiteLogo} />
								)}
							</Column>
						</Section>
						<Section className="px-4">
							<Text className="font-sans text-2xl font-bold">
								{header ? header : "Congrats! You're off the list!"}
							</Text>
							{bodyText ? (
								<Text className="w-32 font-sans">{bodyText}</Text>
							) : (
								<>
									<Text className="font-sans">
										Head over to&nbsp;
										<Link href={websiteLink ?? ""} className="text-current underline">
											{websiteName ?? "[Website Name]"}
										</Link>
										&nbsp;to get started.
									</Text>
									<Text>
										Questions or feedback? Please reach out to&nbsp;
										<Link href={`mailto:${supportEmail}`}>
											{supportEmail ?? "[Suppport Email]"}.
										</Link>
									</Text>
								</>
							)}
						</Section>
						<Section className="px-4">
							<Text className="font-sans">Thanks!</Text>
							<Text className="font-sans">The Waitlister Team</Text>
						</Section>
						<EmailFooter websiteLink={websiteLink} websiteName={websiteName} />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default InviteTemplate;
