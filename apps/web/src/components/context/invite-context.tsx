"use client";
import type React from "react";
import { createContext, useContext, useState } from "react";

type InviteContextType = {
  invites: { email: string; id: string }[];
  setInvites: React.Dispatch<React.SetStateAction<{ email: string; id: string }[]>>;
};

const InviteContext = createContext<InviteContextType>({
  invites: [],
  setInvites: () => {},
});

export function InviteProvider({ children }: { children: React.ReactNode }) {
  const [invites, setInvites] = useState<{ email: string; id: string }[]>([]);

  return <InviteContext.Provider value={{ invites, setInvites }}>{children}</InviteContext.Provider>;
}

export function useInvites() {
  const context = useContext(InviteContext);
  if (context === undefined) {
    throw new Error("useInvites must be used within a InviteProvider");
  }
  return context;
}
