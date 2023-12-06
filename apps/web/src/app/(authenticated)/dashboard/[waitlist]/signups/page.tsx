import React from "react";
import { signupColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { getSignupsList } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { PageHeading } from "@/components/typography";
import { MainLayout } from "@/components/layout";

async function UsersPage({ params }: { params: { waitlist: string } }) {
	const user = await currentUser();
	if (!user) return null;
	const signupList = await getSignupsList(params.waitlist, user.id);

	return (
		<MainLayout>
			<PageHeading>Signups</PageHeading>
			<DataTable columns={signupColumns} data={signupList} />
		</MainLayout>
	);
}

export default UsersPage;
