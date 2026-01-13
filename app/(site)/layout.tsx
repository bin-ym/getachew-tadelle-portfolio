import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ================= FONTS ================= */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ================= SITE URL ================= */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://getachew-tadele.vercel.app";

/* ================= METADATA ================= */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Getachew Tadele | Artist & Filmmaker",
    template: "%s | Getachew Tadele",
  },

  description:
    "Ethiopian artist and filmmaker shaped by spirituality, culture, and inner vision.",

  openGraph: {
    title: "Getachew Tadele",
    description:
      "Art, film, and exhibitions rooted in Ethiopian culture and spirituality.",
    url: siteUrl,
    siteName: "Getachew Tadele",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/getachew.jpg",
        width: 1200,
        height: 630,
        alt: "Getachew Tadele – Artist & Filmmaker",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Getachew Tadele",
    description:
      "Art, film, and exhibitions rooted in Ethiopian culture and spirituality.",
    images: ["/getachew.jpg"],
  },
};

/* ================= LAYOUT ================= */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}