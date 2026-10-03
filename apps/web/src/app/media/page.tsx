import type { Metadata } from "next";
import MediaClient from "./MediaClient";

export const metadata: Metadata = {
  title: "Historic Audio & Media Archive",
  description:
    "Listen to authenticated historic radio broadcasts and speeches by Dr. B. R. Ambedkar with real-time synchronized multilingual transcripts and chapter markers.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app/media",
  },
  openGraph: {
    title: "Historic Audio & Media Archive | AmbedkarVerse",
    description:
      "Listen to authenticated historic radio broadcasts and speeches by Dr. B. R. Ambedkar with real-time synchronized multilingual transcripts.",
    url: "https://heritage-intelligence-drab.vercel.app/media",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Audio & Media Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Historic Audio & Media Archive | AmbedkarVerse",
    description:
      "Historic audio broadcasts with synchronized multilingual transcripts.",
    images: ["/og-image.png"],
  },
};

export default function MediaPage() {
  return <MediaClient />;
}
