import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AmbedkarVerse | AI Digital Heritage Archive & Memorial Kiosk",
  description:
    "National digital heritage archive and AI research assistant for Dr. B. R. Ambedkar. Explore 22 BAWS volumes, Constituent Assembly Debates, interactive memorial kiosk, and grounded semantic search.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app",
  },
  openGraph: {
    title: "AmbedkarVerse | AI Digital Heritage Archive & Memorial Kiosk",
    description:
      "Explore 22 BAWS volumes, Constituent Assembly Debates, interactive memorial kiosk, and grounded semantic search.",
    url: "https://heritage-intelligence-drab.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Digital Heritage Archive and Memorial Kiosk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmbedkarVerse | AI Digital Heritage Archive & Memorial Kiosk",
    description:
      "National digital heritage archive for Dr. B. R. Ambedkar. 22 BAWS volumes, CAD debates, interactive kiosk, and grounded AI.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
