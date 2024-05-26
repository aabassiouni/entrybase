import { deleteWaitlistByID, getWaitlistByID } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import DeleteWaitlistButton from "./delete-waitlist-button";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

async function DeleteWaitlistDialog({ waitlistID }: { waitlistID: string }) {
  const waitlist = await getWaitlistByID(waitlistID);

  if (!waitlist) {
    redirect("/dashboard");
  }

  async function deleteWaitlist(_formData: FormData) {
    "use server";

    const { userId } = auth();
    if (!userId) return;

    await deleteWaitlistByID(waitlistID);

    redirect("/dashboard");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Waitlist</DialogTitle>
          <DialogDescription>Are you sure you want to delete this waitlist?</DialogDescription>
        </DialogHeader>
        <div className="inline-flex w-full rounded-lg p-3 text-red-200 dark:bg-red-800/70">
          <Info className="mr-2 h-6 w-6" />
          This action is irreversible.
        </div>
        <DialogDescription className="text-base">
          Enter the waitlist name to continue: <span className="font-bold"> {waitlist?.waitlistName}</span>
        </DialogDescription>

        <form action={deleteWaitlist} className="flex flex-col space-y-4">
          <DeleteWaitlistButton waitlistName={waitlist?.waitlistName} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteWaitlistDialog;
