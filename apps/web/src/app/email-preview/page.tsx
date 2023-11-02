import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailPreview from "@/components/email-preview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { setEmailTemplateForUser } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

function EmailPreviewPage() {
	async function submitFormAction(formData: FormData) {
		"use server";
		console.log(formData);
		await setEmailTemplateForUser({
			clerk_user_id: "test",
			email: formData.get("email"),
			bodyText: formData.get("body"),
			sectionColor: formData.get("sectionColor"),
		});
		revalidatePath("/email-preview2");
	}

	return (
		<div className="flex w-full px-4">
			<div className="w-1/2 p-8">
				<h1 className="text-3xl">Edit Invite Email</h1>
				<Separator className="my-4" />
				<div className="space-y-5">
					<form action={submitFormAction}>
						<div>
							<Label htmlFor="email">Subject</Label>
							<Input name="email" id="email" className="my-1 w-1/4" />
						</div>
						<div>
							<Label htmlFor="headerSelect">Header Color</Label>
							<Select name="sectionColor">
								<SelectTrigger id="headerSelect" className="w-fit">
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
							<Textarea name="body" id="bodyText" className="h-32 w-full" />
						</div>
						<Button type="submit">Submit</Button>
					</form>
				</div>
			</div>
			<div className="w-1/2">
				<div>
					<h1 className="py-8 text-center text-3xl">Invite Preview</h1>
				</div>
				<EmailPreview />
			</div>
		</div>
	);
}

export default EmailPreviewPage;
