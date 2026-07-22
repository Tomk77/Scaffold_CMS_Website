import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4001"),
  title: {
    default: "Scaffold CMS — A headless CMS that thinks in pages",
    template: "%s · Scaffold CMS",
  },
  description:
    "A website-native headless CMS for canonical page trees, clean URLs, redirects, and structured content.",
  applicationName: "Scaffold CMS",
  openGraph: {
    type: "website",
    title: "Scaffold CMS",
    description: "The headless CMS that thinks in pages, not tables.",
    siteName: "Scaffold CMS",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
