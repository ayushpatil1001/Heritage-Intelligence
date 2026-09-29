import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HeaderKioskBar, ActiveTab } from './components/HeaderKioskBar';
import { SearchProvenanceModule } from './components/SearchProvenanceModule';
import { SeoHeadManager, SeoInternalLinksSection, getTabFromPath } from './components/SeoHeadManager';
import { ArchivalRecord, EDGE_NVME_CORPUS, SupportedLanguage } from './data/edgeCorpus';
import { fetchSupabaseArchivalRecords } from './lib/supabaseClient';
import { Radio, Hand } from 'lucide-react';

// Code-split secondary modules via React.lazy for Core Web Vitals (LCP / INP) optimization
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
  const [isOfflineEdgeMode, setIsOfflineEdgeMode] = useState<boolean>(false);
  const [ultrasonicDomeActive, setUltrasonicDomeActive] = useState<boolean>(true);
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [wheelchairMode, setWheelchairMode] = useState<boolean>(false);
  const [proximityCm, setProximityCm] = useState<number>(68);
  const [standbyOverlayOpen, setStandbyOverlayOpen] = useState<boolean>(false);
  const [customRecords, setCustomRecords] = useState<ArchivalRecord[]>([]);
  const [externalRagQuery, setExternalRagQuery] = useState<string | undefined>(undefined);

  // Sync live records from Supabase PostgreSQL cluster on startup
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

  // Auto-wake kiosk when visitor approaches <= 120cm on HC-SR04 sensor
  useEffect(() => {
    if (standbyOverlayOpen && proximityCm <= 120) {
      setStandbyOverlayOpen(false);
    }
  }, [proximityCm, standbyOverlayOpen]);

  const handleJumpToRagQuery = (query: string) => {
    setExternalRagQuery(query);
    setActiveTab('search');
  };

  const totalVerifiedDocs = EDGE_NVME_CORPUS.length + customRecords.length;

  return (
    <div
      className={`min-h-screen bg-[#faf9f6] text-[#18181b] flex flex-col overflow-x-hidden transition-all ${
        highContrastMode ? 'high-contrast-mode' : ''
      } ${wheelchairMode ? 'pt-28 translate-y-4' : ''}`}
    >
      <HeaderKioskBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isOfflineEdgeMode={isOfflineEdgeMode}
        setIsOfflineEdgeMode={setIsOfflineEdgeMode}
        ultrasonicDomeActive={ultrasonicDomeActive}
        setUltrasonicDomeActive={setUltrasonicDomeActive}
        highContrastMode={highContrastMode}
        setHighContrastMode={setHighContrastMode}
        wheelchairMode={wheelchairMode}
        setWheelchairMode={setWheelchairMode}
        proximityCm={proximityCm}
        setProximityCm={setProximityCm}
        onTriggerStandbyOverlay={() => {
          setProximityCm(195);
          setStandbyOverlayOpen(true);
        }}
        supabaseDocCount={totalVerifiedDocs}
        onQuickSearch={handleJumpToRagQuery}
      />

      {/* Dynamic SEO Manager, Canonical URL Router & Authoritative Single H1 Banner */}
      <SeoHeadManager
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        onQuickQuery={handleJumpToRagQuery}
      />

      {/* Main Content Workspace (Responsive layout with zero floating bottom bar) */}
      <main className="flex-1 w-full max-w-[1640px] mx-auto px-4 sm:px-6 xl:px-12 pt-4 pb-8">
        <Suspense
          fallback={
            <div className="stitch-card rounded-2xl p-8 text-center text-sm font-mono-code text-zinc-600">
              Loading Verified DAIC Archival Module...
            </div>
          }
        >
          {activeTab === 'search' && (
            <SearchProvenanceModule
              language={language}
              setLanguage={setLanguage}
              isOfflineEdgeMode={isOfflineEdgeMode}
              setIsOfflineEdgeMode={setIsOfflineEdgeMode}
              ultrasonicDomeActive={ultrasonicDomeActive}
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
              ultrasonicDomeActive={ultrasonicDomeActive}
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

      {/* Contextual Internal Archival Links, Sitemap & Institutional Backlink Directory */}
      <SeoInternalLinksSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickQuery={handleJumpToRagQuery}
      />

      {/* HC-SR04 / VL53L1X Ultrasonic Proximity Auto-Wake Standby Overlay */}
      {standbyOverlayOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="max-w-2xl w-full rounded-3xl border border-stone-300 bg-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 text-zinc-800 border border-stone-300 text-xs font-mono-code font-medium">
              <Radio className="w-4 h-4" /> HC-SR04 ULTRASONIC STANDBY RADAR • CURRENT DISTANCE: {proximityCm}cm
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-serif-archival">
              Dr. B. R. Ambedkar Digital Heritage Memorial Kiosk
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              &ldquo;Cultivation of mind should be the ultimate aim of human existence.&rdquo; — Step within{' '}
              <strong className="text-zinc-900">120 cm</strong> of the ultrasonic sensor (or tap below) to automatically wake the directional audio dome and Bhashini voice assistant.
            </p>

            <div className="p-4 rounded-2xl bg-[#faf9f6] border border-stone-200 space-y-2">
              <label className="block text-xs font-mono-code font-medium text-zinc-700">
                SIH Judge Booth Simulator: Slide HC-SR04 Distance ≤ 120cm to Auto-Wake Kiosk
              </label>
              <input
                type="range"
                min={25}
                max={240}
                value={proximityCm}
                onChange={(e) => setProximityCm(Number(e.target.value))}
                className="w-full accent-zinc-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-code text-zinc-500">
                <span>25cm (Visitor at Kiosk)</span>
                <span className="text-zinc-900 font-semibold">120cm Auto-Wake Threshold</span>
                <span>240cm (Gallery Corridor)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setProximityCm(68);
                setStandbyOverlayOpen(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs cursor-pointer"
            >
              <Hand className="w-4 h-4" />
              <span>Tap Touch Panel or Step Closer to Wake Kiosk</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
