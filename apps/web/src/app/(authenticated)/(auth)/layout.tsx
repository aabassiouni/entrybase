import TextLogo from "@/components/text-logo";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen sm:flex">
      <main className="md:!grid flex w-full flex-col-reverse sm:grid-cols-2">
        <div className="flex items-center justify-center bg-black md:bg-transparent">{children}</div>
        <div className="flex items-center justify-center bg-black py-10 md:h-full">
          <TextLogo />
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
