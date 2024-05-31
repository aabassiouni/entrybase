import HomeMobileTopbar from "@/components/home-mobile-topbar";
import HomeSidebar from "@/components/home-sidebar";
import { MainLayout } from "@/components/layout";
import type React from "react";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeMobileTopbar />
      <div className="h-screen sm:flex">
        <HomeSidebar />
        <MainLayout>{children}</MainLayout>
      </div>
    </>
  );
}

export default HomeLayout;
