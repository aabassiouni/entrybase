import { Body, Container, Html, Section, Tailwind, Text } from "@react-email/components";
import EmailFooter from "./email-footer";
import EmailHeader from "./email-header";

type SignupTemplateProps = {
  websiteLogo: string | null;
  websiteName: string | null;
  websiteLink: string | null;
  supportEmail: string | null;
  brandColor: string | null;
};

export function SignupTemplate({ websiteLogo, websiteName, websiteLink, brandColor }: SignupTemplateProps) {
  return (
    <Html lang="en" className="">
      <Tailwind
        config={{
          darkMode: "class",
        }}
      >
        {/* <Head><meta name="color-scheme" content="dark"/></Head> */}
        <Body className="mx-auto">
          <Container className="bg- w-[465px] rounded border border-[#eaeaea] border-solid font-sans dark:bg-black">
            <EmailHeader brandColor={brandColor} websiteLogo={websiteLogo} />
            <Section>
              <Text className="text-center font-bold font-sans text-2xl">{"You're Signed Up!"}</Text>
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
