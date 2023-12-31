"use client";
import { UploadButton } from "@/lib/uploadthing/components";
import React from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

function UploadButtonContent() {
	const router = useRouter();
	return (
		<div className="flex">
			<UploadButton
				className="ut-button:bg-neutral-900 ut-button:h-10 ut-button:px-4 ut-button:py-2 ut-button:text-base ut-button:font-normal ut-button:text-neutral-50 ut-button:hover:bg-neutral-900/90 ut-button:dark:bg-neutral-50 ut-button:dark:text-neutral-900 ut-button:dark:hover:bg-neutral-50/90 w-fit  font-bold"
				appearance={{
					// button: "bg-neutral-900 h-10 px-4 py-2 text-base font-normal fon text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
					container: "block text-base",
				}}
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					router.refresh();
				}}                
				onUploadError={(error: Error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
				}}
			/>
			
		</div>
	);
}

export default UploadButtonContent;
