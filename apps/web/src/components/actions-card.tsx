import InviteAction from "@/components/invite-action";
import { RealtimeCount } from "@/components/realtime-count";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getSignupsCountForMonth, getSignupsCountForWeek } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { Card } from "./ui/card";

async function ActionsCardStats({ waitlistID }: { waitlistID: string }) {
  const user = await currentUser();
  if (!user) return null;

  const weekCount = await getSignupsCountForWeek(waitlistID);
  const monthCount = await getSignupsCountForMonth(waitlistID);

  return (
    <div className="flex h-full w-full items-center justify-around">
      <div className="">
        <h1 className="text-center font-bold text-xl">Past Week</h1>
        <p className="text-center font-bold text-primary text-xl">
          <RealtimeCount initialCount={Number(weekCount)} />
        </p>
      </div>
      <div className="">
        <h1 className="text-center font-bold text-xl">Past Month</h1>
        <p className="text-center font-bold text-primary text-xl">
          <RealtimeCount initialCount={Number(monthCount)} />
        </p>
      </div>
      {/* <div className="">
				<h1 className="text-center text-xl font-bold">Open Rate</h1>
				<p className="text-center text-xl font-bold text-primary">33%</p>
			</div> */}
    </div>
  );
}

function ActionsCard({ waitlistID }: { waitlistID: string }) {
  return (
    <div className="h-32 w-full sm:col-span-3 sm:h-full lg:col-span-2">
      <Carousel className="h-full">
        <Card className="flex h-full w-full items-center px-4">
          <CarouselPrevious className="relative" />
          <CarouselContent className="h-full w-full">
            <CarouselItem className="ml-2">
              <ActionsCardStats waitlistID={waitlistID} />
            </CarouselItem>
            <CarouselItem className="ml-2">
              <InviteAction />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext className="relative" />
        </Card>
      </Carousel>
    </div>
  );
}

export default ActionsCard;
