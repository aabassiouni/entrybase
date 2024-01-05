import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { createWorkspaceForTenant, getWorkspaceForTenant } from "./lib/db";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest, evt: NextFetchEvent) {
	const res = await authMiddleware({
		publicRoutes: ["/api/uploadthing"],
		afterAuth: async (auth, req) => {
			// if the user is not logged in and is trying to access a dashboard route, redirect to signin
			if (!auth.userId && "^/dashboard/".match(request.nextUrl.pathname)) {
				console.log("redirecting to signin");
				return redirectToSignIn({ returnBackUrl: req.url });
			}
			// const userId = auth.userId ?? undefined;
			// const tenantId = auth.orgId ?? auth.userId ?? undefined;
			const workspace = await getWorkspaceForTenant(auth.userId!);

			// create a workspace if there isn't one
			if (!workspace && auth.userId && request.nextUrl.pathname !== "/dashboard/setup") {
				// await createWorkspaceForUser(auth.userId);
				return NextResponse.redirect(new URL("/dashboard/setup", req.url));
			}
		},
	})(request, evt);

	return res;
}

export const config = {
	matcher: ["/dashboard", "/dashboard/(.*)", "/(api|trpc)(.*)"],
};
