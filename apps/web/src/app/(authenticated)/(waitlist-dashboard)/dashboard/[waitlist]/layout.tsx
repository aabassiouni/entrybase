// import "./globals.css";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { InviteProvider } from "@/components/context/invite-context";
import MobileTopbar from "@/components/dashboard-mobile-topbar";

export default function DashboardLayout({ children, params }: { children: React.ReactNode; params: any }) {
	return (
		<div className="sm:flex h-screen">
			<InviteProvider>
				<MobileTopbar wtSegment={params.waitlist} />
				<DashboardSidebar wtSegment={params.waitlist} />
				{children}
			</InviteProvider>
		</div>
	);
}
