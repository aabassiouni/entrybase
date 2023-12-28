import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, SendHorizonal, Trash } from "lucide-react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteButton from "../delete-button";
import { useInvites } from "../context/invite-context";
import { useRouter } from "next/navigation";

function TableActions({ id, email }: { id: string; email: string }) {
	const [open, setOpen] = useState(false);
	const { invites, setInvites } = useInvites();
	const router = useRouter();

	function handleInvite(event: React.MouseEvent<HTMLElement>) {
		event.stopPropagation();
		setInvites([{ email: email, id: id }]);
		router.push(`invite`);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"} size={"icon"}>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent >
					{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
					{/* <DropdownMenuSeparator /> */}
					<DropdownMenuItem onClick={handleInvite}>
						<SendHorizonal className="mr-2 h-3 w-3" />
						<p>Invite</p>
					</DropdownMenuItem>
					<DropdownMenuItem className="dark:focus:bg-red-950 dark:focus:text-red-200 bg-red-900/50 dark:hover:bg-red-950 text-red-200">
						<DeleteButton id={id} open={open} setOpen={setOpen} />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</AlertDialog>
	);
}

export default TableActions;
