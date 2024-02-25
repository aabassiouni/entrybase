import HomeSidebar from "@/components/home-sidebar";
import { MainLayout } from "@/components/layout";
import React from "react";
import HomeMobileTopbar from "@/components/home-mobile-topbar";

function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HomeMobileTopbar />
			<div className="sm:flex">
				<HomeSidebar />
				<MainLayout>{children}</MainLayout>
			</div>
		</>
	);
}

export default HomeLayout;
