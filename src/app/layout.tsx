import "vib/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "vib/components/Providers";
import { ErrorBoundary } from "vib/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Vibify - Your Spotify Music Companion",
  description: "Connect your Spotify account to discover your favorite music",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
