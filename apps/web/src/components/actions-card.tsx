"use client";
import React from "react";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import InviteAction from "@/components/invite-action";

function ActionsCardStats() {
	return (
		<div className="flex h-full w-full items-center justify-between">
			<div className="">
				<h1 className="text-center text-xl font-bold">Past Week</h1>
				<p className="text-center text-xl font-bold text-primary">647</p>
			</div>
			<div className="">
				<h1 className="text-center text-xl font-bold">Past Month</h1>
				<p className="text-center text-xl font-bold text-primary">872</p>
			</div>
			<div className="">
				<h1 className="text-center text-xl font-bold">Open Rate</h1>
				<p className="text-center text-xl font-bold text-primary">33%</p>
			</div>
		</div>
	);
}

function ActionsCard() {
	return (
		<div className="col-span-2 h-full">
			<Carousel className="h-full">
				<Card className="flex h-full w-full items-center px-4">
					<CarouselPrevious className="relative" />
					<CarouselContent className="h-full w-full">
						<CarouselItem className="ml-2">
							<ActionsCardStats />
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
