import { cn } from "@/lib/utils";

export function GradientBorderCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"group hover:z-10 relative h-full overflow-hidden rounded p-[1px] shadow-primary backdrop-blur-3xl",
				className,
			)}
		>
			<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)]" />
			<div
				className="flex h-full w-full flex-col justify-end gap-4 rounded bg-neutral-900 p-4 backdrop-blur-3xl"
				{...props}
			/>
		</div>
	);
}

export function GradientBorderCardTitle({ ...props }) {
	return <p className="text-3xl text-[#D3FDEE] font-bold " {...props} />;
}

export function GradientBorderCardDescription({ ...props }) {
	return <p className="w-80 text-sm text-neutral-500 " {...props} />;
}

export function GradientBorderCardContent({ ...props }) {
	return <div className="rounded bg-black p-4" {...props} />;
}
