"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
const data = [
	{ name: "Day 1", signups: 400 },
	{ name: "Day 2", signups: 300 },
	{ name: "Day 3", signups: 200 },
	{ name: "Day 4", signups: 278 },
	{ name: "Day 5", signups: 189 },
];

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
	// console.log(payload[0].payload.name)
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip h-32 w-32 bg-slate-400">
				<p className="label">{`${label} : ${payload[0].value}`}</p>
				<p className="desc">Anything you want can be displayed here.</p>
			</div>
		);
	}
}

function Chart() {
	return (
		<ResponsiveContainer width="100%" minHeight={350}>
			<LineChart
				//   width={500}
				//   height={300}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 20,
					bottom: 5,
				}}
                
			>
				{/* <CartesianGrid strokeDasharray="3 3" /> */}
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				<Line type="monotone" dataKey="signups" stroke="#8884d8" activeDot={{ r: 8 }} />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Chart;
