import { ThemeProvider } from "@/components/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ourFileRouter } from "@/lib/uploadthing";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { extractRouterConfig } from "uploadthing/server";
import "../globals.css";
import { ReactQueryProvider } from "@/components/context/react-query-provider";

const clashDisplay = localFont({
  src: "../../fonts/ClashDisplay-Variable.ttf",
  display: "swap",
  variable: "--font-clash-display",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Entrybase",
  description: "Waitlist management and analytics for your SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${
          inter.className
          // biome-ignore lint/nursery/useSortedClasses: <explanation>
        } ${clashDisplay.variable} h-screen`}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableColorScheme disableTransitionOnChange>
            <ClerkProvider>{children}</ClerkProvider>
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
