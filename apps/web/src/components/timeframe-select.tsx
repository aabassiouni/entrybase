"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

function TimeframeSelect({ dayString }: { dayString: string }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const timeframe = searchParams.get("timeframe") ?? "today";

	const selectLabel = (timeframe: string) => {
		switch (timeframe) {
			case "today":
				return "Today";
			case "yesterday":
				return "Yesterday";
			case "pastWeek":
				return "Past Week";
			case "pastMonth":
				return "Past Month";
			default:
				return "Select a timeframe";
		}
	};
	return (
		<Select
			name="timeframe"
			defaultValue={timeframe}
			onValueChange={(value) => {
				router.push(`/analytics/?timeframe=${value}`);
			}}
		>
			<SelectTrigger className="w-fit">
				<SelectValue placeholder="Select a timeframe ">
					{selectLabel(timeframe) + ` (${dayString})`}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="today">Today</SelectItem>
				<SelectItem value="yesterday">Yesterday</SelectItem>
				<SelectItem value="pastWeek">Past Week</SelectItem>
				<SelectItem value="pastMonth">Past month</SelectItem>
			</SelectContent>
		</Select>
	);
}

export default TimeframeSelect;
