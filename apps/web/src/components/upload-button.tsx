"use client";
import { UploadButton } from "@/lib/uploadthing/components";
import { useRouter } from "next/navigation";
import React from "react";

function UploadButtonContent() {
  const router = useRouter();
  return (
    <div className="flex">
      <UploadButton
        className="w-fit font-bold ut-button:h-10 ut-button:bg-neutral-900 ut-button:dark:bg-neutral-50 ut-button:dark:hover:bg-neutral-50/90 ut-button:hover:bg-neutral-900/90 ut-button:px-4 ut-button:py-2 ut-button:font-normal ut-button:dark:text-neutral-900 ut-button:text-base ut-button:text-neutral-50"
        appearance={{
          // button: "bg-neutral-900 h-10 px-4 py-2 text-base font-normal fon text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
          container: "block text-base",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(_res) => {
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
