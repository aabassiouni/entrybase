import { AnimatedChart } from "@/components/landing/animated-chart";
import {
	GradientBorderCard,
	GradientBorderCardDescription,
	GradientBorderCardTitle,
} from "@/components/landing/gradient-border-card";
import "@/components/landing/landing.css";
import { StyledButton } from "@/components/styled-button";
import TextLogo from "@/components/text-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CursorArrowIcon, GitHubLogoIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import homepageImg from "/public/homepage.png";
import apiBentoImg from "./apiBentoImg.png";
import invitationBentoImg from "./invitationBentoImg.png";

function LandingPage() {
	return (
		<div className="sm:flex-1">
			<div className="bg- flex items-center justify-around p-4">
				<TextLogo className="text-white" />
				{process.env.NODE_ENV === "development" ? (
					<Link href={"/dashboard"}>
						<StyledButton>Login</StyledButton>
					</Link>
				) : (
					<Button className="invisible" />
				)}
			</div>
			<div className="relative px-4 pb-10">
				<div className="-z-10 absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#020705_40%,#4BE7AE_100%)]" />
				<div className="flex h-[350px] flex-col items-center justify-center">
					<div className="flex flex-col items-center justify-center gap-4">
						<div className="-z-10 absolute h-full w-full bg-[radial-gradient(#1c1917_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
						<h1 className="text-balance bg-gradient-to-t from-white to-primary bg-clip-text text-center font-bold font-clash-grotesk text-4xl text-transparent tracking-wide sm:h-[2.1em] sm:w-2/3 sm:text-6xl">
							Open source waitlist management and analytics platform
						</h1>
						<p className="text-center text-lg text-white sm:text-xl">
							Validate your ideas fast. Ship even faster.
						</p>
						<form action="/signup">
							<div className="flex items-center gap-2">
								<Input className="h-12 border-primary bg-[#071711] text-white" />
								<StyledButton>Join Waitlist </StyledButton>
							</div>
						</form>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="sm:block sm:w-3/4">
						<Image
							className="mx-auto rounded-3xl border-4 border-neutral-700 shadow-md"
							src={homepageImg}
							alt="homepage"
							priority={true}
							placeholder="blur"
						/>
					</div>
				</div>
			</div>
			<div className="h- relative flex flex-col items-center sm:py-16">
				<div className="-z-10 absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_90%,#020705_40%,#4BE7AE_100%)]" />
			</div>
			{/* <div className="mx-auto max-w-screen-lg py-24">
				<div className="space-y-4 ">
					<h1 className="text-balance text-center text-5xl font-bold text-white">
						Seamless Invite Management
					</h1>
					<p className="text-balance text-center text-xl text-neutral-400 ">
						Entrybase lets you take control of your waitlist and choose who you want to invite and when.
						Launch on your terms
					</p>
					<div className="h-96 bg-gray-800">asdf</div>
				</div>
			</div> */}
			<div className="mx-auto max-w-screen-lg space-y-8 px-4 py-16">
				<div className="space-y-2">
					<h1 className="text-balance text-center font-bold font-clash-grotesk text-5xl text-white tracking-wide">
						How it works
					</h1>
					<p className="text-balance text-center text-lg text-neutral-400 sm:text-xl">
						Entrybase lets you take control of your waitlist and choose who you want to invite and when.
						Launch on your terms.
					</p>
				</div>
				<ul className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
					<li className="group relative flex sm:flex-col sm:items-center sm:text-center">
						<span
							className="absolute top-[68px] left-[32px] h-[calc(100%-40px)] w-px bg-neutral-700 sm:top-[32px] sm:left-[calc(50%+38px)] sm:h-px sm:w-[calc(100%-76px)]"
							aria-hidden="true"
						/>
						<div className="relative flex h-16 w-16 rounded-xl p-[1px] shadow-primary backdrop-blur-3xl sm:overflow-hidden">
							<span className="absolute inset-[-1000%] aspect-square h-16 w-16 bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)] sm:h-auto sm:w-auto" />
							<div className="flex aspect-square h-full w-full flex-col justify-end gap-4 rounded-xl bg-neutral-900 p-4 backdrop-blur-3xl">
								<svg
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
						<div className="ml-6 flex flex-col gap-2 sm:pt-6">
							<p className="font-medium text-lg text-zinc-200">Create Waitlist</p>
							<p className="text-neutral-500 sm:max-w-xs">
								Just paste or type the URL of the website you want to save, and your bookmark will be
								instantly stored.
							</p>
						</div>
					</li>
					<li className="group relative flex sm:flex-col sm:items-center sm:text-center">
						<span
							className="absolute top-[68px] left-[32px] h-[calc(100%-40px)] w-px bg-neutral-700 sm:top-[32px] sm:left-[calc(50%+38px)] sm:h-px sm:w-[calc(100%-76px)]"
							aria-hidden="true"
						/>
						<div className="relative flex h-16 w-16 rounded-xl p-[1px] shadow-primary backdrop-blur-3xl sm:overflow-hidden">
							<span className="absolute inset-[-1000%] aspect-square h-16 w-16 bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)] sm:h-auto sm:w-auto" />
							<div className="flex aspect-square h-full w-full flex-col justify-end gap-4 rounded-xl bg-neutral-900 p-4 backdrop-blur-3xl">
								<svg
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
						<div className="ml-6 space-y-2 sm:ml-0 sm:pt-6">
							<p className="font-medium text-lg text-zinc-200">Integrate API</p>
							<p className="text-neutral-500 sm:max-w-xs">
								Add custom tags to each bookmark, making it a breeze to find and access your most
								treasured pages.
							</p>
						</div>
					</li>
					<li className="group relative flex sm:flex-col sm:items-center sm:text-center">
						<div className="relative flex h-16 w-16 rounded-xl shadow-primary backdrop-blur-3xl sm:overflow-hidden sm:p-[1px]">
							<span className="absolute inset-[-1000%] aspect-square h-16 w-16 bg-[conic-gradient(from_90deg_at_50%_50%,#4BE7AE_0%,#043E29_50%,#4BE7AE_100%)] sm:h-auto sm:w-auto" />
							<div className="flex aspect-square h-full w-full flex-col justify-end gap-4 rounded-xl bg-neutral-900 p-4 backdrop-blur-3xl">
								<PaperPlaneIcon className="h-8 w-8 text-primary" />
							</div>
						</div>
						<div className="ml-6 space-y-2 sm:ml-0 sm:pt-6">
							<p className="font-medium text-lg text-zinc-200">Invite Signups</p>
							<p className="text-neutral-500 sm:max-w-xs">
								Easily filter your bookmarks by tags or experience lightning-fast searching with the
								command menu.
							</p>
						</div>
					</li>
				</ul>
			</div>
			<div className="flex justify-center px-4 pb-8">
				<div className="grid max-w-screen-lg flex-1 grid-cols-1 grid-rows-4 gap-4 sm:grid-cols-5 sm:grid-rows-5">
					<GradientBorderCard
						flexdir={"flex-col-reverse"}
						className="col animated-chart col-span-1 sm:col-span-2 sm:row-span-2"
					>
						<div className="overflow-hidden rounded bg-tinted-black p-4 blur-box sm:overflow-auto">
							<AnimatedChart />
						</div>
						<div>
							<GradientBorderCardTitle>In-Depth Analytics</GradientBorderCardTitle>
							<GradientBorderCardDescription>
								Harness rich analytics for deeper insights. Make data-driven decisions to refine your
								waitlist strategy.
							</GradientBorderCardDescription>
						</div>
					</GradientBorderCard>
					<GradientBorderCard flexdir="flex-col" className="sm:col-span-3 sm:row-span-2">
						<div>
							<GradientBorderCardTitle>Custom Invitations</GradientBorderCardTitle>
							<GradientBorderCardDescription>
								Craft tailored invitations that resonate with your audience. With customizable
								templates, your invites will always hit the right note.
							</GradientBorderCardDescription>
						</div>
						<div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]" />
						<div className="flex flex-1 items-center justify-center">
							<Image className="z-10" src={invitationBentoImg} width={400} alt="api" />
						</div>
					</GradientBorderCard>
					<GradientBorderCard flexdir="flex-col-reverse" className="sm:col-span-3 sm:row-span-2">
						<div className="flex h-full items-center justify-center bg-rd-600">
							<div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
							<Image className="z-10" src={apiBentoImg} width={400} alt="api" />
						</div>
						<div>
							<GradientBorderCardTitle>Seamless API Integration</GradientBorderCardTitle>
							<GradientBorderCardDescription>
								Add to your existing workflow with our API. Seamlessly integrate your waitlist into your
								website or app.
							</GradientBorderCardDescription>
						</div>
					</GradientBorderCard>
					<GradientBorderCard flexdir="flex-col" className="sm:col-span-2 sm:row-span-2">
						<div>
							<GradientBorderCardTitle>Custom Domains</GradientBorderCardTitle>
							<GradientBorderCardDescription>
								Seamlessly integrate your waitlist into your website with custom domains. Provide a
								consistent, professional look across your digital presence.
							</GradientBorderCardDescription>
						</div>
						<div className="group relative flex-1">
							<div className="inline-flex h-12 w-3/4 animate-input items-center justify-center rounded-2xl border-2 border-zinc-800 bg-tinted-black p-2 text-center">
								<p className="text-neutral-500 text-xl">you@yourdomain.com</p>
							</div>
							<CursorArrowIcon className="absolute top-1/2 right-1/4 h-8 w-8 animate-cursor justify-end text-neutral-300" />
						</div>
					</GradientBorderCard>
				</div>
			</div>
			<div className="mx-auto max-w-screen-lg space-y-8 px-4 pb-16 sm:px-0">
				<div className="flex flex-col gap-10">
					<div className="space-y-2">
						<h1 className="text-balance text-center font-bold font-clash-grotesk text-5xl text-white tracking-wide">
							Fully Open Source
						</h1>
						<p className="text-balance text-center text-neutral-400 sm:text-xl">
							Fully open source. We believe in the power of open source and the community. Feel free to
							review, learn from, and contribute to our codebase.
						</p>
					</div>
					<div className="self-center">
						<Link href={"https://github.com/aabassiouni/entrybase"}>
							<button
								type="button"
								className="relative inline-flex h-12 animate-background-shine items-center justify-center gap-2 rounded-md border border-primary bg-[length:200%_100%] bg-[linear-gradient(110deg,#000103,45%,#4BE7AE,55%,#000103)] px-6 font-medium text-slate-400 transition-colors"
							>
								<div className="-inset-1 -z-10 absolute rounded-lg bg-gradient-to-b from-primary to-[#4BE7AE] opacity-75 blur" />
								<GitHubLogoIcon className="h-6 w-6 text-white" />
								<p className="font-semibold text-white">Star On GitHub</p>
							</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="bg-tinted-black p-24">
				<div className="mx-auto flex max-w-screen-lg flex-col items-center justify-between gap-4 sm:flex-row">
					<TextLogo className="text-white" />
					<div className="flex justify-center gap-2">
						<Link href={"https://github.com/aabassiouni/entrybase"}>
							<GitHubLogoIcon className="h-6 w-6 text-white" />
						</Link>
						<svg
							width="24"
							height="24"
							viewBox="0 0 1200 1227"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
								fill="white"
							/>
						</svg>
					</div>
					<div>
						<p className="text-center text-neutral-500">©2024 Entrybase. All rights reserved.</p>
						<div className="flex items-center justify-center gap-4">
							<Link href={"/privacy"}>
								<p className="cursor-pointer text-center text-neutral-500">Privacy Policy</p>
							</Link>
							<Link href={"/terms"}>
								<p className="cursor-pointer text-center text-neutral-500">Terms of Service</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
