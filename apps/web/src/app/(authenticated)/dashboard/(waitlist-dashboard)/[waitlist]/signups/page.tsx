import { signupColumns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { checkWorkspace } from "@/lib/auth";
import { getSignupsList } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async function UsersPage({ params }: { params: { waitlist: string } }) {
  const _workspace = await checkWorkspace(params.waitlist);
  const signupList = await getSignupsList(params.waitlist);

  return (
    <MainLayout>
      <PageHeading>Signups</PageHeading>
      <DataTable columns={signupColumns} data={signupList} />
    </MainLayout>
  );
}

export default UsersPage;
