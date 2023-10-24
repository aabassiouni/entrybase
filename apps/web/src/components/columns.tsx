"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type Signup = {
	id?: string;
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
				onCheckedChange={(value : any) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value : any) => row.toggleSelected(!!value)}
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
		// cell: ({ row }) => {
		//   return (
		//     <div>
		//       <span className="w-fit truncate">{row.getValue('generation_id_uuid')}</span>
		//     </div>
		//   );
		// }
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
			const date = new Date( row.getValue("date_signed_up"))
			const formattedDate = date.toDateString()
			// const formattedDate = date ? `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}` : '';
			// console.log(formattedDate);
			// console.log(row.getValue("date_signed_up"));
			return (
				<div>
					<span className="w-fit truncate">{formattedDate}</span>
				</div>
			);
		}
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		// accessorKey: "invite",
		header: "Invite",
		cell: ({ row }) => {
			return (
				<Link href={`mailto:${row.getValue("email")}`}>
					<Button variant="default"  className="gap-2">
						<p>Invite{}</p>

						<PaperPlaneIcon width={20} height={20} />
					</Button>
				</Link>
			);
		},
	},
];
