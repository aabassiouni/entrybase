import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return process.env.NODE_ENV === "development" ? <SignUp /> : null;
}
