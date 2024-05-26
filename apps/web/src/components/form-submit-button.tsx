"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";

function FormSubmitButton({
  loading,
  children,
  className,
  ...props
}: { loading?: boolean; children: React.ReactNode; className?: string } & ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} className={cn(className)} type="submit">
      {pending || loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}

export default FormSubmitButton;
