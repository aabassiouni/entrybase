import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AnalyticsPageLoading() {
	return (
		<div className=" min-h-screen grow overflow-y-scroll p-4 ">
			<div className="p-4">
				<div className="p-4">
					<Skeleton className="h-8 w-32" />
				</div>
				<Skeleton className="h-[350px] w-full" />
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
	);
}