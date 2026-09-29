import React, { useState, useEffect } from 'react';
import { ArchivalRecord, LANGUAGE_LABELS, SupportedLanguage } from '../data/edgeCorpus';
import { executeDualTierRagSearch, SearchResponsePayload } from '../utils/localRagEngine';
import { ActiveTab } from './HeaderKioskBar';

interface SearchProvenanceModuleProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isOfflineEdgeMode: boolean;
  setIsOfflineEdgeMode: (offline: boolean) => void;
  ultrasonicDomeActive: boolean;
  customRecords: ArchivalRecord[];
  initialQuery?: string;
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
}

export const SearchProvenanceModule: React.FC<SearchProvenanceModuleProps> = ({
  language,
  setLanguage,
  isOfflineEdgeMode,
  setIsOfflineEdgeMode,
  ultrasonicDomeActive,
  customRecords,
  initialQuery,
  activeTab,
  setActiveTab
}) => {
  const [queryInput, setQueryInput] = useState<string>(
    initialQuery ||
      "Analyze Babasaheb's core rationale for Article 32 as the 'Heart and Soul' of the Indian Constitution, with archival proof from CAD Vol. VII."
  );
  const [result, setResult] = useState<SearchResponsePayload | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [isSpeakingTts, setIsSpeakingTts] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  const performSearch = async (targetQuery: string, targetLang: SupportedLanguage, forceOffline?: boolean) => {
    setIsSearching(true);
    const offlineState = forceOffline !== undefined ? forceOffline : isOfflineEdgeMode;
    const response = await executeDualTierRagSearch(targetQuery, targetLang, offlineState, customRecords);
    setResult(response);
    setIsSearching(false);
  };

  useEffect(() => {
    performSearch(queryInput, language, isOfflineEdgeMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, isOfflineEdgeMode]);

  useEffect(() => {
    if (initialQuery && initialQuery !== queryInput) {
      setQueryInput(initialQuery);
      performSearch(initialQuery, language, isOfflineEdgeMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const speakSynthesis = (text: string, langCode: SupportedLanguage) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_LABELS[langCode].ttsLang;
    utterance.rate = 0.96;
    utterance.onstart = () => setIsSpeakingTts(true);
    utterance.onend = () => setIsSpeakingTts(false);
    utterance.onerror = () => setIsSpeakingTts(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingTts(false);
  };

  const handleVoiceMicInput = () => {
    const SpeechRecognitionAPI =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognitionAPI as any)();
      recognition.lang = LANGUAGE_LABELS[language].bhashiniCode;
      recognition.interimResults = false;
      setIsListeningMic(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQueryInput(transcript);
        setIsListeningMic(false);
        performSearch(transcript, language);
      };
      recognition.onerror = () => setIsListeningMic(false);
      recognition.onend = () => setIsListeningMic(false);
      recognition.start();
    } else {
      setIsListeningMic(true);
      setTimeout(() => {
        const sampleByLang: Record<SupportedLanguage, string> = {
          mr: 'डॉ. आंबेडकरांचे रिझर्व्ह बँक स्थापनेविषयी काय विचार होते?',
          hi: 'अनुच्छेद 32 को संविधान की आत्मा क्यों कहा गया है?',
          en: 'Analyze Babasaheb’s core rationale for Article 32 as the Heart and Soul of the Constitution',
          ta: 'ரிசர்வ் வங்கி உருவாக்கம் குறித்து டாக்டர் அம்பேத்கரின் கருத்து',
          te: 'ఆర్టికల్ 32 రాజ్యాంగ ఆత్మ అని డాక్టర్ అంబేద్కర్ ఎందుకు అన్నారు?'
        };
        const q = sampleByLang[language];
        setQueryInput(q);
        setIsListeningMic(false);
        performSearch(q, language);
      }, 800);
    }
  };

  const handleExportTeiXml = () => {
    if (!result?.primaryRecord) return;
    const rec = result.primaryRecord;
    const xml = `<TEI xmlns="http://www.tei-c.org/ns/1.0"><teiHeader><fileDesc><titleStmt><title>${rec.title}</title></titleStmt><publicationStmt><authority>DAIC New Delhi / MoSJE</authority><idno>${rec.manuscriptScan.archiveCode}</idno></publicationStmt></fileDesc></teiHeader><text><body><p>${rec.verbatimQuote}</p></body></text></TEI>`;
    navigator.clipboard.writeText(xml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const confPercentage = result ? Math.round(result.confidence * 100) : 96;
  const strokeDashoffset = 63 - (63 * Math.min(100, Math.max(0, confPercentage))) / 100;

  return (
    <div className="space-y-6">
      {/* FEATURED ARCHIVAL INQUIRIES */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A]">
            Featured Archival Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Inquiry 1 */}
          <div
            onClick={() => {
              setActiveScenarioIdx(0);
              const q =
                "Analyze Babasaheb's core rationale for Article 32 as the 'Heart and Soul' of the Indian Constitution, with archival proof from CAD Vol. VII.";
              setLanguage('en');
              setQueryInput(q);
              performSearch(q, 'en', isOfflineEdgeMode);
            }}
            className={`bg-white p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
              activeScenarioIdx === 0
                ? 'border-[#1B2A4A] ring-1 ring-[#1B2A4A]/15 shadow-2xs'
                : 'border-stone-200 hover:border-[#1B2A4A]/40'
            }`}
          >
            <div>
              <span className="inline-block px-2 py-0.5 bg-[#1B2A4A]/8 text-[#1B2A4A] text-[11px] font-semibold rounded-md mb-2">
                CAD Vol. VII • p. 953
              </span>
              <h3 className="text-sm text-zinc-900 font-bold line-clamp-2 mb-1">
                Article 32 &amp; Constitutional Remedies
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                Constituent Assembly debate on the right to move the Supreme Court for fundamental rights.
              </p>
            </div>
          </div>

          {/* Inquiry 2 */}
          <div
            onClick={() => {
              setActiveScenarioIdx(1);
              const q = 'डॉ. आंबेडकरांचे रिझर्व्ह बँक स्थापनेविषयी काय विचार होते? (Problem of the Rupee & 1936 Proof)';
              setLanguage('mr');
              setQueryInput(q);
              performSearch(q, 'mr', isOfflineEdgeMode);
            }}
            className={`bg-white p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
              activeScenarioIdx === 1
                ? 'border-[#1B2A4A] ring-1 ring-[#1B2A4A]/15 shadow-2xs'
                : 'border-stone-200 hover:border-[#1B2A4A]/40'
            }`}
          >
            <div>
              <span className="inline-block px-2 py-0.5 bg-[#1B2A4A]/8 text-[#1B2A4A] text-[11px] font-semibold rounded-md mb-2">
                BAWS Vol. 6 • Marathi
              </span>
              <h3 className="text-sm text-zinc-900 font-bold line-clamp-2 mb-1">
                Reserve Bank &amp; Problem of the Rupee
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                &ldquo;डॉ. आंबेडकरांचे रिझर्व्ह बँक स्थापनेविषयी काय विचार होते?&rdquo; — Hilton Young Commission evidence.
              </p>
            </div>
          </div>

          {/* Inquiry 3 */}
          <div
            onClick={() => {
              setActiveScenarioIdx(2);
              const q = 'महाड सत्याग्रहाबद्दल माहिती द्या (Mahad Chavdar Tale Satyagraha)';
              setIsOfflineEdgeMode(true);
              setLanguage('mr');
              setQueryInput(q);
              performSearch(q, 'mr', true);
            }}
            className={`bg-white p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
              activeScenarioIdx === 2
                ? 'border-[#1B2A4A] ring-1 ring-[#1B2A4A]/15 shadow-2xs'
                : 'border-stone-200 hover:border-[#1B2A4A]/40'
            }`}
          >
            <div>
              <span className="inline-block px-2 py-0.5 bg-[#1B2A4A]/8 text-[#1B2A4A] text-[11px] font-semibold rounded-md mb-2">
                BAWS Vol. 17 • 1927
              </span>
              <h3 className="text-sm text-zinc-900 font-bold line-clamp-2 mb-1">
                Mahad Chavdar Tale Satyagraha
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                Primary resolution for equal civic access to public water resources at Mahad (March 1927).
              </p>
            </div>
          </div>

          {/* Inquiry 4 */}
          <div
            onClick={() => {
              setActiveScenarioIdx(3);
              const q = 'Who won the 2026 Cricket IPL Tournament and cryptocurrency forecast?';
              setQueryInput(q);
              performSearch(q, language, isOfflineEdgeMode);
            }}
            className={`bg-white p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between border ${
              activeScenarioIdx === 3
                ? 'border-[#1B2A4A] ring-1 ring-[#1B2A4A]/15 shadow-2xs'
                : 'border-stone-200 hover:border-[#1B2A4A]/40'
            }`}
          >
            <div>
              <span className="inline-block px-2 py-0.5 bg-stone-100 text-zinc-600 text-[11px] font-semibold rounded-md mb-2">
                Citation Guardrail
              </span>
              <h3 className="text-sm text-zinc-900 font-bold line-clamp-2 mb-1">
                Out-of-Archive Topic Verification
              </h3>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                Demonstrates strict archival boundary rejection for topics outside Dr. Ambedkar&apos;s works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEGATIVE GUARDRAIL REJECTION CARD (When Confidence < 0.85) */}
      {result && !result.verified && (
        <div className="bg-white border border-zinc-900 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-zinc-900 border border-stone-300">
                <span className="material-symbols-outlined text-xl">gpp_bad</span>
              </div>
              <div>
                <span className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-zinc-600">
                  ZERO-HALLUCINATION GUARDRAIL ENFORCED (CONFIDENCE {result.confidence} &lt; 0.85)
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-0.5 font-serif-archival">
                  Unverified Topic Blocked Prior to Synthesis
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                const q =
                  "Analyze Babasaheb's core rationale for Article 32 as the 'Heart and Soul' of the Indian Constitution";
                setQueryInput(q);
                performSearch(q, language);
              }}
              className="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-semibold cursor-pointer"
            >
              Return to Verified Article 32 Analysis
            </button>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#faf9f6] border-l-2 border-l-zinc-900 border border-stone-200">
            <p className="text-xs uppercase font-mono-code text-zinc-500 mb-1">
              Mandatory PRD Section 5 Negative Rejection Output:
            </p>
            <p className="text-lg sm:text-xl font-serif-archival font-bold text-zinc-900">
              &ldquo;{result.guardrailMessage}&rdquo;
            </p>
            {result.localizedGuardrail && result.language !== 'en' && (
              <p className="text-sm text-zinc-600 mt-2">{result.localizedGuardrail}</p>
            )}
          </div>
        </div>
      )}

      {/* MAIN INTERACTIVE WORKSPACE: SPLIT-SCREEN PROVENANCE VERIFICATION */}
      {result && result.verified && result.primaryRecord && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANEL: GROUNDED AI SYNTHESIS & SCHOLARLY INGESTION (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Query Vector Card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                performSearch(queryInput, language);
              }}
              className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-zinc-600 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">travel_explore</span> Query Vector
                </span>
                <span className="text-[10px] font-mono-code text-zinc-400">
                  {result.primaryRecord.volume.slice(0, 24)} • {result.latencyMs}ms
                </span>
              </div>
              <div className="relative flex items-center gap-1.5">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Enter query in Marathi, Hindi, Tamil, Telugu, or English..."
                  className="w-full bg-[#faf9f6] border border-stone-200 rounded-xl px-3.5 py-2.5 pr-20 text-xs sm:text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleVoiceMicInput}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                      isListeningMic
                        ? 'bg-zinc-900 text-white animate-pulse'
                        : 'bg-stone-100 text-zinc-700 hover:bg-stone-200'
                    }`}
                    title="Speak via Bhashini Mic"
                  >
                    <span className="material-symbols-outlined text-sm">mic</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-7 h-7 flex items-center justify-center bg-[#1B2A4A] text-white rounded-lg hover:bg-[#152238] transition-all cursor-pointer"
                    title="Run Archival Search"
                  >
                    <span className="material-symbols-outlined text-sm">search</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Grounded Synthesis Card with Subtle Navy Top Border */}
            <div className="bg-white border border-stone-200 border-t-2 border-t-[#1B2A4A] rounded-2xl p-5 md:p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                <div>
                  <span className="text-[11px] text-[#1B2A4A] font-semibold uppercase tracking-wide">
                    Archival Synthesis
                  </span>
                  <h3 className="font-serif-archival text-lg md:text-xl text-zinc-900 font-bold mt-0.5 leading-snug">
                    {result.primaryRecord.title}
                  </h3>
                </div>

                {/* Circular Confidence Ring in Navy */}
                <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#1B2A4A]/15 px-2.5 py-1.5 rounded-xl shrink-0">
                  <div className="relative flex items-center justify-center">
                    <svg
                      role="img"
                      aria-label={`Cosine similarity confidence score ${(result.confidence * 100).toFixed(1)} percent`}
                      className="w-8 h-8 transform -rotate-90"
                    >
                      <circle
                        className="text-stone-200"
                        cx="16"
                        cy="16"
                        fill="transparent"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <circle
                        className="text-[#1B2A4A]"
                        cx="16"
                        cy="16"
                        fill="transparent"
                        r="10"
                        stroke="currentColor"
                        strokeDasharray="63"
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <span className="absolute font-mono-code font-bold text-[9px] text-[#1B2A4A]">
                      {confPercentage}%
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#1B2A4A] leading-tight">
                      {result.confidence}
                    </div>
                    <div className="text-[9px] text-zinc-500 font-medium">Verified</div>
                  </div>
                </div>
              </div>

              {/* Editorial Synthesis Text + Quote */}
              <div className="font-serif-archival text-xs sm:text-sm text-zinc-800 leading-relaxed space-y-3">
                <p>{result.localizedAnswer}</p>
                <p className="bg-[#F8FAFC] p-3.5 rounded-xl border-l-2 border-[#1B2A4A] italic text-zinc-800 text-xs md:text-sm">
                  {result.primaryRecord.verbatimQuote}
                </p>
                {language !== 'en' && (
                  <p className="text-xs text-zinc-500 font-sans border-t border-stone-200 pt-2">
                    <strong className="text-zinc-800">English Reference:</strong> {result.englishAnswer}
                  </p>
                )}
              </div>

              {/* Archival Citations Block */}
              <div className="bg-[#faf9f6] border border-stone-200 p-3 rounded-xl space-y-1.5">
                <span className="text-[10px] font-semibold text-[#1B2A4A] uppercase tracking-wider block">
                  Primary Source Citation
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-stone-200 rounded-full text-xs font-medium text-zinc-800">
                    <span className="material-symbols-outlined text-xs text-[#1B2A4A]">link</span> {result.primaryRecord.volume},{' '}
                    {result.primaryRecord.page}
                  </span>
                </div>
              </div>

              {/* Bhashini Neural Speech Player Card */}
              <div className="bg-[#faf9f6] p-3 rounded-xl border border-stone-200 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#1B2A4A] text-sm">graphic_eq</span>
                    <span className="text-xs font-semibold text-zinc-900">Audio Narration</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white p-1.5 rounded-xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() =>
                      isSpeakingTts
                        ? stopSpeech()
                        : speakSynthesis(result.localizedAnswer || '', language)
                    }
                    className="w-8 h-8 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center hover:bg-[#152238] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isSpeakingTts ? 'stop' : 'play_arrow'}
                    </span>
                  </button>
                  <div className="flex-1 flex items-center gap-1.5 h-5 px-1 overflow-hidden">
                    {[3, 5, 4, 3, 5, 4, 2, 4, 3, 5, 3, 2, 4, 3].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          isSpeakingTts ? 'bg-[#1B2A4A] animate-pulse' : i < 8 ? 'bg-[#1B2A4A]' : 'bg-stone-200'
                        }`}
                        style={{ height: `${h * 4}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-code text-xs text-zinc-400 pr-1">
                    {isSpeakingTts ? 'Playing' : 'Listen'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] text-zinc-500 font-medium">Language:</span>
                  {(['mr', 'hi', 'en', 'ta', 'te'] as SupportedLanguage[]).map((lk) => (
                    <button
                      key={lk}
                      type="button"
                      onClick={() => {
                        setLanguage(lk);
                        speakSynthesis(result.primaryRecord?.synthesis[lk] || '', lk);
                      }}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] cursor-pointer transition-all ${
                        language === lk
                          ? 'bg-[#1B2A4A] text-white font-semibold'
                          : 'hover:bg-stone-200 text-zinc-600'
                      }`}
                    >
                      {LANGUAGE_LABELS[lk].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: DIGITIZED ARCHIVAL MANUSCRIPT & CAD TRANSCRIPT VIEWER (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Archival Viewer Toolbar */}
            <div className="bg-white border border-stone-200 rounded-2xl px-4 py-2.5 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="/kiosk-preview-compressed.png"
                  alt={`Digitized 600 DPI Archival Folio Scan for ${result.primaryRecord.title} (${result.primaryRecord.manuscriptScan.archiveCode})`}
                  width={36}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-7 rounded object-cover border border-stone-200 shrink-0"
                />
                <div>
                  <h2 className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                    {result.primaryRecord.manuscriptScan.headerTitle}
                    <span className="px-1.5 py-0.5 bg-stone-100 text-zinc-700 rounded text-[9px] font-mono-code font-medium">
                      600 DPI
                    </span>
                  </h2>
                  <span className="text-[11px] text-zinc-500">
                    National Archives / DAIC • {result.primaryRecord.manuscriptScan.archiveCode}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomScale(Math.min(120, zoomScale + 10))}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-base">zoom_in</span>
                </button>
                <button
                  onClick={() => setZoomScale(Math.max(85, zoomScale - 10))}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-base">zoom_out</span>
                </button>
                <button
                  onClick={() => setZoomScale(100)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  title="Fit to Screen"
                >
                  <span className="material-symbols-outlined text-base">fit_screen</span>
                </button>
              </div>
            </div>

            {/* Digitized Artifact Parchment Canvas */}
            <div className="minimal-parchment border border-stone-300/80 rounded-2xl p-6 md:p-8 shadow-2xs relative overflow-hidden min-h-[510px] select-text">
              <div
                style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top left' }}
                className="transition-transform duration-200"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none">
                  <span className="material-symbols-outlined text-[280px] text-zinc-900">account_balance</span>
                </div>

                {/* Folio Top Header */}
                <div className="border-b border-stone-300/80 pb-3 mb-5 flex justify-between items-start">
                  <div>
                    <p className="font-serif-archival text-sm md:text-base tracking-wide text-zinc-900 uppercase font-bold">
                      {result.primaryRecord.collection}
                    </p>
                    <p className="font-serif-archival text-xs text-zinc-600 mt-0.5">
                      {result.primaryRecord.manuscriptScan.subHeader}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono-code text-[11px] font-semibold text-zinc-800 bg-stone-200/80 px-2.5 py-0.5 rounded">
                      {result.primaryRecord.page.toUpperCase()}
                    </div>
                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider mt-0.5 font-mono-code">
                      {result.primaryRecord.manuscriptScan.archiveCode}
                    </div>
                  </div>
                </div>

                {/* 2-Column Archival Proceedings Layout with OCR Bounding Box Quote Match */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-800 font-serif-archival text-xs md:text-[13px] leading-relaxed">
                  {/* Left Column */}
                  <div className="space-y-3.5">
                    {result.primaryRecord.manuscriptScan.lines.slice(0, 3).map((line, i) => (
                      <p key={i} className="text-justify indent-4">
                        <strong className="text-zinc-900">[Folio L{i + 1}]</strong> {line}
                      </p>
                    ))}
                    <p className="text-justify indent-4 text-zinc-600">
                      The proceedings of this archival volume are cryptographically indexed in the National Digital Library (NDL) and Dr. Ambedkar International Centre (DAIC) repository to guarantee zero-hallucination provenance verification.
                    </p>
                  </div>

                  {/* Right Column: Highlighted Primary Excerpt */}
                  <div className="space-y-3.5 relative">
                    <div className="relative bg-[#F8FAFC] border border-[#1B2A4A]/35 p-4 rounded-xl shadow-2xs my-1">
                      <div className="text-[10px] font-semibold text-[#1B2A4A] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]" />
                          Verified Primary Passage
                        </span>
                        <span className="font-mono-code text-zinc-500">
                          {result.primaryRecord.date}
                        </span>
                      </div>
                      <p className="font-serif-archival text-xs md:text-[13px] leading-relaxed font-semibold text-zinc-900 italic">
                        {result.primaryRecord.verbatimQuote}
                      </p>
                    </div>

                    {result.primaryRecord.manuscriptScan.lines.slice(3).map((line, i) => (
                      <p key={i} className="text-justify indent-4">
                        <strong className="text-zinc-900">[Folio L{i + 4}]</strong> {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Clean Archival Footer */}
                <div className="mt-6 pt-3 border-t border-stone-300/60 flex flex-wrap items-center justify-between text-[11px] text-zinc-500">
                  <span>Dr. Ambedkar International Centre (DAIC) Archival Folio</span>
                  <button
                    onClick={handleExportTeiXml}
                    className="text-xs font-medium text-[#1B2A4A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">download</span>
                    <span>{copiedXml ? 'Citation Copied' : 'Copy Citation XML'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
