import React, { useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { handleDelete } from "@/lib/actions";
import { useFormStatus } from "react-dom";

function DeleteDialogButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" variant={"destructive"}>
			{pending ? "Deleting..." : "Delete"}
		</Button>
	);
}

function DeleteButton({ id }: { id: string }) {
	const [open, setOpen] = useState(false);

	async function handleSubmit(formData: FormData) {
		await handleDelete(formData);
		setOpen(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size={"icon"} variant={"destructive"} className="text-red-500">
					<Trash className="h-5 w-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<form action={handleSubmit}>
					<input type="hidden" name="id" defaultValue={id} />
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will delete this signup from your waitlist. This cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<DeleteDialogButton />
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteButton;
