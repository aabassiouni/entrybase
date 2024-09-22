import { Body, Html, Link, Section, Tailwind, Text } from "@react-email/components";
import { EmailContainer } from "../components/email-container";
import EmailFooter from "../components/email-footer";
import EmailHeader from "../components/email-header";

type InviteTemplateProps = {
  bodyText: string | null;
  header: string | null;
  websiteName: string | null;
  websiteLink: string | null;
  websiteLogo: string | null;
  supportEmail: string | null;
  brandColor: string | null;
};

export function InviteTemplate({
  bodyText,
  header,
  websiteName,
  websiteLogo,
  websiteLink,
  supportEmail,
  brandColor,
}: InviteTemplateProps) {
  return (
    <Html lang="en" className="">
      <Tailwind
        config={{
          darkMode: "class",
        }}
      >
        <Body className="mx-auto px-2">
          <EmailContainer>
            <EmailHeader brandColor={brandColor} websiteLogo={websiteLogo} />
            <Section className="px-4">
              <Text className="font-bold font-sans text-2xl">{header ? header : "Congrats! You're off the list!"}</Text>
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
                    <Link href={`mailto:${supportEmail}`}>{supportEmail ?? "[Suppport Email]"}.</Link>
                  </Text>
                </>
              )}
            </Section>
            <Section className="px-4">
              <Text className="font-sans">Thanks!</Text>
              <Text className="font-sans">The Entrybase Team</Text>
            </Section>
            <EmailFooter websiteLink={websiteLink} websiteName={websiteName} />
          </EmailContainer>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default InviteTemplate;
