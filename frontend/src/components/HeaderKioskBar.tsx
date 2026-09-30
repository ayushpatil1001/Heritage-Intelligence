import React from 'react';
import { LANGUAGE_LABELS, SupportedLanguage } from '../data/edgeCorpus';
import { SEO_ROUTE_MAP } from './SeoHeadManager';

export type ActiveTab = 'search' | 'vault' | 'cad-graph' | 'karaoke' | 'curator';

interface HeaderKioskBarProps {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  language: SupportedLanguage;
  setLanguage: (l: SupportedLanguage) => void;
  highContrastMode: boolean;
  setHighContrastMode: (v: boolean) => void;
}

export const HeaderKioskBar: React.FC<HeaderKioskBarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  highContrastMode,
  setHighContrastMode
}) => {
  const navItems: Array<{ id: ActiveTab; label: string; slug: string }> = [
    { id: 'search', label: 'Search & Provenance', slug: SEO_ROUTE_MAP.search.slug },
    { id: 'vault', label: 'Archive Vault', slug: SEO_ROUTE_MAP.vault.slug },
    { id: 'cad-graph', label: 'Constituent Debates', slug: SEO_ROUTE_MAP['cad-graph'].slug },
    { id: 'karaoke', label: 'Audio & Speeches', slug: SEO_ROUTE_MAP.karaoke.slug },
    { id: 'curator', label: 'Curator Portal', slug: SEO_ROUTE_MAP.curator.slug }
  ];

  return (
    <header className="w-full bg-white border-b border-stone-300 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="/rag-provenance-engine"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('search');
          }}
          className="flex items-center gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1B2A4A] flex items-center justify-center text-white shadow-xs shrink-0 group-hover:bg-[#142038] transition-colors border border-[#1B2A4A]/20">
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              account_balance
            </span>
          </div>
          <div>
            <span className="block text-base sm:text-lg font-serif-archival text-[#1B2A4A] font-bold tracking-tight leading-tight">
              Ambedkar Heritage Intelligence
            </span>
            <span className="block text-[11px] text-zinc-500 font-medium">
              Digital Archive &amp; Kiosk System
            </span>
          </div>
        </a>

        {/* Primary Desktop Navigation with Breathing Room */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.slug}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`px-4 py-2 text-xs rounded-lg transition-all font-medium border ${
                  isActive
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-xs font-semibold'
                    : 'text-zinc-600 border-transparent hover:text-[#1B2A4A] hover:bg-stone-100 hover:border-stone-200'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Language Selector & Accessibility */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Select Language"
            className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-300"
          >
            {(['en', 'mr', 'hi'] as SupportedLanguage[]).map((langKey) => {
              const info = LANGUAGE_LABELS[langKey];
              const isSelected = language === langKey;
              return (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => setLanguage(langKey)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#1B2A4A] font-bold shadow-xs border border-stone-200'
                      : 'text-zinc-600 hover:text-zinc-900 font-medium border border-transparent'
                  }`}
                >
                  {info.native}
                </button>
              );
            })}
          </div>

          {/* Reading Contrast Mode */}
          <button
            type="button"
            onClick={() => setHighContrastMode(!highContrastMode)}
            className={`p-2 border rounded-xl text-xs transition-colors cursor-pointer shadow-2xs ${
              highContrastMode
                ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                : 'bg-white text-zinc-600 border-stone-300 hover:border-stone-400 hover:text-[#1B2A4A]'
            }`}
            title="Toggle Contrast Mode"
            aria-label="Toggle Contrast Mode"
          >
            <span className="material-symbols-outlined text-base block" aria-hidden="true">
              contrast
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip (< lg) */}
      <nav
        aria-label="Mobile Navigation"
        className="flex lg:hidden w-full items-center gap-1.5 overflow-x-auto px-4 sm:px-8 py-2.5 border-t border-stone-300 bg-[#faf9f6]"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.slug}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-all shrink-0 font-medium border ${
                isActive
                  ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] font-semibold'
                  : 'bg-white text-zinc-700 border-stone-300'
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
