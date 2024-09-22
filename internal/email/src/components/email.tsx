import { Html, Tailwind } from "@react-email/components";

export function Email({ children }: { children: React.ReactNode }) {
  return (
    <Html lang="en" className="">
      <Tailwind
        config={{
          darkMode: "class",
        }}
      >
        {children}
      </Tailwind>
    </Html>
  );
}
