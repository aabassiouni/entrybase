"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import InviteButton from "./invite-button";
import DeleteButton from "./delete-button";

type Signup = {
	id: string;
	clerk_user_id: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	date_signed_up: Date | null;
	status: string;
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
		accessorKey: "first_name",
		header: "First Name",
	},
	{
		accessorKey: "last_name",
		header: "Last Name",
	},
	{
		accessorKey: "date_signed_up",
		header: "Signed Up On",
		cell: ({ row }) => {
			const date = new Date(row.getValue("date_signed_up"));
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
			return <InviteButton />;
		},
	},
	{
		id: "delete",
		cell: ({ row }) => {
			return <DeleteButton id={row.original.id} />;
		},
	},
];
