import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HeaderKioskBar, ActiveTab } from './components/HeaderKioskBar';
import { SearchProvenanceModule } from './components/SearchProvenanceModule';
import { SeoHeadManager, getTabFromPath } from './components/SeoHeadManager';
import { ArchivalRecord, EDGE_NVME_CORPUS, SupportedLanguage } from './data/edgeCorpus';
import { fetchSupabaseArchivalRecords } from './lib/supabaseClient';

// Lazy-loaded secondary modules
const HeritageVaultModule = lazy(() =>
  import('./components/HeritageVaultModule').then((m) => ({ default: m.HeritageVaultModule }))
);
const CadVisualizerModule = lazy(() =>
  import('./components/CadVisualizerModule').then((m) => ({ default: m.CadVisualizerModule }))
);
const AudioKaraokeModule = lazy(() =>
  import('./components/AudioKaraokeModule').then((m) => ({ default: m.AudioKaraokeModule }))
);
const CuratorAdminModule = lazy(() =>
  import('./components/CuratorAdminModule').then((m) => ({ default: m.CuratorAdminModule }))
);

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() =>
    typeof window !== 'undefined' ? getTabFromPath(window.location.pathname) : 'search'
  );
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [customRecords, setCustomRecords] = useState<ArchivalRecord[]>([]);
  const [externalRagQuery, setExternalRagQuery] = useState<string | undefined>(undefined);

  // Sync records from Supabase on startup
  useEffect(() => {
    fetchSupabaseArchivalRecords().then((rows) => {
      if (rows && rows.length > 0) {
        const extra = rows.filter((r) => !EDGE_NVME_CORPUS.some((base) => base.id === r.id));
        if (extra.length > 0) {
          setCustomRecords(extra);
        }
      }
    });
  }, []);

  const handleJumpToRagQuery = (query: string) => {
    setExternalRagQuery(query);
    setActiveTab('search');
  };

  return (
    <div
      className={`min-h-screen bg-[#faf9f6] text-[#18181b] flex flex-col font-sans transition-colors ${
        highContrastMode ? 'high-contrast-mode' : ''
      }`}
    >
      {/* Clean Institutional Navigation Header */}
      <HeaderKioskBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        highContrastMode={highContrastMode}
        setHighContrastMode={setHighContrastMode}
      />

      {/* Page Title & Head SEO Manager */}
      <SeoHeadManager
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* Main Content Workspace with Generous Padding */}
      <main className="flex-1 w-full max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-10 py-8 lg:py-10">
        <Suspense
          fallback={
            <div className="bg-white rounded-2xl border border-stone-300 p-12 text-center text-sm text-zinc-500 shadow-xs">
              Loading archival module...
            </div>
          }
        >
          {activeTab === 'search' && (
            <SearchProvenanceModule
              language={language}
              setLanguage={setLanguage}
              isOfflineEdgeMode={false}
              setIsOfflineEdgeMode={() => {}}
              ultrasonicDomeActive={true}
              customRecords={customRecords}
              initialQuery={externalRagQuery}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'vault' && (
            <HeritageVaultModule
              language={language}
              customRecords={customRecords}
              onInspectInRag={handleJumpToRagQuery}
            />
          )}

          {activeTab === 'cad-graph' && (
            <CadVisualizerModule onOpenArticleInRag={handleJumpToRagQuery} />
          )}

          {activeTab === 'karaoke' && (
            <AudioKaraokeModule
              language={language}
              ultrasonicDomeActive={true}
            />
          )}

          {activeTab === 'curator' && (
            <CuratorAdminModule
              customRecords={customRecords}
              onAddCustomRecord={(rec) => setCustomRecords((prev) => [rec, ...prev])}
              onTestIngestedInRag={handleJumpToRagQuery}
            />
          )}
        </Suspense>
      </main>

      {/* Clean, Spacious Institutional Footer */}
      <footer className="w-full bg-white border-t border-stone-300 py-6 mt-12 shadow-2xs">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <span className="font-medium text-zinc-600">Dr. Ambedkar International Centre • Digital Heritage Archive</span>
          <span>Aligned with SIH Problem Statement ID 26096</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
