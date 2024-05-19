"use client";
import { useRealtimeCount } from "@/lib/store";
import type { Entry } from "@/types";
import React, { useDeferredValue } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { Margin } from "recharts/types/util/types";

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip rounded-lg bg-white px-2 py-3">
				<p className="text-black">{payload[0]?.payload.tooltipLabel}</p>
			</div>
		);
	}
}

function renderLegend(_value: string, entry: any) {
	const { color } = entry;

	return <span style={{ color }}>Signups</span>;
}

function Chart({ data, margin }: { data: Entry[]; margin: Margin }) {
	const { realtimeCount } = useRealtimeCount();
	const deferredCount = useDeferredValue(realtimeCount);

	const lastValue = data[data.length - 1];

	const realtimeData: Entry[] = [
		...data.slice(0, -1),
		{
			label: lastValue?.label ?? "",
			value: (lastValue?.value ?? 0) + deferredCount,
			tooltipLabel: lastValue?.tooltipLabel ?? "",
		},
	];

	return (
		<ResponsiveContainer width="100%" minHeight={350}>
			<AreaChart data={realtimeData} margin={margin}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#4BE7AE" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#4BE7AE" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis tickLine={false} dataKey="label" />
				<YAxis scale={"auto"} allowDecimals={false} tickLine={false} />

				<Tooltip content={<CustomTooltip />} />
				<Legend formatter={renderLegend} />
				<CartesianGrid vertical={false} strokeOpacity={0.1} strokeDasharray={"3 3"} />
				<Area
					dot={true}
					type={"monotone"}
					dataKey="value"
					stroke="#AFF4DB"
					fillOpacity={1}
					fill="url(#colorUv)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}

export default Chart;
