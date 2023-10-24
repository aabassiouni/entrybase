import React from "react";
import { signupColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { getSignupsList } from "@/lib/db";

// generate some dummy data
const signupData = [
	{
		email: "a@b.com",
		date_signed_up: "2021-07-01",
		invited: true,
	},
	{
		email: "b@c.com",
		date_signed_up: "2021-07-01",
		invited: true,
	},
	{
		email: "c@d.com",
		date_signed_up: "2021-07-01",
		invited: true,
	},
	{
		email: "d@e.com",
		date_signed_up: "2021-07-01",
		invited: true,
	},
];

async function UsersPage() {

	const signupList = await getSignupsList();
	// console.log(signupList)

	return (
		<main className="flex flex-col min-h-screen w-full p-4 overflow-y-scroll">
            <h1 className="text-3xl">Signups</h1>
			<Separator className="my-4" />
			{/* <div className="w-full rounded-md border overflow-y-scroll"> */}
				<DataTable columns={signupColumns} data={signupList} />
			{/* </div> */}
		</main>
	);
}

export default UsersPage;
