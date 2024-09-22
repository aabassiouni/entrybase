import { Hr, Link, Section, Text } from "@react-email/components";

function EmailFooter({ websiteLink, websiteName }: { websiteLink: string | null; websiteName: string | null }) {
  return (
    <Section className="h-24">
      <Hr />
      <Text className="text-center font-sans text-slate-400 text-sm">
        Sent by&nbsp;
        <Link href={"https://localhost:3000"} className="text-current underline">
          Entrybase
        </Link>
        &nbsp;on behalf of&nbsp;
        <Link href={websiteLink ?? ""} className="text-current underline">
          {websiteName ?? "[Website Name]"}
        </Link>
      </Text>
    </Section>
  );
}

export default EmailFooter;
