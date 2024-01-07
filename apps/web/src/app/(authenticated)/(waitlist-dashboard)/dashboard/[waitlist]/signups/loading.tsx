import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { PageHeading } from "@/components/typography";
import { MainLayout } from "@/components/layout";
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
							<TableRow key={i}>
								{[...Array(6)].map((_, i) => (
									<TableCell key={i} className="h-20">
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
		<MainLayout >
			<PageHeading>Signups</PageHeading>
			<DataTableLoading />
		</MainLayout>
	);
}

export default UsersPageLoading;
