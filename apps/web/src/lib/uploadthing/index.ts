import { headers } from "next/headers";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { checkWorkspace } from "../auth";
import { insertWaitlistLogoURL } from "../db";
const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      console.log("running middleware");
      // This code runs on your server before upload
      const headersList = headers();

      const referer = headersList.get("referer");
      const waitlistID = referer?.split("/")[4];

      if (!waitlistID) throw new Error("No waitlist ID");

      const workspace = await checkWorkspace(waitlistID);
      if (!workspace) throw new Error("Unauthorized, No workspace found with this waitlist");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { workspaceID: workspace.workspaceID, waitlistId: waitlistID };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("Upload complete for workspaceID:", metadata.workspaceID);
      console.log("file url", file.url);

      await insertWaitlistLogoURL(metadata.waitlistId, file.url, file.key);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.workspaceID };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
