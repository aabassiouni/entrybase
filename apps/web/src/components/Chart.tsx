"use client";
import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Label,
	AreaChart,
	Area,
} from "recharts";
import type { Margin } from "recharts/types/util/types";
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
	// console.log(payload[0].payload.name)
	if (active && payload && payload.length) {
		// const date = new Date(label);
		console.log(payload)
		return (
			<div className="custom-tooltip rounded-lg bg-white px-2 py-3">
				{/* <p className="text-black">{date.toDateString()}</p> */}
				<p className="text-black">{payload[0].payload.tooltipLabel}</p>
			</div>
		);
	}
}

function CustomLegend() {
	return <></>;
}
function Chart({ data, margin }: { data: any; margin: Margin }) {
	let maxSignups = Math.max(...data.map((item: any) => item.signups_count));
	return (
			<ResponsiveContainer width="100%" minHeight={350}>
				<AreaChart
					data={data}
					margin={margin}
				>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
					</defs>
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					<XAxis tickLine={false} dataKey="label">{/* <Label value="Days" offset={0} position="end" /> */}</XAxis>
					{/* <YAxis /> */}
					<YAxis scale={"linear"} domain={[0, maxSignups ]} allowDecimals={false}  tickLine={false} >{/* <Label value="Signups" offset={-20} angle={0} position="insideLeft" /> */}</YAxis>

					<Tooltip content={<CustomTooltip />} />
					<Legend payload={[{ value: "Signups", type: "line" }]} />
					<Area
						type="monotone"
						dataKey="value"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#colorUv)"
					/>
					{/* <Line type="monotone" dataKey="signups_count" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
				</AreaChart>
			</ResponsiveContainer>
	);
}

export default Chart;
