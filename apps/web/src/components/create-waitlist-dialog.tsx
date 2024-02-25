// import { createWaitlistAction } from "@/lib/actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import FormSubmitButton from "./form-submit-button";
import { createWaitlist, initEmailTemplates } from "@/lib/db";
import { notifyDiscord } from "@/lib/discord";
import { notFound, redirect } from "next/navigation";
import { checkWorkspace } from "@/lib/auth";

function CreateWaitlistDialog({ children }: { children: React.ReactNode }) {

	 async function createWaitlistAction(formData: FormData) {
		'use server'
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
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new waitlist</DialogTitle>
					<DialogDescription>Enter the name of your waitlist below.</DialogDescription>
				</DialogHeader>
				<form action={createWaitlistAction} className="flex flex-col space-y-4">
					<Input required name="waitlistName" />
					<FormSubmitButton>Create</FormSubmitButton>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateWaitlistDialog;
