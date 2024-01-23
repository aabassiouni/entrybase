import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";

const formSchema = z.object({
	email: z.string().email(),
});

function InviteMemberButton() {
	const { organization } = useOrganization();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function handleFormSubmit(values: z.infer<typeof formSchema>) {
		console.log("submitting form");
		console.log("wut");
		console.log(values.email);

		try {
			await organization?.inviteMember({
				emailAddress: values.email,
				role: "org:member",
			});

			// toast.success(`We have sent an email to ${values.email} with instructions on how to join your workspace`);
			// router.refresh();
		} catch (err) {
			console.error(err);
			// toast.error((err as Error).message);
		} finally {
			// setLoading(false);
		}
		// console.log(email);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<UserPlus className="mr-2" />
					Invite member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite a user to your team</DialogTitle>
					<DialogDescription>
						Enter a users email to invite them to your pro workspace. They will be able to view your
						waitlists and manage your signups.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="ghost">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit">Send invite</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default InviteMemberButton;
