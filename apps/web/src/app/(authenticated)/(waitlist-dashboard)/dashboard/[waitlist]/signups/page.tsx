import React from "react";
import { signupColumns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { getSignupsList } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { PageHeading } from "@/components/typography";
import { MainLayout } from "@/components/layout";
import { checkWorkspace } from "@/lib/auth";

async function UsersPage({ params }: { params: { waitlist: string } }) {

	const workspace = await checkWorkspace(params.waitlist);
	const signupList = await getSignupsList(params.waitlist);

	return (
		<MainLayout>
			<PageHeading>Signups</PageHeading>
			<DataTable columns={signupColumns} data={signupList} />
		</MainLayout>
	);
}

export default UsersPage;
