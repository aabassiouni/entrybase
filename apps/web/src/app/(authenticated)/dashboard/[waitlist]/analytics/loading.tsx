import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AnalyticsPageLoading() {
	return (
		<MainLayout>
			<PageHeading>Analytics</PageHeading>
			<Skeleton className="h-10 py-2 w-40" />
			<div className="p-2"></div>
			<Skeleton className="h-[420px] w-full" />
			<div className="py-4">
				<div className="rounded-md border border-gray-800">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<Skeleton className="h-8 w-16" />
								</TableHead>
								<TableHead>
									<Skeleton className="h-8 w-16" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[...Array(5)].map((_, i) => (
								<TableRow className="" key={i}>
									<TableCell>
										<Skeleton className="h-8 w-32" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-8 w-32" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</MainLayout>
	);
}
