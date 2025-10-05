import type { Metadata } from "next";
import { Playfair_Display, Lexend } from "next/font/google";
import "./globals.css";

import Navbar from "./_components/Navbar";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hynts",
  description:
    "Hynts is your go-to platform for fresh tech opportunities. Discover the latest jobs, explore real interview experiences, and stay ahead with insights to kickstart your career in the tech industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${playfair.variable} antialiased`}>
        <Navbar />
        <main className="mx-auto max-w-7xl px-6">{children}</main>
      </body>
    </html>
  );
}
