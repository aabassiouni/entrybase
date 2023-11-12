import React from "react";
import { signupColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { getSignupsList } from "@/lib/db";

async function UsersPage() {
	const signupList = await getSignupsList();

	return (
		<main className="flex min-h-screen w-full flex-col overflow-y-scroll p-12 pt-8">
			<h1 className="text-3xl font-bold">Signups</h1>
			<Separator className="my-4" />
			<DataTable columns={signupColumns} data={signupList} />
		</main>
	);
}

export default UsersPage;
