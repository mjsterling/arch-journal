import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  ArtefactProvider,
  ContextMenuProvider,
  GlobalStateProvider,
} from "@/data/providers";
import Header from "@/components/Header/Header";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScapeTools",
  openGraph: {
    title: "ScapeTools",
    description:
      "ScapeTools Arch Journal - An all-in-one tool for tracking your Archaeology progress",
    url: "https://scape.tools",
    images: "https://scape.tools/assets/Archaeology.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <GlobalStateProvider>
          <ContextMenuProvider>
            <ArtefactProvider>
              <div className="h-full min-h-screen w-full bg-gray-900!">
                <Header />
                <div className="h-full w-full p-6 md:px-12 lg:px-16">
                  {children}
                </div>
              </div>
            </ArtefactProvider>
          </ContextMenuProvider>
        </GlobalStateProvider>
      </body>
      <GoogleAnalytics gaId="G-THXNPBP1V5" />
    </html>
  );
}
