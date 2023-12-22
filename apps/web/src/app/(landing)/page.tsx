// import Link from "next/link";
// import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

function LandingPage() {
	return (
		<div className=" flex-1 ">
			<div className="bg- flex justify-around p-4">
				<p className="text-center text-4xl font-black text-white">waitlister</p>

				<Link href={"/dashboard"}>
					<button className="w- relative inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
						<div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-b from-primary to-[#4BE7AE] opacity-75 blur" />
						Login
					</button>
				</Link>
			</div>

			<div className="relative pb-10">
				<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#4BE7AE_100%)]"></div>
				<div className="flex h-[350px] flex-col items-center justify-center ">
					<div className="flex flex-col items-center justify-center gap-4">
						<h1 className="text-balance w-2/3 text-center text-6xl font-bold text-white">
							Open source waitlist managemanent and analytics platform
						</h1>
						<p className="text-xl text-white">Validate your ideas and ship as fast as you can install</p>
						<Link href={"/dashboard"}>
							<button className="w- relative inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
								<div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-b from-primary to-[#4BE7AE] opacity-75 blur" />
								Get Started For Free
							</button>
						</Link>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="h-[750px] w-2/3 rounded-lg bg-gray-700  p-2">
						<p>image</p>
					</div>
				</div>
			</div>
			<div className="relative h-96 py-10 ">
				<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_90%,#000_40%,#4BE7AE_100%)]"></div>
				{/* <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
					<line x1="50%" y1="0" x2="50%" y2="100%" stroke="#171717" strokeWidth="2" />
				</svg> */}
			</div>
		</div>
	);
}

export default LandingPage;
