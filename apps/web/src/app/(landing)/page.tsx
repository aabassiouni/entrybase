// import Link from "next/link";
// import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import homepageImg from "/public/homepage.png";
import {
	GradientBorderCard,
	GradientBorderCardTitle,
	GradientBorderCardDescription,
	GradientBorderCardContent,
} from "@/components/landing/gradient-border-card";
import "@/components/landing/landing.css";
import { AnimatedChart } from "@/components/landing/animated-chart";
import { Separator } from "@/components/ui/separator";
import { CursorArrowIcon, GitHubLogoIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

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
						<div className="absolute -z-10 h-full w-full bg-[radial-gradient(#1c1917_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
						<h1 className="h-[2.1em] w-2/3 text-balance bg-gradient-to-t from-white to-primary bg-clip-text  text-center text-6xl font-bold text-transparent ">
							Open source waitlist managemanent and analytics platform
						</h1>
						<p className="text-xl text-white">Validate your ideas and ship as fast as you can install</p>
						{/* <Link href={"/dashboard"}>
							<button className="w- relative inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
								<div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-b from-primary to-[#4BE7AE] opacity-75 blur" />
								Get Started For Free
							</button>
						</Link> */}
						<div className="flex">
							<input
								type="email"
								className="h-12 rounded-lg rounded-r-none border border-r-0 border-primary bg-neutral-800 px-2 text-white"
							/>
							<button className="h-12 w-20 rounded-r-lg bg-primary text-sm font-semibold">
								Join Waitlist
							</button>
						</div>
					</div>
				</div>
				<div className=" flex items-center justify-center">
					<div className="hidden sm:block sm:w-3/4">
						<Image
							className="mx-auto rounded-3xl border-4  border-neutral-700 shadow-md "
							src={homepageImg}
							alt="homepage"
							priority={true}
							placeholder="blur"
						/>
					</div>
				</div>
			</div>
			<div className="h- relative flex flex-col  items-center py-16 ">
				<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_90%,#000_40%,#4BE7AE_100%)]"></div>
			</div>
			{/* <div className="mx-auto max-w-screen-lg py-24">
				<div className="space-y-4 ">
					<h1 className="text-balance text-center text-5xl font-bold text-white">
						Seamless Invite Management
					</h1>
					<p className="text-balance text-center text-xl text-neutral-400 ">
						Waitlister lets you take control of your waitlist and choose who you want to invite and when.
						Launch on your terms
					</p>
					<div className="h-96  bg-gray-800">asdf</div>
				</div>
			</div> */}
			<div className="mx-auto max-w-screen-lg space-y-8 py-16">
				<div className="space-y-2">
					<h1 className="text-balance text-center text-5xl font-bold text-white">How it works</h1>
					<p className="text-balance text-center text-xl text-neutral-400 ">
						Waitlister lets you take control of your waitlist and choose who you want to invite and when.
						Launch on your terms.
					</p>
				</div>
				<ul className="grid w-full grid-cols-1 gap-0 sm:grid-cols-3">
					<li className="group relative  flex sm:flex-col sm:items-center sm:text-center">
						<span
							className="absolute left-[calc(50%+38px)] top-[32px] h-px w-[calc(100%-76px)] bg-neutral-700"
							aria-hidden="true"
						></span>
						<div className="relative h-16 w-16 overflow-hidden rounded-xl p-[1px] shadow-primary backdrop-blur-3xl">
							<span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)]" />
							<div className="flex h-full w-full flex-col justify-end gap-4 rounded-xl bg-neutral-900 p-4 backdrop-blur-3xl">
								<svg
									// dataSlot="icon"
									fill="none"
									strokeWidth={1.5}
									stroke="#4BE7AE"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
									/>
								</svg>
							</div>
						</div>
						<div className="space-y-2 pt-6">
							<p className="text-lg font-medium text-zinc-200">Create Waitlist</p>
							<p className="text-neutral-500 sm:max-w-xs">
								Just paste or type the URL of the website you want to save, and your bookmark will be
								instantly stored.
							</p>
						</div>
					</li>
					<li className="group relative flex sm:flex-col sm:items-center sm:text-center">
						<span
							className="absolute left-[calc(50%+38px)] top-[32px] h-px w-[calc(100%-76px)] bg-neutral-700"
							aria-hidden="true"
						></span>
						<div className=" relative h-16 w-16 overflow-hidden rounded-xl p-[1px] shadow-primary backdrop-blur-3xl">
							<span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)]" />
							<div className="flex h-full w-full flex-col justify-end gap-4 rounded-xl bg-neutral-900 p-4 backdrop-blur-3xl">
								<svg
									// dataSlot="icon"
									fill="none"
									strokeWidth={1.5}
									stroke="#4BE7AE"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
									/>
								</svg>
							</div>
						</div>
						<div className="space-y-2 pt-6">
							<p className="text-lg font-medium text-zinc-200">Integrate API</p>
							<p className="text-neutral-500 sm:max-w-xs">
								Add custom tags to each bookmark, making it a breeze to find and access your most
								treasured pages.
							</p>
						</div>
					</li>
					<li className="group relative flex sm:flex-col sm:items-center sm:text-center">
						<div className=" relative h-16 w-16 overflow-hidden rounded-xl p-[1px] shadow-primary backdrop-blur-3xl">
							<span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)]" />
							<div className="flex h-full w-full flex-col justify-end gap-4 rounded-xl bg-neutral-900 p-4 backdrop-blur-3xl">
								<PaperPlaneIcon className="h-8 w-8 text-primary" />
							</div>
						</div>
						<div className="space-y-2 pt-6">
							<p className="text-lg font-medium text-zinc-200">Invite Signups</p>
							<p className="text-neutral-500 sm:max-w-xs">
								Easily filter your bookmarks by tags or experience lightning-fast searching with the
								command menu.
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div className="flex justify-center pb-8 ">
				<div className="grid max-w-screen-lg flex-1 grid-cols-5 grid-rows-5 gap-4 ">
					<GradientBorderCard className="col-span-2 row-span-2">
						<div className="blur-box rounded bg-black p-4">
							<AnimatedChart />
						</div>
						<GradientBorderCardTitle>In-Depth Analytics</GradientBorderCardTitle>
						<GradientBorderCardDescription>
							Harness rich analytics for deeper insights. Make data-driven decisions to refine your
							waitlist strategy.
						</GradientBorderCardDescription>
					</GradientBorderCard>
					<GradientBorderCard className="col-span-3 row-span-2">
						<GradientBorderCardTitle>Custom Invitations</GradientBorderCardTitle>
						<GradientBorderCardDescription>
							Craft tailored invitations that resonate with your audience. With customizable templates,
							your invites will always hit the right note.
						</GradientBorderCardDescription>
						<div className="flex flex-1 items-center  ">
							<div className="h-full w-36 rounded-xl bg-black p-1">
								<div className="h-full w-full rounded-[8px] bg-black p-4">
									<p className=" w-fit rounded bg-neutral-800 p-1 font-medium text-primary">
										Acme Inc.
									</p>
									<div className="p-2"></div>
									<div className="space-y-4 *:bg-primary">
										<Separator />
										<Separator />
										<Separator />
										<Separator />
										<Separator />
										<Separator />
									</div>
								</div>
							</div>
						</div>
					</GradientBorderCard>
					<GradientBorderCard className="col-span-3 row-span-2">
						<GradientBorderCardTitle>Seamless API Integration</GradientBorderCardTitle>
						<GradientBorderCardDescription>
							Add to your existing workflow with our API. Seamlessly integrate your waitlist into your
							website or app.
						</GradientBorderCardDescription>
					</GradientBorderCard>
					<GradientBorderCard className="col-span-2 row-span-2">
						<GradientBorderCardTitle>Custom Domains</GradientBorderCardTitle>
						<GradientBorderCardDescription>
							Seamlessly integrate your waitlist into your website with custom domains. Provide a
							consistent, professional look across your digital presence.
						</GradientBorderCardDescription>
						<div className="group relative flex-1">
							<div className="group-hover:animate-domain-link-in animate-domain-link-out inline-flex h-12 w-3/4  items-center justify-center rounded-2xl border-2 border-zinc-800 bg-black p-2 text-center">
								<p className="text-xl text-neutral-500">you@yourdomain.com</p>
							</div>
							<CursorArrowIcon className="group-hover:animate-domain-cursor-in animate-domain-cursor-out absolute right-1/4 top-1/2 h-8 w-8  justify-end text-neutral-300" />
						</div>
					</GradientBorderCard>
				</div>
			</div>
			<div className="mx-auto max-w-screen-lg space-y-8 pb-16">
				<div className="flex flex-col gap-10">
					<div className="space-y-2">
						<h1 className="text-balance text-center text-5xl font-bold text-white">Fully Open Source</h1>
						<p className="text-balance text-center text-xl text-neutral-400 ">
							Fully open source. We believe in the power of open source and the community. Feel free to
							review, learn from, and contribute to our codebase.
						</p>
					</div>
					<div className="self-center">
						<Link href={"https://github.com/aabassiouni/waitlister"}>
							{/* <div className="flex w-fit items-center gap-2 rounded bg-zinc-900 p-2">
								<GitHubLogoIcon className="h-6 w-6 text-white" />
								<p className="font-semibold text-white">Star On GitHub</p>
							</div> */}
							<button className="animate-background-shine inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary bg-[linear-gradient(110deg,#000103,45%,#4BE7AE,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors">
								<GitHubLogoIcon className="h-6 w-6 text-white" />
								<p className="font-semibold text-white">Star On GitHub</p>
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="h-1/3 bg-neutral-950"></div>
		</div>
	);
}

export default LandingPage;
