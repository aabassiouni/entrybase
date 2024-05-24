import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function GET() {
  const clashDisplay = await fetch(new URL("../fonts/ClashDisplay-Bold.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  const homepageImg = await fetch(new URL("../../public/homepage.png", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#020705",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "radial-gradient(150% 150% at 50% 10%, #020705 40%, #4BE7AE 100%)",
          zIndex: -10,
        }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontFamily: "Clash Display",
            fontSize: "3.5rem",
          }}
        >
          entrybase
        </h1>
        <h1
          style={{
            fontSize: "3.5rem",
            paddingBottom: "2rem",
            backgroundImage: "linear-gradient(to top, #ffffff, #4BE7AE)",
            backgroundClip: "text",
            textWrap: "balance",
            textAlign: "center",
            letterSpacing: "0.025em",
            color: "transparent",
          }}
        >
          Open source waitlist management and analytics platform
        </h1>
        <img
          alt="OG"
          width="90%"
          //@ts-ignore
          src={homepageImg}
          style={{
            borderWidth: "4px",
            borderColor: "#404040",
            position: "absolute",
            top: "50%",
            objectFit: "cover",
            borderTopLeftRadius: "1.5rem",
            borderTopRightRadius: "1.5rem",
          }}
        />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Clash Display",
          data: clashDisplay,
          weight: 400,
        },
      ],
    },
  );
}
