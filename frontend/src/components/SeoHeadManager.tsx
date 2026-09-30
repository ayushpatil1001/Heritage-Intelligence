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
    h1Title: 'Archival Search & Provenance',
    subtitle: 'Ask questions grounded in Dr. B. R. Ambedkar’s collected works (BAWS Vol. 1–22) and Constituent Assembly Debates',
    metaTitle: 'Search & Provenance | Ambedkar Heritage Intelligence',
    metaDescription:
      'Search verified primary sources of Dr. B. R. Ambedkar with original manuscript scans and citations from BAWS Vol. 1–22 and Constituent Assembly Debates.',
    breadcrumbName: 'Search',
    schemaType: 'SearchResultsPage'
  },
  vault: {
    slug: '/heritage-archive-vault',
    h1Title: 'Digital Heritage Archive',
    subtitle: 'Browse books, historic speeches, Constituent Assembly proceedings, and rare manuscripts',
    metaTitle: 'Archive Vault | Ambedkar Heritage Intelligence',
    metaDescription:
      'Explore authenticated books, debates, speeches, and manuscripts from Dr. B. R. Ambedkar Writings and Speeches.',
    breadcrumbName: 'Archive Vault',
    schemaType: 'CollectionPage'
  },
  'cad-graph': {
    slug: '/constituent-assembly-debates-visualizer',
    h1Title: 'Constituent Assembly Debates (1946–1949)',
    subtitle: 'Interactive evolution of constitutional articles and Dr. Ambedkar’s decisive assembly rejoinders',
    metaTitle: 'Constituent Assembly Debates | Ambedkar Heritage Intelligence',
    metaDescription:
      'Examine the drafting and debate evolution of Articles 32, 14, 15, 17, and 38 with Dr. B. R. Ambedkar’s assembly speeches.',
    breadcrumbName: 'Debates Graph',
    schemaType: 'Dataset'
  },
  karaoke: {
    slug: '/bhashini-audio-karaoke-lexicon',
    h1Title: 'Historical Speeches & Audio Archive',
    subtitle: 'Audio recordings with synchronized text transcripts and constitutional legal definitions',
    metaTitle: 'Audio & Speeches | Ambedkar Heritage Intelligence',
    metaDescription:
      'Listen to historical speeches of Dr. B. R. Ambedkar with real-time synchronized transcripts and parliamentary lexicon.',
    breadcrumbName: 'Audio Archive',
    schemaType: 'AudioObject'
  },
  curator: {
    slug: '/daic-curator-hardware-telemetry',
    h1Title: 'Curator Ingestion & Specifications',
    subtitle: 'Index new archival documents and inspect public kiosk appliance hardware specifications',
    metaTitle: 'Curator Portal | Ambedkar Heritage Intelligence',
    metaDescription:
      'Curator document ingestion pipeline and turnkey public kiosk hardware specifications.',
    breadcrumbName: 'Curator Portal',
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
}

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  activeTab,
  setActiveTab,
  language
}) => {
  const activeMeta = SEO_ROUTE_MAP[activeTab];
  const canonicalUrl = `https://ahi-ks.daic.gov.in${activeMeta.slug}`;

  // Silent HTTPS enforcement & robots tag guard
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
  }, []);

  // History sync
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

  // Update <head> metadata silently
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

    const schemaEl = document.getElementById('schema-jsonld');
    if (schemaEl) {
      const schemaPayload = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ArchiveOrganization',
            '@id': 'https://ahi-ks.daic.gov.in/#organization',
            name: 'Ambedkar Heritage Intelligence & Kiosk System',
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
            inLanguage: language
          }
        ]
      };
      schemaEl.textContent = JSON.stringify(schemaPayload);
    }
  }, [activeTab, activeMeta, canonicalUrl, language]);

  return (
    <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-3">
      <div className="border-b border-stone-300 pb-5">
        {/* Strictly the 1 Authoritative H1 Tag Per Page */}
        <h1
          id="page-main-h1"
          className="text-2xl sm:text-3xl font-serif-archival font-bold text-[#1B2A4A] tracking-tight"
        >
          {activeMeta.h1Title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-3xl leading-relaxed">
          {activeMeta.subtitle}
        </p>
      </div>
    </div>
  );
};
