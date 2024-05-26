import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleDelete } from "@/lib/actions";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function DeleteDialogButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      type="submit"
      variant={"destructive"}
    >
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

function DeleteButton({ id, setOpen }: { id: string; open: boolean; setOpen: (open: boolean) => void }) {
  async function handleSubmit(formData: FormData) {
    await handleDelete(formData);
    setOpen(false);
  }

  return (
    // <AlertDialog open={open} onOpenChange={setOpen}>
    <>
      <AlertDialogTrigger
        className="dark:hover:bg-none"
        onClick={(event) => {
          event.stopPropagation();
        }}
        // asChild
      >
        <div className="inline-flex items-center justify-center">
          <Trash className="mr-2 h-4 w-4" />
          <p>Delete</p>
        </div>
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
            <AlertDialogCancel
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <DeleteDialogButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </>
    // </AlertDialog>
  );
}

export default DeleteButton;
