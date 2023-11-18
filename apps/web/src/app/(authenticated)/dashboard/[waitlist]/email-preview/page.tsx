import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailPreview from "@/components/email-preview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getEmailTemplateForUser, setEmailTemplateForUser } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitEmailTemplateButton from "@/components/submit-email-template-button";
import { currentUser } from "@clerk/nextjs";

async function EmailPreviewPage() {
	const user = await currentUser();

	if (!user) return;

	const values = await getEmailTemplateForUser(user.id);

	async function submitFormAction(formData: FormData) {
		"use server";
		if (!user) return;
		await setEmailTemplateForUser({
			clerk_user_id: user.id,
			email: formData.get("email"),
			bodyText: formData.get("body"),
			sectionColor: formData.get("sectionColor"),
		});
		revalidatePath("/email-preview");
	}

	return (
		<div className="flex w-full px-4">
			<div className="w-1/2 p-8">
				<h1 className="text-3xl font-bold">Customize Email</h1>
				<Separator className="my-4" />
				<div className="space-y-5">
					<form className="space-y-2" action={submitFormAction}>
						<div>
							<Label htmlFor="email">Subject</Label>
							<Input defaultValue={values[0].email} name="email" id="email" className="my-1 w-1/4" />
						</div>
						<div>
							<Label htmlFor="headerSelect">Header Color</Label>
							<Select defaultValue={values[0].section_color} name="sectionColor">
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
								defaultValue={values[0].body_text}
								name="body"
								id="bodyText"
								className="h-32 w-full"
							/>
						</div>
						<SubmitEmailTemplateButton />
					</form>
				</div>
			</div>
			<div className="w-1/2 py-8">
				<Suspense fallback={<Skeleton className="h-full" />}>
					<EmailPreview />
				</Suspense>
			</div>
		</div>
	);
}

export default EmailPreviewPage;
