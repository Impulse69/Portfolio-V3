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
  description: "Isaac Asamoah Junior (IKE) is a Creative Developer from Ghana specializing in Next.js, React, TypeScript, and modern web technologies. Building immersive digital experiences that bridge design and engineering.",
  keywords: ["Isaac Asamoah Junior", "Isaac Asamoah Junior Developer", "Isaac Asamoah Junior Ghana", "Isaac Asamoah Jr", "IKE developer", "Creative Developer Ghana", "Impulse69", "Web Developer Ghana", "Next.js Developer", "React Developer", "Full-Stack Developer Ghana", "Portfolio"],
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
