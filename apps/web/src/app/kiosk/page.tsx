import type { Metadata } from "next";
import KioskClient from "./KioskClient";

export const metadata: Metadata = {
  title: "Museum Kiosk Surface (1080×1920 Touch Interaction)",
  description:
    "Interactive physical museum kiosk mode designed for 55-inch portrait touch displays, multi-touch navigation, high-contrast accessibility, and 90-second idle timeouts.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app/kiosk",
  },
  openGraph: {
    title: "Museum Kiosk Surface | AmbedkarVerse",
    description:
      "Interactive physical museum kiosk mode designed for portrait touch displays in museum installations.",
    url: "https://heritage-intelligence-drab.vercel.app/kiosk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Museum Kiosk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Museum Kiosk Surface | AmbedkarVerse",
    description:
      "Interactive physical museum kiosk mode designed for portrait touch displays.",
    images: ["/og-image.png"],
  },
};

export default function KioskPage() {
  return <KioskClient />;
}
