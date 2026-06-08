import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeakersProvider } from "@/contexts/SpeakersContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Nexus — 1,000 Leaders. One Knowledge Base.",
  description:
    "A media challenge to interview and feature 1,000 global leaders in IT, tech, and startups.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SpeakersProvider>{children}</SpeakersProvider>
      </body>
    </html>
  );
}
