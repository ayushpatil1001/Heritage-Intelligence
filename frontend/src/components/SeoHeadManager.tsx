import React, { useEffect } from 'react';
import { ActiveTab } from './HeaderKioskBar';
import { SupportedLanguage } from '../data/edgeCorpus';

export interface RouteSeoMetadata {
  slug: string;
  h1Title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbName: string;
  schemaType: string;
}

export const SEO_ROUTE_MAP: Record<ActiveTab, RouteSeoMetadata> = {
  search: {
    slug: '/rag-provenance-engine',
    h1Title: 'Primary Source Provenance & Archival Synthesis',
    subtitle: 'Verified citations from Babasaheb Ambedkar Writings & Speeches (BAWS Vol. 1–22) and Constituent Assembly Debates',
    metaTitle: 'Ambedkar Heritage Intelligence & Kiosk System (AHI-KS) | DAIC Archival RAG Portal',
    metaDescription:
      'Official Dr. Ambedkar International Centre (DAIC) Zero-Hallucination Archival RAG Kiosk System. Verify BAWS Vol. 1–22 & Constituent Assembly Debates (CAD) with 600 DPI OCR bounding-box provenance.',
    breadcrumbName: 'Archival Search & Provenance',
    schemaType: 'SearchResultsPage'
  },
  vault: {
    slug: '/heritage-archive-vault',
    h1Title: 'Digital Heritage Archive — BAWS Vol. 1–22 & Manuscripts',
    subtitle: 'Curated primary volumes, historic speeches, constitutional memoranda, and rare manuscripts',
    metaTitle: 'Digital Heritage Archive Vault (BAWS Vol. 1–22 & CAD) | AHI-KS DAIC',
    metaDescription:
      'Browse authenticated primary sources of Dr. B. R. Ambedkar including Babasaheb Ambedkar Writings and Speeches (BAWS Vol. 1–22), 1936 Annihilation of Caste, 1947 States and Minorities, and rare manuscripts.',
    breadcrumbName: 'Heritage Vault',
    schemaType: 'CollectionPage'
  },
  'cad-graph': {
    slug: '/constituent-assembly-debates-visualizer',
    h1Title: 'Constituent Assembly Debates (1946–1949) Knowledge Graph',
    subtitle: 'Interactive constitutional evolution of Fundamental Rights, Directive Principles, and Federal Finance',
    metaTitle: 'Constituent Assembly Debates (CAD) Article 32 & 14 Knowledge Graph | AHI-KS DAIC',
    metaDescription:
      'Trace the constitutional evolution of Articles 32, 14, 15, 17, and 38 through Dr. B. R. Ambedkar’s decisive rejoinders and co-debater amendments in the Constituent Assembly of India (CAD Vol. VII–XI).',
    breadcrumbName: 'Constitutional Graph',
    schemaType: 'Dataset'
  },
  karaoke: {
    slug: '/bhashini-audio-karaoke-lexicon',
    h1Title: 'Archival Speech Audio & Parliamentary Legal Lexicon',
    subtitle: 'Synchronized transcripts and multilingual legal definitions across English, Marathi, and Hindi',
    metaTitle: 'Bhashini 5-Language Audio Karaoke & Constitutional Lexicon | AHI-KS DAIC',
    metaDescription:
      'Listen to Dr. B. R. Ambedkar’s historic Constituent Assembly speeches with real-time synchronized transcript highlighting and multi-lingual Marathi, Hindi, Tamil, Telugu & English legal lexicon.',
    breadcrumbName: 'Audio Lexicon',
    schemaType: 'AudioObject'
  },
  curator: {
    slug: '/daic-curator-hardware-telemetry',
    h1Title: 'Curatorial Archival Ingest & Kiosk System Overview',
    subtitle: 'Add verified primary documents to the archive and inspect kiosk hardware specifications',
    metaTitle: 'DAIC Curatorial Ingest Pipeline & ₹38,500 Kiosk Hardware BOM | AHI-KS DAIC',
    metaDescription:
      'Inspect live Supabase PostgreSQL 17.6 telemetry, 128GB NVMe offline failover benchmarks, ₹38,500 Raspberry Pi 5 Kiosk Bill of Materials, and institutional Search Console SEO verification.',
    breadcrumbName: 'Curator Archive',
    schemaType: 'TechArticle'
  }
};

export function getTabFromPath(pathname: string): ActiveTab {
  const clean = pathname.replace(/\/+$/, '') || '/rag-provenance-engine';
  for (const [tab, meta] of Object.entries(SEO_ROUTE_MAP) as Array<[ActiveTab, RouteSeoMetadata]>) {
    if (meta.slug === clean) {
      return tab;
    }
  }
  return 'search';
}

