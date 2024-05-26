"use client";
import { useRealtimeCount } from "@/lib/store";
import React, { useDeferredValue } from "react";

export function RealtimeCount({ initialCount }: { initialCount: number }) {
  const { realtimeCount } = useRealtimeCount();
  const deferredCount = useDeferredValue(realtimeCount);

  const count = initialCount + deferredCount;

  return <span>{count}</span>;
}
