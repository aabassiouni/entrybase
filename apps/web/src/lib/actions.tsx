"use server";

import { revalidatePath } from "next/cache";
import { deleteSignupById, createWaitlist, createEmailTemplate } from "./db";
import { redirect } from "next/navigation";

export async function handleDelete(formData: FormData) {
	const id = formData.get("id") as string;

	await deleteSignupById(id);

	revalidatePath("/");
	revalidatePath("/users");
}

export async function createWaitlistAction(userID: string, formData: FormData) {
	const waitlistName = formData.get("waitlistName") as string;
	console.log("waitlistName", waitlistName);
	console.log("userID", userID);

	const [{ waitlistID }] = await createWaitlist(waitlistName, userID);
	await createEmailTemplate(waitlistID);

	redirect(`/dashboard/${waitlistID}`)
}
