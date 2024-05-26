"use client";
import React from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

function EmailScrollArea({ invitedEmails }: { invitedEmails: string[] }) {
  const [search, setSearch] = React.useState<string>("");

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="w-fit">Invited Users:</p>
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
          className="w-40"
        />
      </div>
      <div className="p-2" />
      <ScrollArea className="h-40 w-48 rounded-md bg-neutral-900 px-2 py-1 text-sm">
        {invitedEmails
          .filter((email) => email.includes(search))
          .map((email, index) => (
            <p key={index} className="w-full">
              {email}
            </p>
          ))}
      </ScrollArea>
    </div>
  );
}

export default EmailScrollArea;
