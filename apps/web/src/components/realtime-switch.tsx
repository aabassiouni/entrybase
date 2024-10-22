"use client";
import { Switch } from "@/components/ui/switch";
import { useWebSocket } from "@/lib/hooks/useWebsocket";
import { useRealtimeCountActions } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";

export function RealtimeSwitch() {
  const router = useRouter();
  const params = useParams<{ waitlist: string }>();
  const { incrementRealtimeCount, resetRealtimeCount } = useRealtimeCountActions();
  const toast = useToast();

  const [enabled, setEnabled] = useState(false);

  const { ws, reconnect } = useWebSocket(`${process.env.NEXT_PUBLIC_REALTIME_URL}/${params.waitlist}/ws`, {
    onMessage: () => {
      incrementRealtimeCount();
    },
    onClose: () => {
      setEnabled(false);
    },
    enabled,
    authToken: true,
  });

  return (
    <div className="flex items-center gap-2">
      <p className="items-center font-medium text-lg tracking-tight">Enable Realtime</p>
      <Switch
        checked={enabled}
        className="dark:data-[state=checked]:bg-primary"
        onCheckedChange={(checked) => {
          switch (checked) {
            case true:
              router.refresh();
              resetRealtimeCount();
              reconnect();
              toast.toast({
                title: "Realtime Enabled",
                description: "Your signups will be updated as they come in.",
              });
              break;
            case false:
              if (ws) {
                router.refresh();
                resetRealtimeCount();
                ws.close();
                toast.toast({
                  title: "Realtime Disabled",
                  description: "Signups will no longer update in real-time. Refresh the page to see new signups.",
                });
              }
              break;
          }
          setEnabled(!enabled);
        }}
      />
    </div>
  );
}
