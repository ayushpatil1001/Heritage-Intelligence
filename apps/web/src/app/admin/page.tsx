import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Archivist Console & Digitization Pipeline",
  description:
    "Institutional digitization, OCR verification, Dublin Core metadata management, and kiosk telemetry monitoring dashboard for Dr. B. R. Ambedkar Digital Heritage Archive.",
  alternates: {
    canonical: "https://ambedkarverse.in/admin",
  },
  openGraph: {
    title: "Archivist Console & Digitization Pipeline | AmbedkarVerse",
    description:
      "Institutional digitization, OCR verification, and metadata management console.",
    url: "https://ambedkarverse.in/admin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Archivist Console",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archivist Console | AmbedkarVerse",
    description:
      "Institutional digitization and archive management dashboard.",
    images: ["/og-image.png"],
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
