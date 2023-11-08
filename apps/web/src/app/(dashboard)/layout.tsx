// import "./globals.css";
import DashboardSidebar from "../../components/dashboard-sidebar";
import { InviteProvider } from "@/components/context/invite-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<InviteProvider>
			<DashboardSidebar />
			{children}
		</InviteProvider>
	);
}
