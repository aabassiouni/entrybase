import Link from "next/link";
import { Button } from "./ui/button";

export function SidebarItem({
  icon,
  children,
  href,
}: { icon: React.ReactNode; children: React.ReactNode; href: string }) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="h-10 w-full justify-start gap-2 p-4 text-base active:scale-[98%]">
        <div className="rounded-md bg-gradient-to-b from-[#9AEDCE] to-[#2BC28B] p-0.5">
          <div className={"relative rounded-[calc(0.375rem-0.125rem)] bg-primary p-1 transition-colors"}>{icon}</div>
        </div>
        {children}
      </Button>
    </Link>
  );
}
