import HomeSidebar from "@/components/home-sidebar";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HomeSidebar />
			<MainLayout>
				{children}
			</MainLayout>
		</>
	);
}

export default HomeLayout;
