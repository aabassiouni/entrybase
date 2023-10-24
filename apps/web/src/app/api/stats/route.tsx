import { NextRequest, NextResponse } from "next/server";
import { getDayChartLabelsAndValues, getDayRangeChartLabelsAndValues} from "@/lib/db";

export async function GET(request: NextRequest) {
	const from = request.nextUrl.searchParams.get("from");
	const to = request.nextUrl.searchParams.get("to");

	if (!from || !to) {
		return NextResponse.json({ error: "Bad Request" }, { status: 400 });
	}

	if (from === to) {
		const data = await getDayChartLabelsAndValues(from);
		console.log(data);
		return NextResponse.json({ signups: data });
	}

	console.log("request params are", from, to);

	const data = await getDayRangeChartLabelsAndValues(from, to);
	console.log(data);

	return NextResponse.json({ signups: data });
}
