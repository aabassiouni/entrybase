import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreditCard, Menu, User, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import SidebarUserButton from "./sidebar-user-button";
import TeamSelect from "./team-select";
import { Separator } from "./ui/separator";

function HomeMobileTopbar() {
  const iconProps = { className: "text-secondary", width: "1.125rem", height: "1.125rem" };

  const settingsLinks = [
    {
      name: "Account",
      icon: <User {...iconProps} />,
      href: "/dashboard/account",
    },
    {
      name: "Billing",
      icon: <CreditCard {...iconProps} />,
      href: "/dashboard/billing",
    },
    {
      name: "Team",
      icon: <Users {...iconProps} />,
      href: "/dashboard/team",
    },
  ];

  return (
    <div className="sm:!hidden flex items-center gap-2 rounded-b-2xl border-neutral-800 border-b bg-black px-4 py-6">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="rounded-t-3xl border-neutral-800 border-b" side="bottom">
          <p className="p self-start px-3 font-medium text-neutral-400 text-sm">General</p>
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

export default HomeMobileTopbar;
