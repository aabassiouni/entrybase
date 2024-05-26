import { redirect } from "next/navigation";

function HomeSettingsPage() {
  return redirect("/dashboard/settings/billing");
}

export default HomeSettingsPage;
