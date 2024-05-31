import { InviteProvider } from "@/components/context/invite-context";
import MobileTopbar from "@/components/dashboard-mobile-topbar";
// import "./globals.css";
import DashboardSidebar from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children, params }: { children: React.ReactNode; params: any }) {
  return (
    <div className="h-screen sm:flex">
      <InviteProvider>
        <MobileTopbar wtSegment={params.waitlist} />
        <DashboardSidebar wtSegment={params.waitlist} />
        {children}
      </InviteProvider>
    </div>
  );
}
