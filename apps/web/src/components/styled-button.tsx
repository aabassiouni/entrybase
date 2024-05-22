import { cn } from "@/lib/utils";

export function StyledButton({
	children,
	className,
	...props
}: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			className={"rounded-md bg-gradient-to-b from-[#9AEDCE] to-[#2BC28B] p-0.5 active:scale-[98%]"}
			{...props}
		>
			<div
				className={cn(
					"relative inline-flex h-12 items-center justify-center rounded-[calc(0.375rem-0.125rem)] bg-primary px-6 font-medium text-[#071711] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
					className,
				)}
			>
				<div className="-inset-1 -z-10 absolute rounded-lg bg-gradient-to-b from-primary to-[#4BE7AE] opacity-75 blur" />
				{children}
			</div>
		</button>
	);
}
