import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/AppShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0B2A6F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://heritage-intelligence-drab.vercel.app"),
  title: {
    default: "AmbedkarVerse | AI Digital Heritage Archive & Memorial Kiosk",
    template: "%s | AmbedkarVerse Digital Heritage Archive",
  },
  description:
    "National digital heritage archive and AI research assistant for Dr. B. R. Ambedkar. Explore 22 BAWS volumes, Constituent Assembly Debates, interactive memorial kiosk, and grounded semantic search.",
  applicationName: "AmbedkarVerse AHI-KS",
  keywords: [
    "Dr. B. R. Ambedkar",
    "Babasaheb Ambedkar",
    "BAWS",
    "Constituent Assembly Debates",
    "Indian Constitution",
    "Mahad Satyagraha",
    "Annihilation of Caste",
    "The Problem of the Rupee",
    "Digital Heritage Archive",
    "DAIC",
    "Ministry of Social Justice and Empowerment",
    "Smart India Hackathon 2026",
    "PS 26096",
    "Memorial Kiosk",
    "IndicTrans2",
    "Grounded AI",
  ],
  authors: [
    {
      name: "Dr. Ambedkar International Centre (DAIC), Ministry of Social Justice and Empowerment, Government of India",
      url: "https://daic.gov.in",
    },
  ],
  creator: "Ministry of Social Justice and Empowerment",
  publisher: "Dr. Ambedkar International Centre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://heritage-intelligence-drab.vercel.app",
    languages: {
      "en-IN": "https://heritage-intelligence-drab.vercel.app",
      "hi-IN": "https://heritage-intelligence-drab.vercel.app?lang=hi",
      "mr-IN": "https://heritage-intelligence-drab.vercel.app?lang=mr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://heritage-intelligence-drab.vercel.app",
    siteName: "AmbedkarVerse Digital Heritage Archive",
    title: "AmbedkarVerse | AI Digital Heritage Archive & Memorial Kiosk",
    description:
      "National digital heritage archive for Dr. B. R. Ambedkar with 22 BAWS volumes, interactive memorial kiosk, and grounded AI assistant.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AmbedkarVerse - Dr. B. R. Ambedkar Digital Heritage Archive and Memorial Kiosk System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmbedkarVerse | AI Digital Heritage Archive & Memorial Kiosk",
    description:
      "National digital heritage archive for Dr. B. R. Ambedkar. 22 BAWS volumes, CAD debates, interactive kiosk, and grounded AI.",
    images: ["/og-image.png"],
    creator: "@AmbedkarVerse",
  },
  verification: {
    google: "google-site-verification-ambedkarverse-sih2026-daic",
    yandex: "yandex-verification-token",
    other: {
      "msvalidate.01": "bing-site-verification-token",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Dr. Ambedkar International Centre (DAIC)",
    "alternateName": "AmbedkarVerse National Heritage Archive",
    "url": "https://heritage-intelligence-drab.vercel.app",
    "logo": "https://heritage-intelligence-drab.vercel.app/og-image.png",
    "parentOrganization": {
      "@type": "GovernmentOrganization",
      "name": "Ministry of Social Justice and Empowerment, Government of India",
      "url": "https://socialjustice.gov.in"
    },
    "sameAs": [
      "https://daic.gov.in",
      "https://en.wikipedia.org/wiki/B._R._Ambedkar"
    ]
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AmbedkarVerse",
    "url": "https://heritage-intelligence-drab.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://heritage-intelligence-drab.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const jsonLdArchive = {
    "@context": "https://schema.org",
    "@type": "ArchiveComponent",
    "name": "Dr. Babasaheb Ambedkar Writings and Speeches (BAWS)",
    "description": "22 Volumes of authenticated treatises, speeches, parliamentary deliberations, and personal letters of Dr. B. R. Ambedkar.",
    "publisher": {
      "@type": "GovernmentOrganization",
      "name": "Dr. Ambedkar Foundation, Ministry of Social Justice and Empowerment"
    }
  };

  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArchive) }}
        />
      </head>
      <body className="min-h-screen archival-texture selection:bg-accent selection:text-primary">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
