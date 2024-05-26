import { checkWorkspace } from "@/lib/auth";
import { updateWorkspacePlan } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { workspaceID, plan } = await request.json();
  const { userId } = auth();

  console.log("workspaceID", workspaceID);
  console.log("plan", plan);

  if (!userId) {
    return NextResponse.redirect("/login");
  }

  const workspace = await checkWorkspace();
  if (!workspace) {
    return NextResponse.redirect("/dashboard/");
  }

  if (workspaceID !== workspace.workspaceID) {
    return NextResponse.redirect("/dashboard/");
  }

  if (plan === workspace.plan) {
    return NextResponse.redirect("/dashboard/");
  }

  switch (plan) {
    case "free":
      await updateWorkspacePlan(workspaceID, "free");
      break;
    case "pro":
      await updateWorkspacePlan(workspaceID, "pro");
      break;
  }

  return NextResponse.json({ success: true });
}
