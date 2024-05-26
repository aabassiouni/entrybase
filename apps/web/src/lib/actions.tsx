"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { checkWorkspace } from "./auth";
import { createWaitlist, deleteSignupById, initEmailTemplates } from "./db";
import { notifyDiscord } from "./discord";

export async function handleDelete(formData: FormData) {
  const id = formData.get("id") as string;

  await deleteSignupById(id);

  revalidatePath("/");
  revalidatePath("/users");
}

export async function createWaitlistAction(formData: FormData) {
  const workspace = await checkWorkspace();
  if (!workspace) {
    return notFound();
  }

  const waitlistName = formData.get("waitlistName") as string;

  const [{ waitlistID }] = await createWaitlist(waitlistName, workspace.workspaceID);

  await initEmailTemplates(waitlistID);
  await notifyDiscord({
    waitlist: waitlistID,
  });
  redirect(`/dashboard/${waitlistID}`);
}
