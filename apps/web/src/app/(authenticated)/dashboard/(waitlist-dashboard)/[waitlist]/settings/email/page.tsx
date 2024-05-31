import EmailSwitch from "@/components/email-switch";
import { EmptyComponent, EmptyComponentDescription, EmptyComponentTitle } from "@/components/empty-component";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UploadButtonContent from "@/components/upload-button";
import { checkWorkspace } from "@/lib/auth";
import {
  getWaitlistEmailSettings,
  getWaitlistWebsiteDetails,
  updateWaitlistEmailSettings,
  updateWaitlistWebsiteDetails,
} from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import WebsiteDetailsForm from "./website-details-form";

async function EmailSettings({ params }: { params: { waitlist: string } }) {
  const workspace = await checkWorkspace();
  if (!workspace) {
    return notFound();
  }

  const settings = await getWaitlistEmailSettings(params.waitlist).then((res) => res[0]);
  const websiteDetails = await getWaitlistWebsiteDetails(params.waitlist);

  async function updateWebsiteDetails({
    websiteLink,
    brandColor,
    supportEmail,
    websiteName,
  }: {
    websiteName: string | null;
    websiteLink: string | null;
    supportEmail: string | null;
    brandColor: string | null;
  }) {
    "use server";

    console.log("updating website details using ", {
      websiteName,
      websiteLink,
      supportEmail,
      brandColor,
    });
    const { userId } = auth();
    if (!userId) return;

    const workspace = await checkWorkspace(params.waitlist);
    if (!workspace) redirect("/");

    await updateWaitlistWebsiteDetails({
      waitlistID: params.waitlist,
      websiteName: websiteName,
      websiteLink: websiteLink,
      supportEmail: supportEmail,
      brandColor: brandColor,
    });
    revalidatePath("/email-preview");
    revalidatePath("settings/email");
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
        <CardDescription>Choose whether to enable or disable sending emails to signups and invites</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <EmailSwitch settings={settings.emailSettings} action={updateEmailSettingsAction} />
      </CardContent>
      <Separator />
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>Choose whether to enable or disable sending emails to signups and invites</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex basis-1/2 flex-col items-center gap-4">
          <div>
            <p className="text-center font-bold text-2xl text-[#D3FDEE]">Upload your logo</p>
            <p className="text-neutral-500 text-sm">Logos will be displayed at a max size of 150px x 150px</p>
          </div>
          <div className="relative flex h-72 w-full items-center justify-center rounded border border-neutral-900">
            {websiteDetails?.logoFileURL ? (
              <div className="flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-white">
                <Image
                  unoptimized
                  src={websiteDetails.logoFileURL}
                  className="max-h-[150px] max-w-[150px] object-contain"
                  width={150}
                  height={150}
                  alt=""
                />
              </div>
            ) : (
              <EmptyComponent>
                <EmptyComponentTitle>No Logo Uploaded</EmptyComponentTitle>
                <EmptyComponentDescription>Upload your logo by clicking the button below</EmptyComponentDescription>
              </EmptyComponent>
            )}
          </div>
          <UploadButtonContent />
        </div>
        <Separator orientation="vertical" />
        <WebsiteDetailsForm action={updateWebsiteDetails} websiteDetails={websiteDetails} />
      </CardContent>
    </Card>
  );
}

export default EmailSettings;
