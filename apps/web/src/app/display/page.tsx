import type { Metadata } from "next";
import DisplayClient from "./DisplayClient";

export const metadata: Metadata = {
  title: "Museum Display Wall (1920×1080 Ambient Showcase)",
  description:
    "Passive ambient museum video wall mode rotating curated high-resolution archival treasures, historical context, and visitor mobile QR handoffs.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app/display",
  },
  openGraph: {
    title: "Museum Display Wall | AmbedkarVerse",
    description:
      "Passive ambient museum video wall mode rotating curated high-resolution archival treasures.",
    url: "https://heritage-intelligence-drab.vercel.app/display",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Museum Display Wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Museum Display Wall | AmbedkarVerse",
    description:
      "Passive ambient museum video wall mode rotating curated archival treasures.",
    images: ["/og-image.png"],
  },
};

export default function DisplayPage() {
  return <DisplayClient />;
}
