import UserButton from "@/components/user-button";
import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function AccountPage() {
	return (
		<div className="w-full">
			<div className="flex justify-between p-8 px-24 shadow-md">
				<Link href="/dashboard">
					<h1 className="text-4xl font-bold">waitlister</h1>
				</Link>
				<UserButton />
			</div>
			<div className="flex justify-center">
				<UserProfile />
			</div>
		</div>
	);
}

export default AccountPage;
