import { checkWorkspace } from "@/lib/auth";
import { getWaitlistsForUser } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import WaitlistDropdown from "./waitlist-dropdown";

export default async function WaitlistSelect({ className }: { className?: string }) {
  const workspace = await checkWorkspace();

  if (!workspace) {
    return notFound();
  }

  const waitlists = await getWaitlistsForUser(workspace.workspaceID);
  if (waitlists.length === 0) {
    return redirect("/dashboard");
  }

  return <WaitlistDropdown className={className} waitlists={waitlists} />;
}
