"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth, useOrganization } from "@clerk/nextjs";
import type { OrganizationInvitationResource } from "@clerk/types";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import InviteMemberButton from "./invite-member-button";

function TeamsContent() {
  const { membership } = useOrganization();
  return (
    <Tabs defaultValue="team" className="w-full">
      <div className="flex gap-4 pt-4">
        <TabsList>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
        </TabsList>
        {membership?.role === "org:admin" && <InviteMemberButton />}
      </div>
      <TabsContent value="team">
        <TeamMembers />
      </TabsContent>
      <TabsContent value="invites">
        <TeamInvites />
      </TabsContent>
    </Tabs>
  );
}

function TeamMembers() {
  const { isLoaded, memberships } = useOrganization({
    memberships: { infinite: true },
  });

  if (!isLoaded) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-8 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-32" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships?.data?.map(({ id, role, publicUserData }) => (
          <TableRow key={id}>
            <TableCell>
              <div className="flex w-full items-center gap-2 max-sm:m-0 md:flex-grow max-sm:gap-1 max-sm:text-xs">
                <Avatar>
                  <AvatarImage src={publicUserData.imageUrl} />
                  <AvatarFallback>{publicUserData.identifier.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{`${
                    publicUserData.firstName ? publicUserData.firstName : publicUserData.identifier
                  } ${publicUserData.lastName ? publicUserData.lastName : ""}`}</span>
                  <span className="text-xs">{publicUserData.firstName ? publicUserData.identifier : ""}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <RoleSelect member={{ id: publicUserData.userId!, role }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function RoleSelect({ member }: { member: { id: string; role: string } }) {
  const [role, setRole] = useState(member.role);
  const { toast } = useToast();

  const { organization, membership } = useOrganization();
  const { userId } = useAuth();

  async function changeRole(value: string) {
    try {
      await organization?.updateMember({ userId: member.id, role: value });
      setRole(value);
      toast({
        title: "Success",
        description: "Role updated",
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (membership?.role === "org:admin") {
    return (
      <Select disabled={member.id === userId} value={role} onValueChange={changeRole}>
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

  return <span>{member.role === "org:admin" ? "Admin" : "Member"}</span>;
}

function TeamInvites() {
  const { isLoaded, invitations, membership } = useOrganization({
    invitations: { infinite: true },
  });

  if (!isLoaded) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="h-8 w-36" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-36" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-4 px-4 py-4" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (!invitations || invitations.count === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex h-1/2 w-1/2 flex-col items-center justify-center gap-4 rounded-md border border-primary bg-neutral-900">
          <p className="text-balance text-center font-medium text-lg">No Invitations have been sent.</p>
          {membership?.role === "org:admin" ? (
            <>
              <p className="text-neutral-400">Invite your team members to help you manage your waitlist.</p>
              <InviteMemberButton />
            </>
          ) : (
            <p className="text-neutral-400">Ask your team admin to invite team members</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations?.data?.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell>
              <span>{inv.emailAddress}</span>
            </TableCell>
            <TableCell>
              <span>{inv.status}</span>
            </TableCell>
            <TableCell>
              <InviteActions invitation={inv} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function InviteActions({ invitation }: { invitation: OrganizationInvitationResource }) {
  const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="aspect-square" variant={"outline"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            invitation.revoke();
            toast({
              title: "Success",
              description: "Invitation revoked",
            });
          }}
        >
          <DropdownMenuLabel>Revoke</DropdownMenuLabel>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TeamsContent;
