import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<main className="grid w-full grid-cols-2">
			<div className="flex items-center justify-center">
				<SignIn />
			</div>
			<div className="flex items-center justify-center bg-black">
				<h1 className=" text-4xl font-black">waitlister</h1>
			</div>
		</main>
	);
}
