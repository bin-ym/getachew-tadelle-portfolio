import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Getachew Tadele | Artist & Filmmaker",
  description:
    "Ethiopian artist and filmmaker shaped by spirituality, culture, and inner vision.",
  openGraph: {
    title: "Getachew Tadele",
    description:
      "Art, film, and exhibitions rooted in Ethiopian culture and spirituality.",
    url: "https://getachew-tadelle.vercel.app",
    siteName: "Getachew Tadele",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Getachew Tadele – Artist & Filmmaker",
      },
    ],
    type: "website",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
