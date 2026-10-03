import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Cross-Lingual Archival Search",
  description:
    "Search authenticated writings, speeches, and parliamentary debates of Dr. B. R. Ambedkar across English, Hindi, and Marathi with voice search and hybrid retrieval.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app/search",
  },
  openGraph: {
    title: "Cross-Lingual Archival Search | AmbedkarVerse",
    description:
      "Search authenticated writings, speeches, and parliamentary debates of Dr. B. R. Ambedkar across English, Hindi, and Marathi.",
    url: "https://heritage-intelligence-drab.vercel.app/search",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Cross-Lingual Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cross-Lingual Archival Search | AmbedkarVerse",
    description:
      "Search authenticated writings, speeches, and parliamentary debates of Dr. B. R. Ambedkar.",
    images: ["/og-image.png"],
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
