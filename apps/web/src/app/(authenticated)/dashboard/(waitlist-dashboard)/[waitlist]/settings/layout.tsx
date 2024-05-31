import { MainLayout } from "@/components/layout";
import TabNav from "@/components/tab-nav";
import { PageHeading } from "@/components/typography";
import type React from "react";

function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      <PageHeading>Settings</PageHeading>
      <TabNav />
      <div className="p-2" />
      {children}
    </MainLayout>
  );
}

export default SettingsLayout;
