import { redirect } from "next/navigation";
import React from "react";

function NotFound({ params }: { params: { waitlist: string } }) {
  return redirect(`/dashboard/${params.waitlist}`);
}

export default NotFound;
