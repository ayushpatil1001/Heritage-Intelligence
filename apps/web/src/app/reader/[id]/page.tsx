import type { Metadata } from "next";
import ReaderClient from "./ReaderClient";
import { getCatalogItemById } from "@/lib/catalogData";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const itemId = params.id;
  const item = getCatalogItemById(itemId);
  const readableName = itemId
    .replace(/^item-/, "")
    .replace(/-/g, " ")
    .toUpperCase();
  const title = item ? `${item.title} | Archival Document Reader` : `Archival Document Reader: ${readableName}`;
  const description = item?.snippet || `Inspect high-resolution archival facsimile scans, side-by-side OCR transcriptions, grounded translations, and academic citations for record ${itemId}.`;
  const canonical = `https://heritage-intelligence-drab.vercel.app/reader/${itemId}`;

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
