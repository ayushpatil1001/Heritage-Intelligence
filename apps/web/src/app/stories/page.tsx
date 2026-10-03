import type { Metadata } from "next";
import StoriesClient from "./StoriesClient";

export const metadata: Metadata = {
  title: "Curated Archival Stories & Deep Dives",
  description:
    "Explore long-form curated visual narratives on the Mahad Satyagraha, Drafting the Constitution, The Grammar of Anarchy, and Columbia & LSE Scholarly Foundations.",
  alternates: {
    canonical: "https://ambedkarverse.in/stories",
  },
  openGraph: {
    title: "Curated Archival Stories | AmbedkarVerse",
    description:
      "Long-form curated visual narratives anchored in primary documents, speeches, and high-resolution scans.",
    url: "https://ambedkarverse.in/stories",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Curated Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Archival Stories | AmbedkarVerse",
    description:
      "Long-form curated visual narratives anchored in primary documents and speeches.",
    images: ["/og-image.png"],
  },
};

export default function StoriesPage() {
  return <StoriesClient />;
}
