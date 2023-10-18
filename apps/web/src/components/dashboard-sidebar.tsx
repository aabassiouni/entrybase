import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PersonIcon, HomeIcon, AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function DashboardSidebar() {
	return (
		<div className="border- flex min-h-screen w-72 shrink-0 flex-col  items-center border-r  py-10">
			<h1 className="pb-10 text-4xl font-black">waitlister</h1>
			<div className="h-full w-full space-y-2 px-2 py-4">
				<Link href="/">
					<Button variant="ghost" className="h-7 w-full text-lg justify-start gap-2 p-4 ">
						<HomeIcon width={"1.125rem"} height={"1.125rem"}/>
						Home
					</Button>
				</Link>
				<Link href="/users">
					<Button variant="ghost" className="h-7 text-lg w-full justify-start gap-2 p-4 ">
						<PersonIcon width={"1.125rem"} height={"1.125rem"} />
						Users
					</Button>
				</Link>
			</div>
			<Separator />
			<div className="flex w-full  px-2 py-4">
				<Button variant={"ghost"} className="inline-flex w-full items-center justify-start gap-2 text-xl">
					<AvatarIcon height={20} width={20} />
					<p>Ali Bassiouni</p>
				</Button>
			</div>
		</div>
	);
}
