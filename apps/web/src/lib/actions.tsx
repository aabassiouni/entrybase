"use server";

import { revalidatePath} from "next/cache";
import { deleteSignupById } from "./db";


export async function handleDelete(formData: FormData) {

	const id = formData.get("id") as string;

	await deleteSignupById(id);

	revalidatePath("/");
	revalidatePath("/users");
}
