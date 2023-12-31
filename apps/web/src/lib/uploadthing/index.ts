import { createUploadthing, type FileRouter } from "uploadthing/next";
import { headers } from "next/headers";
import { checkAuth } from "../db/db";
import { findWaitlistForUser, insertWaitlistLogoURL } from "../db";
import { auth } from "@clerk/nextjs";
const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "2MB" } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			console.log("running middleware");
			// This code runs on your server before upload
			const headersList = headers();
			const user = await auth();

			const referer = headersList.get("referer");
			const waitlistID = referer?.split("/")[4];

			if (!waitlistID) throw new Error("Unauthorized");
			// If you throw, the user will not be able to upload
			if (!user.userId) throw new Error("Unauthorized");

			const waitlist = await findWaitlistForUser(user.userId, waitlistID);

			if (waitlist.length == 0) throw new Error("Unauthorized");
			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId: user.userId, waitlistId: waitlistID };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			
			console.log("Upload complete for userId:", metadata.userId);

			console.log("file url", file.url);

			await insertWaitlistLogoURL(metadata.waitlistId, file.url);
			
			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
