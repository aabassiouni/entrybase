"use client";
import React from "react";
import { Switch } from "./ui/switch";

function EmailSwitch({
  settings,
  action,
}: {
  settings: { signup: boolean; invite: boolean };
  action: (value: boolean, type: "signup" | "invite") => void;
}) {
  return (
    <>
      <div className="flex">
        <Switch
          defaultChecked={settings.signup}
          onCheckedChange={async (value) => {
            action(value, "signup");
          }}
        />
        <p className="ml-2">Send emails on signup</p>
      </div>
      <div className="flex">
        <Switch
          onCheckedChange={async (value) => {
            action(value, "invite");
          }}
          defaultChecked={settings.invite}
        />
        <p className="ml-2">Send emails on invite</p>
      </div>
    </>
  );
}

export default EmailSwitch;
