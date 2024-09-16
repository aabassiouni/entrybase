import { CopyButton } from "@/components/copy-button";
import DeleteWaitlistDialog from "@/components/delete-waitlist-dialog";
import FormSubmitButton from "@/components/form-submit-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getWaitlistByID, updateWaitlistByID } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import React from "react";

async function WaitlistSettingsPage({ params }: { params: { waitlist: string } }) {
  // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  // await sleep(3000);

  const waitlist = await getWaitlistByID(params.waitlist);

  async function updateWaitlistName(formData: FormData) {
    "use server";

    const { userId } = auth();
    if (!userId) return;

    const waitlistName = formData.get("waitlistName") as string;

    if (!waitlistName) {
      return;
    }

    await updateWaitlistByID(params.waitlist, waitlistName);

    revalidatePath("/dashboard");
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Waitlist ID</CardTitle>
        <CardDescription>This is your waitlist ID.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="inline-flex h-10 w-80 items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-neutral-500 hover:ring-2 hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:placeholder:text-neutral-400">
          {params.waitlist}
          <CopyButton value={params.waitlist} />
        </div>
      </CardContent>
      <Separator />
      <CardHeader>
        <CardTitle>Waitlist Name</CardTitle>
        <CardDescription>This can be changed at any time.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="inline-flex gap-4" action={updateWaitlistName}>
          <Input
            className="w-80 dark:focus-visible:ring-primary"
            name="waitlistName"
            defaultValue={waitlist?.waitlistName}
          />
          <FormSubmitButton>Update</FormSubmitButton>
        </form>
      </CardContent>
      <Separator />
      <CardHeader>
        <CardTitle>Delete Waitlist</CardTitle>
        <CardDescription>Remove this waitlist and all associated data</CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteWaitlistDialog waitlistID={params.waitlist} />
      </CardContent>
    </Card>
  );
}

export default WaitlistSettingsPage;
