import Chart from "@/components/Chart";
import { MainLayout } from "@/components/layout";
import TimeframeSelect from "@/components/timeframe-select";
import { PageHeading } from "@/components/typography";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { checkWorkspace } from "@/lib/auth";
import { getDayChartLabelsAndValues, getDayRangeChartLabelsAndValues } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import type { EntryResponse, SearchParams } from "@/types";
import React from "react";

async function AnalyticsPage({ params, searchParams }: { params: { waitlist: string }; searchParams: SearchParams }) {
  const _workspace = await checkWorkspace(params.waitlist);

  let signups: EntryResponse;
  const timeframe = searchParams?.timeframe ?? "today";
  let from: Date, to: Date;
  //this is just here to make the url look nice
  switch (timeframe) {
    case "today":
      from = new Date();
      to = new Date();
      break;
    case "yesterday": {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      from = yesterday;
      to = yesterday;
      break;
    }
    case "pastWeek": {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 6);
      from = lastWeek;
      to = new Date();
      break;
    }
    case "pastMonth": {
      const lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() - 30);
      from = lastMonth;
      to = new Date();
      break;
    }
    default: {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() - 6);
      from = defaultDate;
      to = new Date();
    }
  }

  if (from === undefined || to === undefined) {
    throw new Error("Invalid timeframe");
  }

  if (timeframe === "today" || timeframe === "yesterday") {
    signups = await getDayChartLabelsAndValues(params.waitlist, formatDate(from));
  } else {
    signups = await getDayRangeChartLabelsAndValues(params.waitlist, formatDate(from), formatDate(to));
  }

  return (
    <MainLayout>
      <PageHeading>Analytics</PageHeading>
      <TimeframeSelect waitlistID={params.waitlist} dayString={signups.dayString} />
      <div className="p-2" />
      <Card>
        <CardHeader>
          <CardTitle>{signups.dayString}</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            data={signups.entries}
            margin={{
              right: 30,
              left: -30,
            }}
          />
        </CardContent>
        <CardFooter />
      </Card>
      <div className="py-4">
        <div className="rounded-md border border-neutral-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Signups</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {signups.entries.map((row: any, i: number) => (
                <TableRow className="even:bg-zinc-950/50" key={i}>
                  <TableCell className="w-fit border-neutral-700 border-r">{row.label}</TableCell>
                  <TableCell className="w-fit">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default AnalyticsPage;
