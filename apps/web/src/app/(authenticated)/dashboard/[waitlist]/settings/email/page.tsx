import EmailSwitch from "@/components/email-switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getWaitlistEmailSettings, updateWaitlistEmailSettings } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
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
		</Card>
	);
}

export default EmailSettings;
