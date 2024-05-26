"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";

function ChangePlanButton({ workspaceID, plan }: { workspaceID: string; plan: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function changePlan() {
    setIsLoading(true);
    const data = await fetch("/api/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan, workspaceID }),
    }).then((res) => res.json());

    console.log(data);
    if (data.success === true) {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Change Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm plan change</DialogTitle>
          <DialogDescription>Are you sure you want to change your plan to {plan}?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="" onClick={() => changePlan()}>
            <span className="w-full">{isLoading ? <Loader2 className="animate-spin" /> : "Confirm"}</span>
          </Button>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePlanButton;
