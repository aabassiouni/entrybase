import { Button, Body, Container, Head, Hr, Html, Tailwind, Text, Section, Link, Img } from "@react-email/components";
import { EmailTemplateProps } from "@/types";

export function SignupTemplate() {
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
						<Section className={`h-fit pb-5 pt-10`}>
							<Img src="/sideprojectAI.png"></Img>
						</Section>
						<Section>
							<Text className="font-sans text-3xl font-bold">{"You're Signed Up!"}</Text>
						</Section>
						<Section>
							<Text>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quos? Harum
								recusandae, molestias ut necessitatibus cum quod eum aliquid rerum temporibus omnis non
								veniam quia eligendi repellendus autem quasi eveniet.
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
