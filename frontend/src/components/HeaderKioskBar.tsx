import React from 'react';
import { LANGUAGE_LABELS, SupportedLanguage } from '../data/edgeCorpus';
import { SEO_ROUTE_MAP } from './SeoHeadManager';

export type ActiveTab = 'search' | 'vault' | 'cad-graph' | 'karaoke' | 'curator';

interface HeaderKioskBarProps {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  language: SupportedLanguage;
  setLanguage: (l: SupportedLanguage) => void;
  isOfflineEdgeMode: boolean;
  setIsOfflineEdgeMode: (v: boolean) => void;
  ultrasonicDomeActive: boolean;
  setUltrasonicDomeActive: (v: boolean) => void;
  highContrastMode: boolean;
  setHighContrastMode: (v: boolean) => void;
  wheelchairMode: boolean;
  setWheelchairMode: (v: boolean) => void;
  proximityCm: number;
  setProximityCm: (cm: number) => void;
  onTriggerStandbyOverlay: () => void;
  supabaseDocCount: number;
  onQuickSearch?: (q: string) => void;
}

export const HeaderKioskBar: React.FC<HeaderKioskBarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  highContrastMode,
  setHighContrastMode,
  onQuickSearch
}) => {
  const [quickQuery, setQuickQuery] = React.useState('');

  const pillNav: Array<{ id: ActiveTab; label: string; slug: string }> = [
    { id: 'search', label: 'Archival Search', slug: SEO_ROUTE_MAP.search.slug },
    { id: 'vault', label: 'Heritage Vault', slug: SEO_ROUTE_MAP.vault.slug },
    { id: 'cad-graph', label: 'Constitutional Graph', slug: SEO_ROUTE_MAP['cad-graph'].slug },
    { id: 'karaoke', label: 'Audio Lexicon', slug: SEO_ROUTE_MAP.karaoke.slug },
    { id: 'curator', label: 'Curator Archive', slug: SEO_ROUTE_MAP.curator.slug }
  ];

  return (
    <header className="w-full px-4 sm:px-6 xl:px-12 py-3.5 flex flex-wrap items-center justify-between gap-3 z-40 sticky top-0 left-0 bg-[#faf9f6]/95 border-b border-stone-200/90 backdrop-blur-md transition-all">
      {/* Left: DAIC State Emblem & Institutional Brand Link */}
      <div className="flex items-center gap-3">
        <a
          href="/rag-provenance-engine"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('search');
          }}
          aria-label="Ambedkar Heritage Intelligence and Kiosk System Home"
          className="w-10 h-10 rounded-xl bg-[#1B2A4A] flex items-center justify-center text-white shadow-2xs shrink-0"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">
            account_balance
          </span>
        </a>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#1B2A4A]/80 font-semibold tracking-wider uppercase">
              Dr. Ambedkar International Centre • GoI
            </span>
          </div>
          <a
            href="/rag-provenance-engine"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('search');
            }}
            className="block text-base sm:text-lg font-serif-archival text-zinc-900 tracking-tight font-bold hover:text-[#1B2A4A] transition-colors"
          >
            Ambedkar Heritage Intelligence
          </a>
        </div>
      </div>

      {/* Center: Navigation Pills & Clean Search Input */}
      <div className="hidden xl:flex items-center gap-3">
        <nav
          aria-label="Primary Archival Modules"
          className="flex items-center bg-stone-100 p-1 rounded-full border border-stone-200"
        >
          {pillNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.slug}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`px-3.5 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1B2A4A] text-white font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:text-[#1B2A4A] font-medium'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (quickQuery.trim() && onQuickSearch) {
              onQuickSearch(quickQuery.trim());
              setQuickQuery('');
            }
          }}
          className="relative w-48"
          role="search"
        >
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-base"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            aria-label="Search archival records"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="Search archive..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-zinc-900 focus:outline-none focus:border-[#1B2A4A]"
          />
        </form>
      </div>

      {/* Right: Language Selector & Contrast Toggle */}
      <div className="flex items-center gap-2">
        <div
          role="group"
          aria-label="Select Archival Language"
          className="flex items-center bg-stone-100 rounded-full p-1 border border-stone-200 overflow-x-auto max-w-full"
        >
          {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map((langKey) => {
            const info = LANGUAGE_LABELS[langKey];
            const isSelected = language === langKey;
            return (
              <button
                key={langKey}
                type="button"
                onClick={() => setLanguage(langKey)}
                className={`px-2.5 py-1 text-xs rounded-full transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#1B2A4A] text-white font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:text-[#1B2A4A] font-medium'
                }`}
              >
                {langKey === 'en' ? 'EN' : info.native}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setHighContrastMode(!highContrastMode)}
          className={`p-1.5 border rounded-full text-xs font-medium transition-all cursor-pointer ${
            highContrastMode
              ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
              : 'bg-white text-zinc-600 border-stone-200 hover:border-[#1B2A4A]/40 hover:text-[#1B2A4A]'
          }`}
          title="Toggle High Contrast Reading Mode"
          aria-label="Toggle High Contrast Reading Mode"
        >
          <span className="material-symbols-outlined text-base block" aria-hidden="true">
            contrast
          </span>
        </button>
      </div>

      {/* Mobile & Tablet Responsive Navigation Bar (< xl screens) */}
      <nav
        aria-label="Mobile Archival Navigation"
        className="flex xl:hidden w-full items-center gap-1.5 overflow-x-auto py-1 border-t border-stone-200/70 pt-2"
      >
        {pillNav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.slug}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-all shrink-0 ${
                isActive
                  ? 'bg-[#1B2A4A] text-white font-semibold shadow-2xs'
                  : 'bg-stone-100 text-zinc-700 hover:bg-stone-200 font-medium'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
};
