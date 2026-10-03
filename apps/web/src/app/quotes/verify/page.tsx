import type { Metadata } from "next";
import QuotesVerifyClient from "./QuotesVerifyClient";

export const metadata: Metadata = {
  title: "Quote Verifier & Misattribution Detector",
  description:
    "Verify any quote attributed to Dr. B. R. Ambedkar against authenticated primary sources (BAWS Vol. 1–22 and Constituent Assembly Debates). Instant verbatim matching with exact citations.",
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app/quotes/verify",
  },
  openGraph: {
    title: "Quote Verifier & Misattribution Detector | AmbedkarVerse",
    description:
      "Verify historical quotes against authenticated primary sources with exact citations and similarity confidence scores.",
    url: "https://heritage-intelligence-drab.vercel.app/quotes/verify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse Quote Verifier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quote Verifier & Misattribution Detector | AmbedkarVerse",
    description:
      "Verify historical quotes against authenticated primary sources with exact citations.",
    images: ["/og-image.png"],
  },
};

export default function QuotesVerifyPage() {
  return <QuotesVerifyClient />;
}
