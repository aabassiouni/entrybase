// import "./globals.css";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { InviteProvider } from "@/components/context/invite-context";

export default function DashboardLayout({ children, params }: { children: React.ReactNode, params: any }) {
	console.log("layout params",params)
	return (
		<InviteProvider>
			<DashboardSidebar wtSegment={params.waitlist} />
			{children}
		</InviteProvider>
	);
}
