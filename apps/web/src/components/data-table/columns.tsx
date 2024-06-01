"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteButton from "../delete-button";
import InviteButton from "../invite-button";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import TableActions from "./table-actions";

type Signup = {
  signupID: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date | null;
  status: "waiting" | "invited";
};

export const signupColumns: ColumnDef<Signup>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
    meta: { displayName: "Email" },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    enableSorting: false,
    meta: { displayName: "First Name" },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    enableSorting: false,
    meta: { displayName: "Last Name" },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          Signed Up On
          <Button size={"icon"} variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      return (
        <div>
          <span className="w-fit truncate">{formattedDate}</span>
        </div>
      );
    },
    meta: { displayName: "Signed Up On" },
  },
  {
    accessorKey: "status",
    enableHiding: false,
    sortingFn: (a, b) => {
      if (a.getValue("status") === "waiting" && b.getValue("status") === "invited") return -1;
      if (a.getValue("status") === "invited" && b.getValue("status") === "waiting") return 1;
      return 0;
    },
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("status") as string;
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

      return <span className="inline-flex px-4">{capitalizedValue}</span>;
    },
    meta: { displayName: "Status" },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableActions id={row.original.signupID} email={row.original.email} />;
    },
  },
];
