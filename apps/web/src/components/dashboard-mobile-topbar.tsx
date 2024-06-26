import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Archive, Home, LineChart, List, Mail, Menu, SendHorizonal, Settings } from "lucide-react";
import { Suspense } from "react";
import { SidebarItem } from "./sidebar-item";
import SidebarUserButton from "./sidebar-user-button";
import TeamSelect from "./team-select";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import WaitlistSelect from "./waitlist-select";

function WaitlistSelectLoading() {
  return (
    <>
      <div className="w-full p-4">
        <Skeleton className="h-10" />
      </div>
    </>
  );
}
function MobileTopbar({ wtSegment }: { wtSegment: string }) {
  const iconProps = { className: "text-secondary", width: "1.125rem", height: "1.125rem" };

  const generalLinks = [
    {
      name: "Home",
      icon: <Home {...iconProps} />,
      href: `/dashboard/${wtSegment}`,
    },
    {
      name: "Signups",
      icon: <List {...iconProps} />,
      href: `/dashboard/${wtSegment}/signups`,
    },
    {
      name: "Analytics",
      icon: <LineChart {...iconProps} />,
      href: `/dashboard/${wtSegment}/analytics`,
    },
  ];
  const inviteLinks = [
    {
      name: "Invite",
      icon: <SendHorizonal {...iconProps} />,
      href: `/dashboard/${wtSegment}/invite`,
    },
    {
      name: "Sent Invites",
      icon: <Archive {...iconProps} />,
      href: `/dashboard/${wtSegment}/sent-invites`,
    },
    {
      name: "Email Preview",
      icon: <Mail {...iconProps} />,
      href: `/dashboard/${wtSegment}/email-preview`,
    },
  ];
  const settingsLinks = [
    {
      name: "Waitlist Settings",
      icon: <Settings {...iconProps} />,
      href: `/dashboard/${wtSegment}/settings`,
    },
  ];
  return (
    <div className="flex items-center gap-2 rounded-b-2xl border-neutral-800 border-b bg-black px-4 py-6 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="rounded-t-3xl border-neutral-800 border-b" side="bottom">
          <Suspense fallback={<WaitlistSelectLoading />}>
            <WaitlistSelect />
          </Suspense>
          <p className="p self-start px-3 font-medium text-neutral-400 text-sm">General</p>
          {generalLinks.map((item, i) => (
            <SidebarItem key={i} icon={item.icon} href={item.href}>
              <span className="">{item.name}</span>
            </SidebarItem>
          ))}
          <p className="p self-start px-3 font-medium text-neutral-400 text-sm">Invite</p>
          {inviteLinks.map((item, i) => (
            <SidebarItem key={i} icon={item.icon} href={item.href}>
              {item.name}
            </SidebarItem>
          ))}
          <p className="p self-start px-3 font-medium text-neutral-400 text-sm">Settings</p>
          {settingsLinks.map((item, i) => (
            <SidebarItem key={i} icon={item.icon} href={item.href}>
              {item.name}
            </SidebarItem>
          ))}
          <div className="w-full">
            <Separator className="my-4" />
            <SidebarUserButton />
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-between">
        <h1 className="text-center font-black text-4xl">w</h1>
        <TeamSelect className="w-1/2 p-0" />
      </div>
    </div>
  );
}

export default MobileTopbar;