interface SeoHeadManagerProps {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  language: SupportedLanguage;
  onQuickQuery: (q: string) => void;
}

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  activeTab,
  setActiveTab,
  language
}) => {
  const activeMeta = SEO_ROUTE_MAP[activeTab];
  const canonicalUrl = `https://ahi-ks.daic.gov.in${activeMeta.slug}`;

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.protocol === 'http:' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      window.location.replace(
        `https://${window.location.host}${window.location.pathname}${window.location.search}`
      );
    }

    const robotsTags = document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]');
    robotsTags.forEach((tag) => {
      const content = tag.getAttribute('content') || '';
      if (content.toLowerCase().includes('noindex')) {
        tag.setAttribute(
          'content',
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        );
      }
    });
  }, []);

  useEffect(() => {
    const initialTab = getTabFromPath(window.location.pathname);
    if (initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
    const handlePopState = () => {
      setActiveTab(getTabFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.pathname !== activeMeta.slug) {
      window.history.pushState({ tab: activeTab }, activeMeta.metaTitle, activeMeta.slug);
    }

    document.title = activeMeta.metaTitle;
    document.documentElement.lang = language;

    const descEl = document.getElementById('meta-description');
    if (descEl) descEl.setAttribute('content', activeMeta.metaDescription);

    const canonicalEl = document.getElementById('canonical-link');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);

    const ogTitleEl = document.getElementById('og-title');
    if (ogTitleEl) ogTitleEl.setAttribute('content', activeMeta.metaTitle);

    const ogDescEl = document.getElementById('og-description');
    if (ogDescEl) ogDescEl.setAttribute('content', activeMeta.metaDescription);

    const ogUrlEl = document.getElementById('og-url');
    if (ogUrlEl) ogUrlEl.setAttribute('content', canonicalUrl);

    const twTitleEl = document.getElementById('twitter-title');
    if (twTitleEl) twTitleEl.setAttribute('content', activeMeta.metaTitle);

    const twDescEl = document.getElementById('twitter-description');
    if (twDescEl) twDescEl.setAttribute('content', activeMeta.metaDescription);

    const schemaEl = document.getElementById('schema-jsonld');
    if (schemaEl) {
      const schemaPayload = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ArchiveOrganization',
            '@id': 'https://ahi-ks.daic.gov.in/#organization',
            name: 'Dr. Ambedkar International Centre (DAIC) — Ministry of Social Justice & Empowerment',
            url: 'https://ahi-ks.daic.gov.in',
            logo: 'https://ahi-ks.daic.gov.in/og-image.png'
          },
          {
            '@type': activeMeta.schemaType,
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: activeMeta.metaTitle,
            headline: activeMeta.h1Title,
            description: activeMeta.metaDescription,
            inLanguage: language,
            isPartOf: { '@id': 'https://ahi-ks.daic.gov.in/#organization' },
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: 'https://ahi-ks.daic.gov.in/og-image.png',
              width: 1200,
              height: 630,
              caption: activeMeta.h1Title
            }
          }
        ]
      };
      schemaEl.textContent = JSON.stringify(schemaPayload);
    }
  }, [activeTab, activeMeta, canonicalUrl, language]);

  return (
    <div className="w-full max-w-[1640px] mx-auto px-4 sm:px-6 xl:px-12 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-stone-200/80">
        <div>
          {/* STRICTLY THE SINGLE H1 TAG ON EVERY PAGE */}
          <h1
            id="page-main-h1"
            className="text-lg sm:text-xl md:text-2xl font-serif-archival font-bold text-[#1B2A4A] tracking-tight"
          >
            {activeMeta.h1Title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{activeMeta.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

interface SeoInternalLinksSectionProps {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  onQuickQuery: (q: string) => void;
}

export const SeoInternalLinksSection: React.FC<SeoInternalLinksSectionProps> = ({
  activeTab,
  setActiveTab,
  onQuickQuery
}) => {
  const internalTopicLinks = [
    {
      label: 'Article 32 — Constitutional Remedies (CAD Vol. VII)',
      slug: '/rag-provenance-engine',
      tab: 'search' as ActiveTab,
      query: "Analyze Babasaheb's core rationale for Article 32 as the 'Heart and Soul' of the Indian Constitution"
    },
    {
      label: 'BAWS Vol. 6 — The Problem of the Rupee (1923)',
      slug: '/rag-provenance-engine',
      tab: 'search' as ActiveTab,
      query: 'How did Dr. B. R. Ambedkar conceptualize the Reserve Bank of India in The Problem of the Rupee (BAWS Vol. 6)?'
    },
    {
      label: 'BAWS Vol. 1–22 Digital Heritage Vault',
      slug: '/heritage-archive-vault',
      tab: 'vault' as ActiveTab
    },
    {
      label: 'Constituent Assembly Debates Graph',
      slug: '/constituent-assembly-debates-visualizer',
      tab: 'cad-graph' as ActiveTab
    },
    {
      label: 'Parliamentary Speech & Legal Lexicon',
      slug: '/bhashini-audio-karaoke-lexicon',
      tab: 'karaoke' as ActiveTab
    }
  ];

  const partnerPortals = [
    { name: 'DAIC New Delhi', url: 'https://daic.gov.in' },
    { name: 'Ministry of Social Justice & Empowerment', url: 'https://socialjustice.gov.in' },
    { name: 'National Archives of India', url: 'https://nationalarchives.nic.in' },
    { name: 'Digital India Bhashini', url: 'https://bhashini.gov.in' }
  ];

  return (
    <section
      aria-label="Related Archival Sections and Institutional Links"
      className="w-full max-w-[1640px] mx-auto px-4 sm:px-6 xl:px-12 pb-10 pt-2"
    >
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A]">
            Explore Archival Collections
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {internalTopicLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.slug}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.query) {
                    onQuickQuery(item.query);
                  } else {
                    setActiveTab(item.tab);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                  activeTab === item.tab && !item.query
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] font-medium'
                    : 'bg-[#faf9f6] hover:bg-stone-100 text-zinc-700 border-stone-200'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-2 lg:text-right">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Institutional Portals
          </h3>
          <div className="flex flex-wrap lg:justify-end items-center gap-3 text-xs text-zinc-600">
            {partnerPortals.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1B2A4A] hover:underline transition-colors"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
