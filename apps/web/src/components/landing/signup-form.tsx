"use client";
import { StyledButton } from "@/components/styled-button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

const useSignupMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (err: Response) => void;
  onSuccess?: (data: { message: string }) => void;
} = {}) => {
  return useMutation({
    mutationFn: async (params: { email: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WAITLIST_API_URL}/${process.env.NEXT_PUBLIC_WAITLIST_ID}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: params.email,
          }),
        },
      );
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    },
    onError: (err: Response) => {
      onError?.(err);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};

export function SignupForm() {
  const [email, setEmail] = useState("");

  const { mutate: signup, isPending, isSuccess } = useSignupMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signup({ email });
      }}
      className="flex items-center gap-2"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 border-primary bg-[#071711] text-white placeholder:text-neutral-500"
        placeholder="Enter your email"
        required
      />
      <StyledButton disabled={isPending || isSuccess} className="w-32" type="submit">
        {isSuccess ? (
          <Check className="h-6 w-6 text-tinted-black" />
        ) : isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Join Waitlist"
        )}
      </StyledButton>
    </form>
  );
}
