import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useInvites } from "../context/invite-context";
import DeleteButton from "../delete-button";
import { Button } from "../ui/button";

function TableActions({ id, email }: { id: string; email: string }) {
  const [open, setOpen] = useState(false);
  const { setInvites } = useInvites();
  const router = useRouter();

  function handleInvite(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setInvites([{ email: email, id: id }]);
    router.push("invite");
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleInvite}>
            <SendHorizonal className="mr-2 h-3 w-3" />
            <p>Invite</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-red-900/50 text-red-200 dark:focus:bg-red-950 dark:hover:bg-red-950 dark:focus:text-red-200">
            <DeleteButton id={id} open={open} setOpen={setOpen} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  );
}

export default TableActions;
