import TextLogo from "@/components/text-logo";

function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen sm:flex">
			<main className="flex flex-col-reverse md:!grid w-full sm:grid-cols-2">
				<div className="flex items-center bg-black md:bg-transparent justify-center">{children}</div>
				<div className="flex md:h-full py-10 items-center justify-center bg-black">
					<TextLogo />
				</div>
			</main>
		</div>
	);
}

export default AuthLayout;
