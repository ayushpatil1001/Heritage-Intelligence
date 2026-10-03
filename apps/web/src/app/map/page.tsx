import type { Metadata } from "next";
import MapClient from "./MapClient";

export const metadata: Metadata = {
  title: "Geospatial Heritage Map & Historic Locations",
  description:
    "Interactive cartographic journey tracing Dr. B. R. Ambedkar's life across India, London, New York, and Germany—from Mhow to Mahad, Deekshabhoomi, and Parliament House.",
  alternates: {
    canonical: "https://ambedkarverse.in/map",
  },
  openGraph: {
    title: "Geospatial Heritage Map | AmbedkarVerse",
    description:
      "Interactive cartographic journey tracing Dr. B. R. Ambedkar's life across India, London, New York, and Germany.",
    url: "https://ambedkarverse.in/map",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Geospatial Heritage Map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geospatial Heritage Map | AmbedkarVerse",
    description:
      "Interactive cartographic journey tracing Dr. B. R. Ambedkar's historic milestones worldwide.",
    images: ["/og-image.png"],
  },
};

export default function MapPage() {
  return <MapClient />;
}
