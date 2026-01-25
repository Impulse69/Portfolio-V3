import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Isaac | Creative Developer",
    template: "%s | Isaac"
  },
  description: "Portfolio of Isaac - A Creative Developer bridging design and engineering to build immersive digital experiences.",
  keywords: ["Creative Developer", "Web Design", "Next.js", "React", "Three.js", "Frontend Engineer", "Portfolio"],
  authors: [{ name: "Isaac" }],
  creator: "Isaac",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://isaac.dev",
    title: "Isaac | Creative Developer",
    description: "Building immersive digital experiences with cutting-edge technology.",
    siteName: "Isaac Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Isaac - Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac | Creative Developer",
    description: "Building immersive digital experiences with cutting-edge technology.",
    images: ["/og-image.jpg"],
    creator: "@isaac_dev",
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

export const viewport = {
  themeColor: "#0a0a0f",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
