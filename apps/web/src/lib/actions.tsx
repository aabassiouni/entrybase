"use server";

import { revalidatePath } from "next/cache";
import { deleteSignupById, createWaitlist, initEmailTemplates } from "./db";
import { notFound, redirect } from "next/navigation";
import { checkWorkspace } from "./auth";
import { notifyDiscord } from "./discord";

export async function handleDelete(formData: FormData) {
	const id = formData.get("id") as string;

	await deleteSignupById(id);

	revalidatePath("/");
	revalidatePath("/users");
}

export async function createWaitlistAction(formData: FormData) {
	// const { userId } = auth();
	const workspace = await checkWorkspace();
	if (!workspace) {
		return notFound();
	}

	const waitlistName = formData.get("waitlistName") as string;

	const [{ waitlistID }] = await createWaitlist(waitlistName, workspace.workspaceID);

	await initEmailTemplates(waitlistID);
	notifyDiscord({
		waitlist: waitlistID,
	});
	redirect(`/dashboard/${waitlistID}`);
}
