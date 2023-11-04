"use client";
import React from "react";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	AreaChart,
	Area,
} from "recharts";
import type { Margin } from "recharts/types/util/types";
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip rounded-lg bg-white px-2 py-3">
				<p className="text-black">{payload[0].payload.tooltipLabel}</p>
			</div>
		);
	}
}


function Chart({ data, margin }: { data: any; margin: Margin }) {
	return (
		<ResponsiveContainer width="100%" minHeight={350}>
			<AreaChart data={data} margin={margin}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis tickLine={false} dataKey="label">
				</XAxis>
				<YAxis 
					scale={"auto"}
				  	allowDecimals={false}
				   	tickLine={false}
				   >
				</YAxis>

				<Tooltip content={<CustomTooltip />} />
				<Legend payload={[{ value: "Signups", type: "line" }]} />
				<CartesianGrid vertical={false}  strokeOpacity={0.1} strokeDasharray={"3 3"}  />
				<Area dot={true} type={"monotone"}   dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
			</AreaChart>
		</ResponsiveContainer>
	);
}

export default Chart;
