"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function DeleteWaitlistButton({ waitlistName }: { waitlistName: string }) {
  const { pending } = useFormStatus();

  const [disabled, setDisabled] = React.useState(true);

  return (
    <>
      <Input
        autoComplete="off"
        onChange={(event) => {
          if (event.target.value === waitlistName) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
        }}
        name="waitlistID"
      />
      <Button disabled={disabled} variant={"destructive"} className="">
        {pending ? <Loader2 className="animate-spin" /> : "Delete"}
      </Button>
    </>
  );
}

export default DeleteWaitlistButton;
