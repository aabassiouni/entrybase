import { createWaitlistAction } from "@/lib/actions";
import FormSubmitButton from "./form-submit-button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

function CreateWaitlistDialog({ children }: { children: React.ReactNode }) {
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
