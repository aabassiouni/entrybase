"use client";
import FormSubmitButton from "@/components/form-submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TemplateFormProps = {
	disabled: boolean;
	initialValues: {
		subject: string | null;
		header: string | null;
		bodyText: string | null;
	};
	action: (values: { subject: string | null; bodyText: string | null; header: string | null }) => void;
};
const formSchema = z.object({
	subject: z.string().nullable(),
	header: z.string().nullable(),
	bodyText: z.string().nullable(),
});
function TemplateForm({ disabled, initialValues, action }: TemplateFormProps) {
	const form = useForm({
		defaultValues: {
			subject: initialValues.subject ?? "",
			header: initialValues.header ?? "",
			bodyText: initialValues.bodyText ?? "",
		},
		resolver: zodResolver(formSchema),
	});
	async function handleSubmit(values: z.infer<typeof formSchema>) {
		return await action(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					control={form.control}
					name="subject"
					disabled={disabled}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Subject</FormLabel>
							<FormControl>
								<Input
									{...field}
									defaultValue={initialValues?.subject ?? ""}
									disabled={disabled}
									className="my-1 w-1/4"
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="header"
					disabled={disabled}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Header</FormLabel>
							<FormControl>
								<Input
									{...field}
									defaultValue={initialValues.subject ?? ""}
									disabled={disabled}
									className="my-1 w-1/4"
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bodyText"
					disabled={disabled}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Body Text</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									defaultValue={initialValues.bodyText ?? ""}
									disabled={disabled}
									className="h-32 w-full"
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormSubmitButton
					loading={form.formState.isSubmitting}
					className="w-20 dark:bg-primary dark:hover:bg-primary/80"
				>
					Submit
				</FormSubmitButton>
			</form>
		</Form>
	);
}

export default TemplateForm;
