import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import SoundToggle from "@/components/ui/SoundToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arth Agrawal — AI Engineer · Full-Stack Developer · Creative Technologist",
  description:
    "Arth Agrawal — NMIMS Mumbai. Building intelligent systems at the intersection of AI and human experience. AI/ML, Full-Stack Development, 3D Web, Creative Technology.",
  keywords: [
    "Arth Agrawal",
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "NLP",
    "Next.js",
    "React",
    "NMIMS",
    "Mumbai",
    "Creative Technologist",
    "Three.js",
    "Portfolio",
  ],
  authors: [{ name: "Arth Agrawal" }],
  creator: "Arth Agrawal",
  openGraph: {
    title: "Arth Agrawal — AI Engineer · Full-Stack Developer",
    description:
      "Building intelligent systems at the intersection of AI and human experience.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arth Agrawal — AI Engineer",
    description: "Building intelligent systems at the intersection of AI and human experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} dark`}>
      <body>
        <LenisProvider>
          {/* Global overlays */}
          <CustomCursor />
          <NoiseOverlay />
          <SoundToggle />

          {/* Main content */}
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
