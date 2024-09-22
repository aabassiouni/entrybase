import { Heading, Img, Section, Text } from "@react-email/components";
import { Email } from "../components/email";
import { EmailContainer } from "../components/email-container";
import EmailHeader from "../components/email-header";

export function ExportTemplate() {
  const brandColor = "#4BE7AE";
  const websiteLogo = "/static/entrybase.png";

  return (
    <Email>
      <EmailContainer>
        <EmailHeader brandColor={brandColor} websiteLogo={websiteLogo} />
        <Heading as="h2" className="text-center">
          Your Signup data is ready!
        </Heading>
        <Text className="text-center font-sans">Find your exported signups file in this email for easy access.</Text>
        <Section className="text-center">
          <table className="w-full">
            <tr className="w-full">
              <td align="center">
                <Text className="my-[8px] font-semibold text-[16px] text-gray-900 leading-[24px]">Entrybase</Text>
              </td>
            </tr>
          </table>
        </Section>
      </EmailContainer>
    </Email>
  );
}
export default ExportTemplate;
