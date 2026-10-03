import type { Metadata } from "next";
import ReaderClient from "./ReaderClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const itemId = params.id;
  const readableName = itemId
    .replace(/^item-/, "")
    .replace(/-/g, " ")
    .toUpperCase();
  const title = `Archival Document Reader: ${readableName}`;
  const description = `Inspect high-resolution archival facsimile scans, side-by-side OCR transcriptions, grounded translations, and academic citations for record ${itemId}.`;
  const canonical = `https://ambedkarverse.in/reader/${itemId}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | AmbedkarVerse`,
      description,
      url: canonical,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | AmbedkarVerse`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function ReaderPage() {
  return <ReaderClient />;
}
