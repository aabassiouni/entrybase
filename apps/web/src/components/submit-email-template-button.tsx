"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitEmailTemplateButton() {
	const { pending } = useFormStatus();
	return <Button type="submit">{pending ? "Submitting..." : "Submit"}</Button>;
}

export default SubmitEmailTemplateButton;
