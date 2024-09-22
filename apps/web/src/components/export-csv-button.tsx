import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const useExportCsvMutation = () => {
  return useMutation({
    mutationFn: async (params: { waitlistId: string }) => {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waitlistId: params.waitlistId,
        }),
      });
      return res.json();
    },
  });
};

function ExportToCsvButton({ className }: { className?: string }) {
  const { waitlist } = useParams<{ waitlist: string }>();

  const { mutate: exportCsv, isPending } = useExportCsvMutation();

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        exportCsv({ waitlistId: waitlist });
      }}
      className={cn("h-8 px-3 py-2", className)}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Export"}
    </Button>
  );
}

export default ExportToCsvButton;
