import type { Metadata } from "next";
import TimelineClient from "./TimelineClient";

export const metadata: Metadata = {
  title: "Chronological Timeline (1891–1956)",
  description:
    "Explore 25 authenticated milestones in Dr. B. R. Ambedkar's life, from his 1891 birth in Mhow, higher education at Columbia and LSE, to the Constitution and timeless legacy.",
  alternates: {
    canonical: "https://ambedkarverse.in/timeline",
  },
  openGraph: {
    title: "Chronological Timeline (1891–1956) | AmbedkarVerse",
    description:
      "Explore 25 authenticated milestones in Dr. B. R. Ambedkar's life with primary archival records and geospatial mappings.",
    url: "https://ambedkarverse.in/timeline",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Chronological Timeline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chronological Timeline (1891–1956) | AmbedkarVerse",
    description:
      "Explore 25 authenticated milestones in Dr. B. R. Ambedkar's life with primary archival records.",
    images: ["/og-image.png"],
  },
};

export default function TimelinePage() {
  return <TimelineClient />;
}
