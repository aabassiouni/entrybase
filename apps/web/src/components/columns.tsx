"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import InviteButton from "./invite-button";
import DeleteButton from "./delete-button";

type Signup = {
	signupID: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	createdAt: Date | null;
	status: "waiting" | "invited";
};

export const signupColumns: ColumnDef<Signup>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value: any) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "firstName",
		header: "First Name",
	},
	{
		accessorKey: "lastName",
		header: "Last Name",
	},
	{
		accessorKey: "createdAt",
		header: "Signed Up On",
		cell: ({ row }) => {
			const date = new Date(row.getValue("createdAt"));
			const formattedDate = date.toDateString();
			return (
				<div>
					<span className="w-fit truncate">{formattedDate}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		id: "invite",
		cell: ({ row }) => {
			return <InviteButton email={row.original.email} id={row.original.signupID}/>;
		},
	},
	{
		id: "delete",
		cell: ({ row }) => {
			return <DeleteButton id={row.original.signupID} />;
		},
	},
];
