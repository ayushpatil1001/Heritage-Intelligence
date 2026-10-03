import type { Metadata } from "next";
import AssistantClient from "./AssistantClient";

export const metadata: Metadata = {
  title: "Grounded AI Research Assistant (BAWS & CAD Grounding)",
  description:
    "Ask questions grounded strictly in Dr. B. R. Ambedkar Writings and Speeches (BAWS Vol. 1–22) and Constituent Assembly Debates. Zero hallucination guarantee with exact volume, page, and paragraph citations.",
  alternates: {
    canonical: "https://ambedkarverse.in/assistant",
  },
  openGraph: {
    title: "Grounded AI Research Assistant | AmbedkarVerse",
    description:
      "Scholarly questions answered strictly from authenticated primary sources with exact citations and deep links.",
    url: "https://ambedkarverse.in/assistant",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Grounded AI Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grounded AI Research Assistant | AmbedkarVerse",
    description:
      "Strict zero-hallucination AI assistant grounded in BAWS and Constituent Assembly Debates.",
    images: ["/og-image.png"],
  },
};

export default function AssistantPage() {
  return <AssistantClient />;
}
