"use client";

import { useRealtimeCount } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Entry } from "@/types";
import React, { useDeferredValue } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { Margin } from "recharts/types/util/types";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  signups: {
    label: "Signups",
    color: "#4BE7AE",
  },
} satisfies ChartConfig;

function Chart({ data, chartMargin, className }: { data: Entry[]; chartMargin: Margin; className?: string }) {
  const { realtimeCount } = useRealtimeCount();
  const deferredCount = useDeferredValue(realtimeCount);

  const lastValue = data[data.length - 1];

  const realtimeData: Entry[] = [
    ...data.slice(0, -1),
    {
      day: lastValue?.day ?? "",
      signups: (lastValue?.signups ?? 0) + deferredCount,
    },
  ];

  return (
    <ChartContainer config={chartConfig} className={cn("min-h-[350px] w-full", className)}>
      <AreaChart accessibilityLayer data={realtimeData} margin={chartMargin}>
        <CartesianGrid vertical={false} strokeOpacity={0.1} />
        <defs>
          <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-signups)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-signups)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis tickMargin={8} tickLine={false} axisLine={false} dataKey="day" />
        <YAxis tickMargin={8} axisLine={false} scale={"auto"} allowDecimals={false} tickLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dot={true}
          type={"monotone"}
          dataKey="signups"
          stroke="#AFF4DB"
          fillOpacity={1}
          fill="url(#fillSignups)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default Chart;
