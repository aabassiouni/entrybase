import EmailPreview from "@/components/email-preview";
import { getEmailTemplateForUser, setEmailTemplateForUser } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { auth, currentUser } from "@clerk/nextjs";
import { PageHeading } from "@/components/typography";
import TemplateSelect from "@/components/template-select";
import { checkWorkspace } from "@/lib/auth";
import TemplateForm from "./template-form";

async function EmailPreviewPage({
	params,
	searchParams,
}: {
	params: { waitlist: string };
	searchParams: { template: "invite" | "signup" };
}) {
	const workspace = await checkWorkspace(params.waitlist);

	const user = await currentUser();

	if (!user) return;

	const plan = workspace?.plan;
	const disabled = plan !== "pro";
	const template = searchParams?.template ?? "invite";

	const templateValues = await getEmailTemplateForUser(params.waitlist, user.id, template).then((res) => {
		return {
			subject: res[0]?.subject,
			bodyText: res[0]?.bodyText,
			header: res[0]?.header,
		};
	});

	async function submitEmailTemplate(values: {
		subject: string | null;
		bodyText: string | null;
		header: string | null;
	}) {
		"use server";

		console.log("template", template);
		console.log("submitting", values);

		const user = auth();
		if (!user.userId) {
			throw new Error("No user found");
		}

		const subject = values.subject === "" ? null : values.subject;
		const bodyText = values.bodyText === "" ? null : values.bodyText;
		const header = values.header === "" ? null : values.header;

		await setEmailTemplateForUser({
			waitlistID: params.waitlist,
			template: template,
			subject: subject,
			bodyText: bodyText,
			header: header,
		});
		revalidatePath("/email-preview");
	}

	async function clearEmailTemplate() {
		"use server";
		console.log("clearing template");
		if (!user!.id) return;

		await setEmailTemplateForUser({
			waitlistID: params.waitlist,
			template: template,
			subject: null,
			bodyText: null,
			header: null,
		});
		revalidatePath("/email-preview");
	}

	return (
		<div className="flex w-full">
			<div className="flex w-1/2 flex-col p-10">
				<PageHeading>Email Preview</PageHeading>
				<TemplateSelect waitlistID={params.waitlist} />
				<div className="space-y-2">
					<TemplateForm
						disabled={disabled}
						initialValues={templateValues}
						submitAction={submitEmailTemplate}
						clearAction={clearEmailTemplate}
					/>
				</div>
			</div>
			<div className="w-1/2 py-8 pr-10">
				<Suspense fallback={<Skeleton className="h-full" />}>
					<EmailPreview template={template} waitlistID={params.waitlist} />
				</Suspense>
			</div>
		</div>
	);
}

export default EmailPreviewPage;
