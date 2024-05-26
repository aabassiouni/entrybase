import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("resend webhook received");
  const body = await request.json();

  const { type } = body;

  switch (type) {
    case "email.sent":
      console.log("email.sent");

      return NextResponse.json({ status: "ok" });
    case "email.opened":
      console.log("email.opened");

      return NextResponse.json({ status: "ok" });
    case "email.delivered":
      console.log("email.delivered");

      return NextResponse.json({ status: "ok" });
    case "email.complained":
      console.log("email.failed");

      return NextResponse.json({ status: "ok" });
    case "email.clicked":
      console.log("email.clicked");

      return NextResponse.json({ status: "ok" });
    case "email.delivery_delayed":
      console.log("email.delivery_delayed");

      return NextResponse.json({ status: "ok" });
    case "email.bounced":
      console.log("email.bounced");

      return NextResponse.json({ status: "ok" });
  }
}
