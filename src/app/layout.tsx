import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { profile, profileTitle } from "@/lib/profile";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const title = profileTitle;

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: title,
    template: `%s | ${profile.name}`
  },
  description: profile.description,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  alternates: { canonical: profile.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.url,
    title,
    description: profile.description,
    siteName: profile.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
    images: ["/opengraph-image"],
  },
  verification: {
    google: '2N60QpO_mdyVfLPK_gzGQ27roei64b0oBpk9_1M0NQ8',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ed",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GH">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
