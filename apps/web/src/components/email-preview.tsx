"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import EmailTemplate from "./email/template";
import { render } from "@react-email/render";

function EmailPreview({ email, headerSectionColor }: { email: string; headerSectionColor: string }) {
  
	const html = render(<EmailTemplate email={email} headerSectionColor={headerSectionColor} />, {
		pretty: true,
	});

	return (
		<Card className="h-[calc(100vh_-_150px)] p-2">
			<iframe className="h-full w-full  p-4" srcDoc={html} />
		</Card>
	);
}

export default EmailPreview;
