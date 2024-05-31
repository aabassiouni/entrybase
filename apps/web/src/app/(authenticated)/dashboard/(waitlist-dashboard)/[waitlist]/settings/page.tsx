import { checkWorkspace } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SettingsPage({ params }: { params: { waitlist: string } }) {
  const { waitlist } = params;
  const _workspace = await checkWorkspace(waitlist);
  return redirect(`/dashboard/${waitlist}/settings/waitlist`);
}

export default SettingsPage;
