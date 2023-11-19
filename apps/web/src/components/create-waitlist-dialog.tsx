import { createWaitlistAction } from "@/lib/actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function CreateWaitlistDialog({ children, userID }: { children: React.ReactNode; userID: string }) {
	const createWaitlistActionWithID = createWaitlistAction.bind(null, userID);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new waitlist</DialogTitle>
					<DialogDescription>Enter the name of your waitlist below.</DialogDescription>
				</DialogHeader>
				<form action={createWaitlistActionWithID} className="flex flex-col space-y-4">
					<Input name="waitlistName" />
					<Button className="">Create</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateWaitlistDialog;
