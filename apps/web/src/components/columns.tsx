"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Generation = {
	generation_id_uuid?: string;
	user_id?: string;
	repo_name?: string;
	timestamp?: string;
	generated_text?: string;
	bullets?: string;
	rating?: number;
};

type Signup = {
	email?: string;
	date_signed_up?: string;
	invited: boolean;
};

type Error = {
	error_id?: string;
	clerk_user_id?: string;
	generation_id?: string;
	repo_name?: string;
	error_message?: string;
	error_type?: string;
	timestamp?: string;
};

export const signupColumns: ColumnDef<Signup>[] = [
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
		accessorKey: "date_signed_up",
		header: "Signed Up On",
	},
	{
		accessorKey: "invited",
		header: "Invited",
	},
	{
		header: "Invite",
		cell: ({ row }) => {
			return (
				<Button variant="default" className="gap-2">
					<p>Invite</p>
					<PaperPlaneIcon width={20} height={20} />
				</Button>
			);
		},
	},
];
