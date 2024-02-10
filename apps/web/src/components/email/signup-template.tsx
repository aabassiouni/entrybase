import { Body, Container, Hr, Html, Tailwind, Text, Section, Link, Img, Column } from "@react-email/components";

type SignupTemplateProps = {
	companyLogo: string | null;
};

export function SignupTemplate({ companyLogo }: SignupTemplateProps) {
	return (
		<Html lang="en" className="">
			<Tailwind
				config={{
					darkMode: "class",
				}}
			>
				{/* <Head><meta name="color-scheme" content="dark"/></Head> */}
				<Body className="mx-auto">
					<Container className=" bg- w-[465px] rounded border border-solid border-[#eaeaea] p-5 font-sans dark:bg-black">
						<Section className={`flex h-[150px]  items-center justify-center bg-[#4BE7AE]`}>
							<Column>
								<Text className="text-center text-3xl font-black">waitlister</Text>
							</Column>
							<Column>
								{companyLogo && (
									<Img className=" max-h-[150px] max-w-[150px] object-contain" src={companyLogo} />
								)}
							</Column>
						</Section>
						<Section>
							<Text className="text-center font-sans text-2xl font-bold">{"You're Signed Up!"}</Text>
						</Section>
						<Section>
							<Text className="text-center font-sans">
								Thank you for joining the [Product Name] waitlist!
							</Text>
							<Text className="text-center font-sans">
								We'll be sending out invites gradually so keep an eye on your inbox.
							</Text>
						</Section>
						<Section className="h-24">
							<Hr />
							<Text className="text-center font-sans text-sm text-slate-400">
								Sent by&nbsp;
								<Link href="" className="text-current underline">
									Waitlister
								</Link>
								{/* &nbsp;on behalf of {companyWebsite ? companyWebsite : "[Company Website]"} */}
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default SignupTemplate;
