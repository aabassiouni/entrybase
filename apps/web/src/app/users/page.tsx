import React from "react";
import { signupColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";

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

function UsersPage() {
	return (
		<main className="flex flex-col min-h-screen w-full p-4">
            <h1 className="text-3xl">Signups</h1>
			<Separator className="my-4" />
			<div className="w-full rounded-md border">
				<DataTable columns={signupColumns} data={signupData} />
			</div>
		</main>
	);
}

export default UsersPage;
