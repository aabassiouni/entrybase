import Link from "next/link";
import { Button } from "./ui/button";

export function SidebarItem({
  icon,
  children,
  href,
}: { icon: React.ReactNode; children: React.ReactNode; href: string }) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="h-10 w-full justify-start gap-2 p-4 text-base">
        <div className="rounded-md bg-primary p-1">{icon}</div>
        {children}
      </Button>
    </Link>
  );
}
