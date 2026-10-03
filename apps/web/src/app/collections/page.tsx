import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Researcher Dossier & Curated Collections",
  description:
    "Organize, bookmark, and export primary archival records, citations, and milestone notes. Generate PDF dossiers or transfer to mobile via QR tokens.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app/collections",
  },
  openGraph: {
    title: "Researcher Dossier & Curated Collections | AmbedkarVerse",
    description:
      "Organize, bookmark, and export primary archival records, citations, and milestone notes.",
    url: "https://heritage-intelligence-drab.vercel.app/collections",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Researcher Dossier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Researcher Dossier & Curated Collections | AmbedkarVerse",
    description:
      "Organize, bookmark, and export primary archival records and citations.",
    images: ["/og-image.png"],
  },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
