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
  metadataBase: new URL('https://isaacasamoahjunior.com'),
  title: {
    default: "Isaac Asamoah Junior | Creative Developer",
    template: "%s | Isaac Asamoah Junior"
  },
  description: "Portfolio of Isaac Asamoah Junior - A Creative Developer bridging design and engineering to build immersive digital experiences.",
  keywords: ["Isaac Asamoah Junior", "Isaac Asamoah", "Creative Developer", "Web Design", "Next.js", "React", "Three.js", "Frontend Engineer", "Portfolio"],
  authors: [{ name: "Isaac Asamoah Junior" }],
  creator: "Isaac Asamoah Junior",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://isaacasamoahjunior.com",
    title: "Isaac Asamoah Junior | Creative Developer",
    description: "Building immersive digital experiences with cutting-edge technology.",
    siteName: "Isaac Asamoah Junior Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Isaac Asamoah Junior - Creative Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaac Asamoah Junior | Creative Developer",
    description: "Building immersive digital experiences with cutting-edge technology.",
    images: ["/og-image.jpg"],
    creator: "@isaac_asamoah_jr",
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
