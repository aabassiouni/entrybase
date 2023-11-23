import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailPreview from "@/components/email-preview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getEmailTemplateForUser, setEmailTemplateForUser } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FormSubmitButton from "@/components/form-submit-button";
import { currentUser } from "@clerk/nextjs";
import { PageHeading } from "@/components/typography";

async function EmailPreviewPage({ params }: { params: { waitlist: string } }) {
	const user = await currentUser();

	if (!user) return;

	const values = await getEmailTemplateForUser(params.waitlist, user.id);
	async function submitFormAction(formData: FormData) {
		"use server";
		console.log("submitting form");
		await setEmailTemplateForUser({
			waitlistID: params.waitlist,
			userID: user!.id,
			email: formData.get("email"),
			bodyText: formData.get("body"),
			sectionColor: formData.get("sectionColor"),
		});
		revalidatePath("/email-preview");
		console.log("submitted form");
	}

	return (
		<div className="flex w-full">
			<div className="w-1/2 p-10">
				<PageHeading>Email Preview</PageHeading>
				<div className="space-y-5">
					<form className="space-y-2" action={submitFormAction}>
						<div>
							<Label htmlFor="email">Subject</Label>
							<Input defaultValue={values[0]?.email} name="email" id="email" className="my-1 w-1/4" />
						</div>
						<div>
							<Label htmlFor="headerSelect">Header Color</Label>
							<Select defaultValue={values[0]?.sectionColor} name="sectionColor">
								<SelectTrigger id="headerSelect" className="w-1/4">
									<SelectValue placeholder="Header Section Color" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="bg-blue-800">blue</SelectItem>
									<SelectItem value="bg-red-800">red</SelectItem>
									<SelectItem value="bg-green-800">green</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="bodyText">Body</Label>
							<Textarea
								defaultValue={values[0]?.bodyText}
								name="body"
								id="bodyText"
								className="h-32 w-full"
							/>
						</div>
						<FormSubmitButton />
					</form>
				</div>
			</div>
			<div className="w-1/2 py-8 pr-10">
				<Suspense fallback={<Skeleton className="h-full" />}>
					<EmailPreview waitlistID={params.waitlist} />
				</Suspense>
			</div>
		</div>
	);
}

export default EmailPreviewPage;
