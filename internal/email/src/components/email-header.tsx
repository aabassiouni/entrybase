import { Column, Img, Section } from "@react-email/components";

function EmailHeader({ websiteLogo, brandColor }: { websiteLogo: string | null; brandColor: string | null }) {
  return (
    <Section
      style={{
        backgroundColor: brandColor || undefined,
      }}
      className={"flex h-[150px] items-center justify-center rounded-t"}
    >
      <Column>
        {websiteLogo ? (
          <Img className="max-h-[150px] max-w-[150px] object-contain" src={websiteLogo} />
        ) : (
          <div className="flex h-[100px] w-[150px] items-center justify-center rounded-lg bg-zinc-900 p-1 text-center text-sm text-white">
            Go to waitlist settings to add your logo
          </div>
        )}
      </Column>
    </Section>
  );
}

export default EmailHeader;
