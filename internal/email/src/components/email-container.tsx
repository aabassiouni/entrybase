import { Container } from "@react-email/components";

export function EmailContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container className="max-w-[465px] rounded border border-[#eaeaea] border-solid font-sans dark:bg-black">
      {children}
    </Container>
  );
}
