import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AnalyticsPageLoading() {
	return (
		<div className=" min-h-screen grow overflow-y-scroll">
			<div className="p-12 pt-8">
				<h1 className="scroll-m-20 py-2 text-3xl font-bold tracking-tight lg:text-4xl">Analytics</h1>
				<Separator />
				<div className="py-4">
					<Skeleton className="h-8 w-40" />
				</div>
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
			</div>
		</div>
	);
}
