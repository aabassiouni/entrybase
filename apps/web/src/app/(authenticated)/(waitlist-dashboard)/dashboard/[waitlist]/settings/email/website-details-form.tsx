"use client";

import FormSubmitButton from "@/components/form-submit-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	action: (values: {
		websiteName: string | null;
		websiteLink: string | null;
		supportEmail: string | null;
		brandColor: string | null;
	}) => void;
	websiteDetails: {
		logoFileURL: string | null;
		websiteName: string | null;
		websiteLink: string | null;
		supportEmail: string | null;
		brandColor: string | null;
	};
};

const formSchema = z.object({
	websiteName: z.string().nullable(),
	websiteLink: z.string().nullable(),
	supportEmail: z.string().nullable(),
	brandColor: z
		.string()
		.startsWith("#", {
			message: "Please enter a valid hex color code",
		})
		.min(4)
		.max(7)
		.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
			message: "Please enter a valid hex color code",
		})
		.nullable(),
});

function WebsiteDetailsForm({ action, websiteDetails }: Props) {
	const [color, setColor] = useState(websiteDetails?.brandColor);
	const form = useForm({
		defaultValues: {
			websiteName: websiteDetails?.websiteName ?? "",
			websiteLink: websiteDetails?.websiteLink ?? "",
			supportEmail: websiteDetails?.supportEmail ?? "",
			brandColor: websiteDetails?.brandColor,
		},
		mode: "onChange",
		resolver: zodResolver(formSchema),
	});
	async function handleSubmit(values: z.infer<typeof formSchema>) {
		console.log("submitting form");
		console.log({ values });
		return await action(values);
	}
	async function handleClear(values: z.infer<typeof formSchema>) {
		console.log("clearing form");
		console.log({ values });
		return await action({
			brandColor: null,
			supportEmail: null,
			websiteLink: null,
			websiteName: null,
		});
	}

	return (
		<Form {...form}>
			<div className="flex basis-1/2 flex-col items-center gap-4">
				<div>
					<p className="text-center text-2xl font-bold  ">Website Details</p>
					<p className=" text-center text-sm text-neutral-500 ">Add your website name and links here</p>
				</div>
				<div className="flex gap-4 ">
					<div className="flex flex-col items-start gap-4 self-start">
						<div className="items-center gap-2">
							<FormField
								control={form.control}
								name="websiteName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												className="rounded border border-[#002417] bg-black p-1 px-2"
												placeholder="Website Name"
												// defaultValue={websiteDetails?.websiteName ?? ""}
												// name="websiteName"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className=" items-center gap-2">
							<FormField
								control={form.control}
								name="websiteLink"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website Link</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="url"
												className="rounded border border-[#002417] bg-black p-1 px-2"
												placeholder="Website Link"
												// defaultValue={websiteDetails?.websiteLink ?? ""}
												// name="websiteLink"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className=" items-center gap-2">
							<FormField
								control={form.control}
								name="supportEmail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Support Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="email"
												className="rounded border border-[#002417] bg-black p-1 px-2"
												placeholder="Support Email"
												// defaultValue={websiteDetails?.supportEmail ?? ""}
												// name="supportEmail"
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div>
						<Label>Brand Color</Label>
						<div className="flex flex-col justify-center items-center gap-4">
							<FormField
								control={form.control}
								name="brandColor"
								defaultValue={websiteDetails?.brandColor ?? ""}
								render={({ field: { onChange, value, ...field } }) => (
									<FormItem>
										<FormControl>
											<>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<div
															style={{
																backgroundColor: color ?? undefined,
															}}
															className={cn(
																"flex items-center justify-center mx-auto rounded-xl h-12 w-12 border-2 border-zinc-900 ",
															)}
														>
															{!color && <Ban />}
														</div>
													</DropdownMenuTrigger>
													<DropdownMenuContent side="top">
														<HexColorPicker
															{...field}
															onChange={(color) => {
																console.log("color changed");
																onChange(color);
																setColor(color);
															}}
														/>
													</DropdownMenuContent>
												</DropdownMenu>
												<div className="flex">
													<Input
														type="text"
														className="rounded border border-[#002417] bg-black p-1 px-2"
														placeholder="Brand Color"
														value={value ?? undefined}
														onChange={(e) => {
															onChange(e.target.value);
															setColor(e.target.value);
														}}
														{...field}
													/>
												</div>
											</>
										</FormControl>
										<FormDescription />
										<FormMessage className="w-28 text-center mx-auto text-wrap flex flex-grow-0" />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
				{form.formState.isDirty && (
					<div className="flex gap-4 ">
						<FormSubmitButton
							loading={form.formState.isSubmitting}
							onClick={form.handleSubmit(handleSubmit)}
							type="submit"
							className="w- rounded bg-primary p-2 px-4 text-white"
						>
							Save
						</FormSubmitButton>
						<FormSubmitButton onClick={form.handleSubmit(handleClear)} variant={"outline"} className="w-">
							Reset Values
						</FormSubmitButton>
					</div>
				)}
			</div>
		</Form>
	);
}

export default WebsiteDetailsForm;
