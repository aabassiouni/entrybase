import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";
import { useInvites } from "./context/invite-context";
import { Button } from "./ui/button";

function InviteButton({ id, email }: { id: string; email: string }) {
  const { setInvites } = useInvites();
  const router = useRouter();

  function handleInvite() {
    setInvites([{ email: email, id: id }]);
    router.push("invite");
  }

  return (
    <Button onClick={handleInvite} variant="default" className="gap-2">
      <p>Invite</p>
      <PaperPlaneIcon width={20} height={20} />
    </Button>
  );
}

export default InviteButton;
