"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function InviteAction() {
  const params = useParams();
  const [count, setCount] = React.useState("10");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <p className="inline-flex items-center gap-2 text-base sm:text-lg">
        Invite
        <Select value={count} onValueChange={setCount} defaultValue={"10"}>
          <SelectTrigger className="w-12 px-1 py-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        signups
      </p>
      <Link href={`/dashboard/${params.waitlist}/invite?count=${count}`}>
        <Button size={"sm"} className="font-medium dark:bg-primary">
          Invite
        </Button>
      </Link>
    </div>
  );
}

export default InviteAction;
