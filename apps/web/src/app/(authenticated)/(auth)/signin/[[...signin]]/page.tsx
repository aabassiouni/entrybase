import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return process.env.NODE_ENV === "development" ? <SignIn /> : null;
}
