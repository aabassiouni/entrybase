import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
function DataTableViewOptionsLoading() {
    return (
        <Skeleton className="h-8 w-36" />
    )
}
function DataTablePaginationLoading() {
    return (
        <div className="flex items-center justify-between px-2 py-2">
			<div className="text-muted-foreground flex-1 text-sm">
				<Skeleton className="h-8 w-32" />
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<Skeleton className="h-8 w-96" />
			</div>
		</div>
    )
}
function DataTableLoading() {
	return (
		<>
            <DataTablePaginationLoading />
			<div className="rounded-md border border-gray-800 ">
				<Table className="">
					<TableHeader className="">
						<TableRow>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
							<TableHead>
								<Skeleton className="h-8 w-16" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="">
						{[...Array(10)].map((_, i) => (
							<TableRow>
								{[...Array(6)].map((_, i) => (
									<TableCell className="h-20">
										<Skeleton className="h-8 w-32" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
function UsersPageLoading() {
	return (
		<main className="flex min-h-screen w-full flex-col overflow-y-scroll p-4">
			<h1 className="text-3xl">Signups</h1>
			<Separator className="my-4" />
			{/* <div className="w-full rounded-md border overflow-y-scroll"> */}
			{/* <DataTable columns={signupColumns} data={signupList} /> */}
			<DataTableLoading />
			{/* </div> */}
		</main>
	);
}

export default UsersPageLoading;
