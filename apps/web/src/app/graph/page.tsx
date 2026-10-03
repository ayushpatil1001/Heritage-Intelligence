import type { Metadata } from "next";
import GraphClient from "./GraphClient";

export const metadata: Metadata = {
  title: "Archival Knowledge Graph & Entity Network",
  description:
    "Explore the semantic network of Dr. B. R. Ambedkar's treatises, historical events, movements, and key figures through an interactive node-link knowledge graph.",
  alternates: {
    canonical: "https://ambedkarverse.in/graph",
  },
  openGraph: {
    title: "Archival Knowledge Graph | AmbedkarVerse",
    description:
      "Explore the semantic network of Dr. B. R. Ambedkar's treatises, historical events, movements, and key figures.",
    url: "https://ambedkarverse.in/graph",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Knowledge Graph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archival Knowledge Graph | AmbedkarVerse",
    description:
      "Explore the semantic network of Dr. B. R. Ambedkar's life and works.",
    images: ["/og-image.png"],
  },
};

export default function GraphPage() {
  return <GraphClient />;
}
