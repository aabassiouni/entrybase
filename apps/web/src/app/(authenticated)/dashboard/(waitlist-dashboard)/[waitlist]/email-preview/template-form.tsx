"use client";
import FormSubmitButton from "@/components/form-submit-button";
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
  submitAction: (values: { subject: string | null; bodyText: string | null; header: string | null }) => void;
  clearAction: () => void;
};
const formSchema = z.object({
  subject: z.string().nullable(),
  header: z.string().nullable(),
  bodyText: z.string().nullable(),
});
function TemplateForm({ disabled, initialValues, submitAction, clearAction }: TemplateFormProps) {
  const form = useForm({
    defaultValues: {
      subject: initialValues.subject ?? "",
      header: initialValues.header ?? "",
      bodyText: initialValues.bodyText ?? "",
    },
    resolver: zodResolver(formSchema),
  });
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    return await submitAction(values);
  }
  async function handleClear() {
    return await clearAction();
  }
  return (
    <Form {...form}>
      <form>
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
                  className="my-1 w-full"
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
              <div className="inline-flex items-center gap-2">
                <FormLabel className="">Header</FormLabel>
              </div>
              <FormControl>
                <div className="">
                  <Input
                    {...field}
                    // onMouseMove={()}
                    defaultValue={initialValues.subject ?? ""}
                    disabled={disabled}
                    className="peer my-1 w-full"
                  />
                </div>
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

        <div className="flex w-full gap-4">
          <FormSubmitButton
            onClick={form.handleSubmit(handleSubmit)}
            loading={form.formState.isSubmitting}
            disabled={disabled}
            className="w-full dark:bg-primary dark:hover:bg-primary/80"
          >
            Submit
          </FormSubmitButton>
          <FormSubmitButton
            loading={form.formState.isSubmitting}
            disabled={disabled}
            onClick={form.handleSubmit(handleClear)}
            className="w-full"
          >
            Reset to default
          </FormSubmitButton>
        </div>
      </form>
    </Form>
  );
}

export default TemplateForm;
