"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import CreateWaitlistDialog from "../create-waitlist-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

function WaitlistDropdown({
  waitlists,
  className,
}: {
  waitlists: { waitlistID: string; waitlistName: string; colorString: string }[];
  className?: string;
}) {
  const router = useRouter();
  const params = useParams();
  const defaultWaitlist = params.waitlist as string;

  return (
    <div className={cn("w-full px-4 py-2", className)}>
      <Select
        defaultValue={defaultWaitlist}
        onValueChange={(value) => {
          router.push(`/dashboard/${value}`);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {waitlists.map((waitlist) => (
            <SelectItem key={waitlist.waitlistID} value={waitlist.waitlistID}>
              <div className="flex items-center justify-center gap-4">
                <Avatar className="h-6 w-6 ring-2 ring-neutral-800">
                  <div className={cn("h-full w-full bg-gradient-to-br", waitlist.colorString)} />
                </Avatar>
                <p>{waitlist.waitlistName}</p>
              </div>
            </SelectItem>
          ))}
          <Separator className="my-0.5" />
          <CreateWaitlistDialog>
            <button
              type="submit"
              className="relative flex w-full items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none dark:focus:bg-neutral-800 focus:bg-neutral-100 hover:bg-neutral-800 dark:focus:text-neutral-50 focus:text-neutral-900"
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <PlusCircledIcon className="h-4 w-4" />
              </span>
              Create Waitlist
            </button>
          </CreateWaitlistDialog>
        </SelectContent>
      </Select>
    </div>
  );
}

export default WaitlistDropdown;
