import EmailPreview from "@/components/email-preview";
import TemplateSelect from "@/components/template-select";
import { PageHeading } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { checkWorkspace } from "@/lib/auth";
import { getEmailTemplateForUser, setEmailTemplateForUser } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { InfoIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
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

  const templateValues = await getEmailTemplateForUser({
    waitlistID: params.waitlist,
    template: template,
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
    <div className="flex w-full flex-wrap">
      <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-10">
        <PageHeading className="gap-4">
          Email Preview
          {plan === "free" && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="rounded-full border border-zinc-800 bg-zinc-900 p-1">
                    <InfoIcon className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="w-52" side="bottom">
                  <p>Custom email templates are available in Pro Workspaces.</p>
                  <Link href={"/dashboard/new"} className="mx-auto text-center underline">
                    Upgrade Now
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </PageHeading>
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
      <div className="h-screen px-4 py-8 sm:w-1/2 sm:pr-10">
        <Suspense fallback={<Skeleton className="h-full" />}>
          <EmailPreview template={template} waitlistID={params.waitlist} />
        </Suspense>
      </div>
    </div>
  );
}

export default EmailPreviewPage;
