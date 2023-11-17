// "use client";
import { Card } from "@/components/ui/card";
import EmailTemplate from "./email/template";
import { renderAsync } from "@react-email/components";
import { getEmailTemplateForUser } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

async function EmailPreview() {
	// const [html, setHtml] = useState("");
	const user = await currentUser();
	if (!user) return;

	const values = await getEmailTemplateForUser(user.id);
	const html = await renderAsync(
		<EmailTemplate
			bodyText={values[0].body_text}
			email={values[0].email}
			headerSectionColor={values[0].section_color}
		/>,
	);

	return (
		<Card className="h-full flex flex-col">
			<div className="max-h-40 h-40 rounded-t-lg bg-neutral-800 space-y-1 p-8">
				<p>From: x@gmail.com</p>
				<p>To: y@gmail.com</p>
				<p>Subject: You're off the waitlist! </p>
			</div>
			<div className="h-full w-full p-4 ">
				<iframe  className="h-full w-full" srcDoc={html} />
			</div>
		</Card>
	);
}

export default EmailPreview;
