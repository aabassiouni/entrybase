import EmailSwitch from "@/components/email-switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import UploadButtonContent from "@/components/upload-button";
import { getWaitlistEmailSettings, getWaitlistLogoURL, updateWaitlistEmailSettings } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

async function EmailSettings({ params }: { params: { waitlist: string } }) {
	const user = await currentUser();
	if (!user) return null;

	const settings = await getWaitlistEmailSettings(params.waitlist, user.id).then((res) => res[0]);

	async function updateEmailSettingsAction(value: boolean, type: "signup" | "invite") {
		"use server";

		const { userId } = auth();
		if (!userId) return;

		const currSettings = await getWaitlistEmailSettings(params.waitlist, userId).then((res) => res[0]);
		currSettings.emailSettings[type] = value;

		await updateWaitlistEmailSettings(params.waitlist, userId, currSettings.emailSettings);
	}

	const logoFileURL = await getWaitlistLogoURL(params.waitlist);

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
						{logoFileURL ? (
							<div className="flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-white ">
								<Image
									unoptimized
									src={logoFileURL}
									className="max-h-[150px] max-w-[150px]  object-contain "
									width={150}
									height={150}
									alt=""
								/>
							</div>
						) : (
							<div className="flex h-full items-center justify-center">
								<div className="rounded border border-primary p-4">
									<p>No Logo Uploaded</p>
								</div>
							</div>
						)}
					</div>
					<UploadButtonContent />
				</div>
				<Separator orientation="vertical" />
				<div className="flex basis-1/2 flex-col items-center">
					<div>
						<p className="text-center text-2xl font-bold  ">Website Details</p>
						<p className=" text-center text-sm text-neutral-500 ">Add your website name and links here</p>
					</div>
					<div className="flex flex-col items-start gap-4 self-start">
						<div className="items-center gap-2">
							<Label className=" ">Website Name</Label>
							<Input
								type="text"
								className="w-40 rounded border border-[#002417] bg-black p-1 px-2"
								placeholder="Website Name"
							/>
						</div>
						<div className=" items-center gap-2">
							<Label className=" ">Website Link</Label>
							<Input
								type="text"
								className="w-40 rounded border border-[#002417] bg-black p-1 px-2"
								placeholder="Website Link"
							/>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default EmailSettings;
