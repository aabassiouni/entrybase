"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ActionsCard({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null);

	const [leftBtnDisabled, setLeftBtnDisabled] = useState(false);
	const [rightBtnDisabled, setRightBtnDisabled] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);

	useEffect(() => {
		const checkScroll = () => {
			if (containerRef.current) {
				setLeftBtnDisabled(containerRef.current.scrollLeft < 390);
				setRightBtnDisabled(
					containerRef.current.scrollWidth -
						(containerRef.current.scrollLeft + containerRef.current.clientWidth) <=
						390,
				);
			}
		};

		checkScroll();
		containerRef.current?.addEventListener("scroll", checkScroll);

		return () => {
			containerRef.current?.removeEventListener("scroll", checkScroll);
		};
	}, [containerRef.current]);

	function handleScrollLeft() {
		if (isScrolling) return;
		if (containerRef.current) {
			const currElement = Math.round(containerRef.current.scrollLeft / 454);
			const elementToScrollTo = currElement - 1;
			const scrollPos = elementToScrollTo * 454;
			containerRef.current.scrollTo(scrollPos, 0);
		}
	}
	function handleScrollRight() {
		if (containerRef.current) {
			const currElement = Math.round(containerRef.current.scrollLeft / 454);
			const elementToScrollTo = currElement + 1;
			const scrollPos = elementToScrollTo * 454;
			containerRef.current.scrollTo(scrollPos, 0);
		}
	}

	return (
		<Card id="container" className="col-span-2  flex h-full w-full items-center p-0 px-2 ">
			<button
				disabled={leftBtnDisabled}
				onClick={handleScrollLeft}
				className="flex w-8 justify-center disabled:opacity-50 "
			>
				<ChevronLeft className="h-6 w-6 " />
			</button>
			<div
				ref={containerRef}
				className="hide-scrollbar flex h-full w-full snap-x flex-nowrap gap-9 overflow-x-scroll scroll-smooth  px-8 md:px-14  "
			>
				{children}
			</div>
			<button
				disabled={rightBtnDisabled}
				onClick={handleScrollRight}
				className="flex w-8 justify-center disabled:opacity-50"
			>
				<ChevronRight className="h-6 w-6" />
			</button>
		</Card>
	);
}

export default ActionsCard;
