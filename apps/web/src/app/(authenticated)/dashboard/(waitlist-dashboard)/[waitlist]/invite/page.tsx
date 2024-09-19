"use client";

import { useInvites } from "@/components/context/invite-context";
import FormSubmitButton from "@/components/form-submit-button";
import { MainLayout } from "@/components/layout";
import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import { Mail, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  inviteCount: z.coerce.number(),
  selectionMethod: z.enum(["latest", "oldest", "random"]).optional(),
});

const useSendInvites = ({
  onError,
  onSuccess,
}: {
  onError?: (err: Response) => void;
  onSuccess?: (data: { message: string }) => void;
}) => {
  return useMutation({
    mutationFn: async (
      data: z.infer<typeof formSchema> & {
        waitlist: string;
        type: "count" | "list";
      } & {
        invitesList?: { email: string; id: string }[];
      },
    ) => {
      const res = await fetch(`/api/${data.waitlist}/send?type=${data.type}`, {
        method: "POST",
        body: JSON.stringify({
          inviteCount: data.inviteCount,
          selectionMethod: data.selectionMethod,
          invitesList: data.invitesList,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err: Response) => {
      onError?.(err);
    },
  });
};

function InvitePage() {
  const searchParams = useSearchParams();
  const { waitlist } = useParams<{ waitlist: string }>();

  const router = useRouter();

  const { invites, setInvites } = useInvites();
  const { toast } = useToast();

  const defaultCount = searchParams.get("count");

  const { mutate: sendInvites, isPending: isLoading } = useSendInvites({
    onSuccess: () => {
      router.push(`/dashboard/${waitlist}/invite/success`);
    },
    onError: async (err) => {
      const data = await err.json();
      if (err.status === 400) {
        if (data.code === "NO_WEBSITE_DETAILS") {
          toast({
            title: "Error",
            description:
              "You have not set up your website details. Go to Waitlist Settings to add your waitlist details",
            variant: "destructive",
            action: (
              <ToastAction
                altText={"Go to Waitlist Settings"}
                onClick={() => router.push(`/dashboard/${waitlist}/settings`)}
              >
                Go to Waitlist Settings
              </ToastAction>
            ),
          });
        } else {
          toast({
            title: "Error",
            description: "An error occurred while sending invites",
            variant: "destructive",
          });
        }
      }
      if (err.status === 200) {
        router.push(`/dashboard/${waitlist}/invite/success`);
      }
      console.log(err);
    },
  });

  const selectForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteCount: 5,
      selectionMethod: "latest",
    },
  });
  const customForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteCount: undefined,
      selectionMethod: "latest",
    },
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    sendInvites({
      inviteCount: values.inviteCount,
      selectionMethod: values.selectionMethod,
      waitlist: waitlist,
      type: "count",
    });
  }

  async function handleSendInvitesList() {
    sendInvites({
      inviteCount: invites.length,
      invitesList: invites,
      waitlist: waitlist,
      type: "list",
    });
  }

  return (
    <MainLayout>
      <PageHeading>Invite</PageHeading>
      <div className="flex h-full w-full items-center justify-center">
        <Card className="h-full w-full max-w-lg">
          <CardHeader>
            <CardTitle>Confirm Your Invitations</CardTitle>
          </CardHeader>
          <Separator className="my-0.5" />
          <div className="px-6 pt-6">
            <Link href={"email-preview"}>
              <Button variant={"default"}>
                Preview email
                <Mail className="ml-2" />
              </Button>
            </Link>
          </div>
          <CardHeader>
            <CardTitle className="font-medium text-xl">
              <p>How many invitations would you like to send?</p>
            </CardTitle>
            <CardDescription>
              A number of invitations will be sent to a random selection of signups on your waitlist.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex w-full items-center justify-center">
            <Tabs defaultValue="select" className="flex w-52 flex-col items-center">
              <TabsList>
                <TabsTrigger value="select">Select</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              <TabsContent value="select">
                <Form {...selectForm}>
                  <form onSubmit={selectForm.handleSubmit(handleFormSubmit)}>
                    <div className="flex gap-2">
                      <FormField
                        control={selectForm.control}
                        name="selectionMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <SelectTrigger className="w-20 px-1 py-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="latest">Latest</SelectItem>
                                  <SelectItem value="oldest">Oldest</SelectItem>
                                  <SelectItem value="random">Random</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={selectForm.control}
                        name="inviteCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={defaultCount ?? String(field.value)}>
                                <SelectTrigger className="w-12 px-1 py-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                  <SelectItem value="20">20</SelectItem>
                                  <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormSubmitButton loading={isLoading} className="text-black dark:bg-primary">
                        Invite
                      </FormSubmitButton>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="custom">
                <Form {...customForm}>
                  <form onSubmit={customForm.handleSubmit(handleFormSubmit)}>
                    <div className="flex gap-2">
                      <FormField
                        control={selectForm.control}
                        name="selectionMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <SelectTrigger className="w-20 px-1 py-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="latest">Latest</SelectItem>
                                  <SelectItem value="oldest">Oldest</SelectItem>
                                  <SelectItem value="random">Random</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={customForm.control}
                        name="inviteCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Enter Number" className="w-32" type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormSubmitButton loading={isLoading} className="text-black dark:bg-primary">
                        Invite
                      </FormSubmitButton>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <Separator className="my-0.5" />
          <CardHeader>
            <CardTitle className="font-medium text-xl">
              <p>Invite specific signups</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {invites.length > 0 ? (
              <div className="flex flex-col items-center">
                <ScrollArea className="h-48 w-2/3 rounded-lg border border-neutral-800 bg-neutral-900 p-2">
                  <ul className="list-disc">
                    {invites.map((invite, i) => (
                      <li
                        className="mt-1 flex items-center justify-between rounded-md border border-neutral-600 bg-black p-2 text-sm"
                        key={i}
                      >
                        {invite.email}
                        <button
                          type="button"
                          onClick={() => {
                            const newInvites = invites.filter((item) => item.id !== invite.id);
                            setInvites(newInvites);
                          }}
                        >
                          <X className="h-[1.25rem]" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            ) : (
              <div className="flex flex-1 grow items-center justify-center">
                <div className="flex h-48 w-2/3 flex-col items-center justify-center gap-2 rounded-md border border-primary bg-neutral-900 p-6">
                  <p className="font-medium text-lg">No signups selected</p>
                  <p className="text-neutral-500 text-sm">Go to the signups page to select some signups to invite</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              className="text-black dark:bg-primary"
              onClick={handleSendInvitesList}
              disabled={invites.length === 0}
            >
              {isLoading ? "Inviting..." : "Invite"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}

export default InvitePage;
