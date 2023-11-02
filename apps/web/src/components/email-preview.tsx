// "use client";
import { Card } from "@/components/ui/card";
import EmailTemplate from "./email/template";
import { renderAsync } from "@react-email/components";
import { EmailTemplateProps } from "@/types";
import { getEmailTemplateForUser } from "@/lib/db";

async function EmailPreview2() {
	// const [html, setHtml] = useState("");

	const values = await getEmailTemplateForUser();
	const html = await renderAsync(
		<EmailTemplate
			bodyText={values[0].body_text}
			email={values[0].email}
			headerSectionColor={values[0].section_color}
		/>,
	);

	return (
		<Card className="h-[calc(100vh_-_150px)] p-2">
			<iframe className="h-full w-full  p-4" srcDoc={html} />
		</Card>
	);
}

export default EmailPreview2;
