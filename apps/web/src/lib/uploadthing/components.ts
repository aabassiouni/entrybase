import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "./index";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
