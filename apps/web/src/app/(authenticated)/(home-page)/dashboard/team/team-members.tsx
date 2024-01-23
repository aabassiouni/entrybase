"use client";
import { useOrganization } from "@clerk/nextjs";
import React from "react";
import { CardContent } from "../../../../../components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import InviteMemberButton from "./invite-member-button";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
	email: z.string().email(),
});

function TeamMembers() {
	return (
		<CardContent>
			<div className="flex w-full py-4">
				<InviteMemberButton />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Member</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TeamList />
			</Table>
		</CardContent>
	);
}

function TeamList() {
	const { isLoaded, memberships } = useOrganization({
		memberships: { infinite: true },
	});

	if (!isLoaded) {
		return (
			<TableBody>
				<TableRow>
					<TableCell>
						<Skeleton className="h-10 w-32 " />
					</TableCell>
					<TableCell>
						<Skeleton className="h-10 w-32 " />
					</TableCell>	
				</TableRow>
			</TableBody>
		);
	}
	return (
		<TableBody>
			{memberships?.data?.map(({ id, role, publicUserData }) => (
				<TableRow key={id}>
					<TableCell>
						<div className="flex w-full items-center gap-2 max-sm:m-0 max-sm:gap-1 max-sm:text-xs md:flex-grow">
							<Avatar>
								<AvatarImage src={publicUserData.imageUrl} />
								<AvatarFallback>{publicUserData.identifier.slice(0, 2)}</AvatarFallback>
							</Avatar>

							<div className="flex flex-col items-start">
								<span className="text-content font-medium">{`${
									publicUserData.firstName ? publicUserData.firstName : publicUserData.identifier
								} ${publicUserData.lastName ? publicUserData.lastName : ""}`}</span>
								<span className="text-content-subtle text-xs">
									{publicUserData.firstName ? publicUserData.identifier : ""}
								</span>
							</div>
						</div>
					</TableCell>
					<TableCell>
						<RoleSelect member={{ id, role }} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

function RoleSelect({ member }: { member: { id: string; role: string } }) {
	const { organization } = useOrganization();

	function changeRole(value: string) {
		console.log(value);

		try {
			organization?.updateMember({ userId: member.id, role: value });
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Select value={member.role} onValueChange={changeRole}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="org:admin">Admin</SelectItem>
				<SelectItem value="org:member">Member</SelectItem>
			</SelectContent>
		</Select>
	);
}

export default TeamMembers;
