import { Card } from "@/components/ui/card";
import InviteTemplate from "./email/invite-template";
import { renderAsync } from "@react-email/components";
import { getEmailTemplateForUser, getWaitlistLogoURL, getWaitlistWebsiteDetails } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import SignupTemplate from "./email/signup-template";
import { sanitize } from "isomorphic-dompurify";

async function EmailPreview({ waitlistID, template }: { waitlistID: string; template: "invite" | "signup" }) {
	const user = await currentUser();
	if (!user) return;

	const { bodyText, header, subject } = await getEmailTemplateForUser({
		waitlistID,
		template
	})

	const { logoFileURL, supportEmail, websiteLink, websiteName } = await getWaitlistWebsiteDetails(waitlistID);

	const sanitizedBodyText = sanitize(bodyText!);
	const sanitizedHeader = sanitize(header!);

	const defaultSignupSubject = `You're on the waitlist for ${websiteName ?? "[Company]"}! `;
	const defaultInviteSubject = `You're invited to join ${websiteName ?? "[Company]"}! `;

	const Template =
		template === "invite" ? (
			<InviteTemplate
				bodyText={sanitizedBodyText}
				header={sanitizedHeader}
				websiteLogo={logoFileURL}
				websiteName={websiteName}
				websiteLink={websiteLink}
				supportEmail={supportEmail}
			/>
		) : (
			<SignupTemplate
				websiteLogo={logoFileURL}
				websiteName={websiteName}
				websiteLink={websiteLink}
				supportEmail={supportEmail}
			/>
		);

	const html = await renderAsync(Template);
	return (
		<Card className="flex h-full flex-col">
			<div className="flex h-40 max-h-40 items-center justify-between space-y-1 rounded-t-lg bg-gradient-to-b from-primary/40 to-black p-8 ">
				<div className="w-full space-y-2">
					<div className="flex w-full items-center text-sm">
						<p className="w-20 rounded-l-md border-b border-l border-t border-neutral-800 bg-neutral-900 p-1 px-2">
							From:
						</p>
						<span className="w-full rounded-r-md border border-[#002417] bg-black p-1 px-2">
							x@gmail.com
						</span>
					</div>
					<div className="flex  items-center  text-sm">
						<p className="w-20 rounded-l-md border-b border-l border-t border-neutral-800 bg-neutral-900 p-1 px-2">
							To:
						</p>
						<span className="w-full rounded-r-md border border-[#002417] bg-black p-1 px-2">
							x@gmail.com
						</span>
					</div>
					<div className="flex items-center text-sm">
						<p className="w-20  rounded-l-md border-b border-l border-t border-neutral-800 bg-neutral-900 p-1 px-2">
							Subject:
						</p>
						<span className="w-full rounded-r-md border-y border-r border-[#002417] bg-black p-1 px-2">
							{subject !== null
								? subject
								: template === "invite"
									? defaultInviteSubject
									: defaultSignupSubject}
						</span>
					</div>
				</div>
			</div>
			<div className="h-full w-full p-4 ">
				<iframe loading="eager" className="h-full w-full rounded-lg" srcDoc={html} />
			</div>
		</Card>
	);
}

export default EmailPreview;
