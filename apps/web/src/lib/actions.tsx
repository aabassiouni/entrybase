"use server";

import { revalidatePath } from "next/cache";
import { deleteSignupById, createWaitlist, initEmailTemplates } from "./db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export async function handleDelete(formData: FormData) {
	const id = formData.get("id") as string;

	await deleteSignupById(id);

	revalidatePath("/");
	revalidatePath("/users");
}

export async function createWaitlistAction(formData: FormData) {
	const { userId } = auth();
	if (!userId) return;

	const waitlistName = formData.get("waitlistName") as string;

	const [{ waitlistID }] = await createWaitlist(waitlistName, userId);
	await initEmailTemplates(waitlistID);

	redirect(`/dashboard/${waitlistID}`);
}
