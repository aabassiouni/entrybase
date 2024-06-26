import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useInvites } from "../context/invite-context";
import ExportToCsvButton from "../export-csv-button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const { setInvites } = useInvites();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="items- flex flex-col justify-between gap-4 px-2 py-2">
      <div className="flex- flex items-center gap-3">
        <div className="flex- w-1/2 text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="w-1/2 sm:w-auto">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <ExportToCsvButton className="hidden sm:block" />
        {/* {table.getFilteredSelectedRowModel().rows.length > 0 && ( */}
        <Button
          onClick={() => {
            setInvites(
              table.getFilteredSelectedRowModel().rows.map((row) => {
                //@ts-ignore
                return { email: row.original?.email, id: row.original?.signupID };
              }),
            );
            startTransition(() => {
              router.push("invite");
            });
          }}
          disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          className="h-8 px-3 py-2"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            `Invite ${table.getFilteredSelectedRowModel().rows.length}`
          )}
        </Button>
        {/* )} */}
      </div>
      <div className="flex items-center justify-between gap-6 lg:gap-8">
        <DataTableViewOptions table={table} />
        <div className="flex items-center space-x-2">
          <p className="font-medium text-sm">Show</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          <div className="flex w-[100px] items-center justify-center font-medium text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
