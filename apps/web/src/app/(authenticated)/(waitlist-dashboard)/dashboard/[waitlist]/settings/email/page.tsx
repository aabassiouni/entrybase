import EmailSwitch from "@/components/email-switch";
import { EmptyComponent, EmptyComponentDescription, EmptyComponentTitle } from "@/components/empty-component";
import FormSubmitButton from "@/components/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import UploadButtonContent from "@/components/upload-button";
import { checkWorkspace } from "@/lib/auth";
import {
	getWaitlistEmailSettings,
	getWaitlistLogoURL,
	getWaitlistWebsiteDetails,
	updateWaitlistEmailSettings,
	updateWaitlistWebstiteDetails,
} from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import React from "react";

async function EmailSettings({ params }: { params: { waitlist: string } }) {
	const workspace = await checkWorkspace();
	if (!workspace) {
		return notFound();
	}

	const settings = await getWaitlistEmailSettings(params.waitlist).then((res) => res[0]);
	const websiteDetails = await getWaitlistWebsiteDetails(params.waitlist);

	async function updateWebsiteDetails(formData: FormData) {
		"use server";

		console.log("updating website details");
		const { userId } = auth();
		if (!userId) return;

		const workspace = await checkWorkspace(params.waitlist);
		if (!workspace) redirect("/");

		const websiteName = formData.get("websiteName") === "" ? null : (formData.get("websiteName") as string);
		const websiteLink = formData.get("websiteLink") === "" ? null : (formData.get("websiteLink") as string);
		const supportEmail = formData.get("supportEmail") === "" ? null : (formData.get("supportEmail") as string);

		await updateWaitlistWebstiteDetails({
			waitlistID: params.waitlist,
			websiteName: websiteName,
			websiteLink: websiteLink,
			supportEmail: supportEmail,
		});
	}
	async function updateEmailSettingsAction(value: boolean, type: "signup" | "invite") {
		"use server";

		const { userId } = auth();
		if (!userId) return;

		const workspace = await checkWorkspace(params.waitlist);
		if (!workspace) redirect("/");

		const currSettings = await getWaitlistEmailSettings(params.waitlist).then((res) => res[0]);
		currSettings.emailSettings[type] = value;

		await updateWaitlistEmailSettings(params.waitlist, userId, currSettings.emailSettings);
	}

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Email Settings</CardTitle>
				<CardDescription>
					Choose whether to enable or disable sending emails to signups and invites
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<EmailSwitch settings={settings.emailSettings} action={updateEmailSettingsAction} />
			</CardContent>
			<Separator />
			<CardHeader>
				<CardTitle>Email Settings</CardTitle>
				<CardDescription>
					Choose whether to enable or disable sending emails to signups and invites
				</CardDescription>
			</CardHeader>
			<CardContent className="flex gap-4 ">
				<div className="flex basis-1/2 flex-col items-center gap-4">
					<div>
						<p className="text-center text-2xl font-bold text-[#D3FDEE] ">Upload your logo</p>
						<p className=" text-sm text-neutral-500 ">
							Logos will be displayed at a max size of 150px x 150px
						</p>
					</div>
					<div className="relative flex h-72 w-full items-center justify-center rounded border border-neutral-900 ">
						{websiteDetails?.logoFileURL ? (
							<div className="flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-white ">
								<Image
									unoptimized
									src={websiteDetails.logoFileURL}
									className="max-h-[150px] max-w-[150px]  object-contain "
									width={150}
									height={150}
									alt=""
								/>
							</div>
						) : (
							<EmptyComponent>
								<EmptyComponentTitle>No Logo Uploaded</EmptyComponentTitle>
								<EmptyComponentDescription>
									Upload your logo by clicking the button below
								</EmptyComponentDescription>
							</EmptyComponent>
						)}
					</div>
					<UploadButtonContent />
				</div>
				<Separator orientation="vertical" />
				<div className="flex basis-1/2 flex-col items-center gap-4">
					<div>
						<p className="text-center text-2xl font-bold  ">Website Details</p>
						<p className=" text-center text-sm text-neutral-500 ">Add your website name and links here</p>
					</div>
					<form action={updateWebsiteDetails}>
						<div className="flex flex-col items-start gap-4 self-start">
							<div className="items-center gap-2">
								<Label className=" ">Website Name</Label>
								<Input
									type="text"
									className="rounded border border-[#002417] bg-black p-1 px-2"
									placeholder="Website Name"
									defaultValue={websiteDetails?.websiteName ?? ""}
									name="websiteName"
								/>
							</div>
							<div className=" items-center gap-2">
								<Label className=" ">Website Link</Label>
								<Input
									type="url"
									className="rounded border border-[#002417] bg-black p-1 px-2"
									placeholder="Website Link"
									defaultValue={websiteDetails?.websiteLink ?? ""}
									name="websiteLink"
								/>
							</div>
							<div className=" items-center gap-2">
								<Label className=" ">Support Email</Label>
								<Input
									type="email"
									className="rounded border border-[#002417] bg-black p-1 px-2"
									placeholder="Support Email"
									defaultValue={websiteDetails?.supportEmail ?? ""}
									name="supportEmail"
								/>
							</div>
							<FormSubmitButton type="submit" className="w-full rounded bg-primary p-2 px-4 text-white">
								Save
							</FormSubmitButton>
							<Button variant={"outline"} className="w-full">
								Reset Values
							</Button>
						</div>
					</form>
				</div>
			</CardContent>
		</Card>
	);
}

export default EmailSettings;
