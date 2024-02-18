import { Body, Container, Hr, Html, Tailwind, Text, Section, Link, Img, Column } from "@react-email/components";
import EmailFooter from "./email-footer";
import EmailHeader from "./email-header";

type SignupTemplateProps = {
	websiteLogo: string | null;
	websiteName: string | null;
	websiteLink: string | null;
	supportEmail: string | null;
};

export function SignupTemplate({ websiteLogo, websiteName, supportEmail, websiteLink }: SignupTemplateProps) {
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
						<EmailHeader websiteLogo={websiteLogo} />
						<Section>
							<Text className="text-center font-sans text-2xl font-bold">{"You're Signed Up!"}</Text>
						</Section>
						<Section>
							<Text className="text-center font-sans">
								Thank you for joining the {websiteName ?? "[Product Name]"} waitlist!
							</Text>
							<Text className="text-center font-sans">
								We'll be sending out invites gradually so keep an eye on your inbox.
							</Text>
						</Section>
						<EmailFooter websiteLink={websiteLink} websiteName={websiteName} />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default SignupTemplate;
