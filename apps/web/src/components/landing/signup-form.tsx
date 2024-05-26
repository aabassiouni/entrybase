"use client";
import { StyledButton } from "@/components/styled-button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <StyledButton className="w-32" type="submit">
      {pending ? <Loader2 className="animate-spin" /> : "Join Waitlist"}
    </StyledButton>
  );
}
export function SignupForm() {
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    const _res = await fetch(
      `${process.env.NEXT_PUBLIC_WAITLIST_API_URL}/${process.env.NEXT_PUBLIC_WAITLIST_ID}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      },
    ).catch(() => {
      return;
    });
  };

  return (
    <form action={handleSignup} className="flex items-center gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 border-primary bg-[#071711] text-white placeholder:text-neutral-500"
        placeholder="Enter your email"
        required
      />
      <SubmitButton />
    </form>
  );
}
