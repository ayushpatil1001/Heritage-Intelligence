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
  customRecords,
  initialQuery
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

  const sampleQueries = [
    {
      label: 'Article 32: Heart & Soul',
      text: "Analyze Babasaheb's core rationale for Article 32 as the 'Heart and Soul' of the Indian Constitution, with archival proof from CAD Vol. VII."
    },
    {
      label: 'Reserve Bank & Rupee Thesis',
      text: 'डॉ. आंबेडकरांचे रिझर्व्ह बँक स्थापनेविषयी काय विचार होते? (Problem of the Rupee & 1936 Proof)'
    },
    {
      label: 'Mahad Satyagraha (1927)',
      text: 'महाड सत्याग्रहाबद्दल माहिती द्या (Mahad Chavdar Tale Satyagraha)'
    },
    {
      label: 'Out-of-Scope Test',
      text: 'Who won the 2026 Cricket IPL Tournament and cryptocurrency forecast?'
    }
  ];

  const performSearch = async (targetQuery: string, targetLang: SupportedLanguage) => {
    setIsSearching(true);
    const response = await executeDualTierRagSearch(targetQuery, targetLang, false, customRecords);
    setResult(response);
    setIsSearching(false);
  };

  useEffect(() => {
    performSearch(queryInput, language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (initialQuery && initialQuery !== queryInput) {
      setQueryInput(initialQuery);
      performSearch(initialQuery, language);
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
        const sample = sampleQueries[0].text;
        setQueryInput(sample);
        setIsListeningMic(false);
        performSearch(sample, language);
      }, 800);
    }
  };

  return (
    <div className="space-y-8">
      {/* Centered, Clean Primary Search Bar with Defined Borders & Spacing */}
      <section className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performSearch(queryInput, language);
          }}
          className="relative flex items-center gap-3"
        >
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-2xl" aria-hidden="true">
            search
          </span>
          <input
            type="search"
            aria-label="Search Dr. Ambedkar's writings and debates"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Search Dr. Ambedkar's writings, speeches, and debates..."
            className="w-full bg-[#faf9f6] border border-stone-300 rounded-xl pl-13 pr-32 py-3.5 sm:py-4 text-sm sm:text-base text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white transition-all shadow-inner/none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleVoiceMicInput}
              className={`p-2.5 rounded-lg transition-colors cursor-pointer border ${
                isListeningMic
                  ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] animate-pulse'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-stone-100 border-transparent'
              }`}
              title="Voice Search (Bhashini)"
              aria-label="Voice Search"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                mic
              </span>
            </button>
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2.5 bg-[#1B2A4A] hover:bg-[#142038] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer border border-[#1B2A4A]"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Clean Suggested Inquiry Chips with Breathing Room */}
        <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-4 border-t border-stone-200/80 text-xs">
          <span className="text-zinc-500 font-medium mr-1">Suggested topics:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQueryInput(q.text);
                performSearch(q.text, language);
              }}
              className="px-3.5 py-1.5 bg-stone-50 hover:bg-white text-zinc-700 border border-stone-300 rounded-full transition-all hover:border-[#1B2A4A]/50 hover:shadow-2xs cursor-pointer font-medium"
            >
              {q.label}
            </button>
          ))}
        </div>
      </section>

      {/* Out-of-Scope Negative Guardrail Result */}
      {result && !result.verified && (
        <div className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-amber-700 text-3xl shrink-0" aria-hidden="true">
              info
            </span>
            <div className="space-y-3">
              <h2 className="text-lg font-serif-archival font-bold text-zinc-900">
                Topic Not Documented in Archive
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                &ldquo;{result.guardrailMessage}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  const q = sampleQueries[0].text;
                  setQueryInput(q);
                  performSearch(q, language);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B2A4A] hover:underline cursor-pointer pt-2"
              >
                <span>Return to Article 32 Analysis</span>
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verified Split-Screen Provenance Result with Open Spacing */}
      {result && result.verified && result.primaryRecord && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Scholarly Synthesis & Primary Citation (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Result Title */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2A4A] block mb-1.5">
                  Archival Synthesis
                </span>
                <h2 className="text-xl font-serif-archival font-bold text-zinc-900 leading-snug">
                  {result.primaryRecord.title}
                </h2>
              </div>

              {/* Synthesis Text */}
              <div className="font-serif-archival text-sm sm:text-[14.5px] text-zinc-800 leading-relaxed space-y-4">
                <p className="leading-relaxed">{result.localizedAnswer}</p>
                <blockquote className="bg-[#F8FAFC] p-5 sm:p-6 rounded-2xl border-l-4 border-l-[#1B2A4A] border-y border-r border-stone-200 text-zinc-800 italic text-sm sm:text-[14px] leading-relaxed my-4 shadow-2xs">
                  {result.primaryRecord.verbatimQuote}
                </blockquote>
                {language !== 'en' && (
                  <p className="text-xs text-zinc-500 font-sans border-t border-stone-200 pt-3">
                    <strong className="text-zinc-700">English Translation:</strong> {result.englishAnswer}
                  </p>
                )}
              </div>

              {/* Source Citation */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-zinc-600">
                <span className="font-semibold text-[#1B2A4A]">
                  {result.primaryRecord.volume}, {result.primaryRecord.page}
                </span>
                <span className="font-medium">{result.primaryRecord.date}</span>
              </div>

              {/* Audio Listen Bar */}
              <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-300 flex flex-wrap items-center justify-between gap-4 mt-6 shadow-2xs">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      isSpeakingTts
                        ? stopSpeech()
                        : speakSynthesis(result.localizedAnswer || '', language)
                    }
                    className="w-9 h-9 rounded-full bg-[#1B2A4A] hover:bg-[#142038] text-white flex items-center justify-center cursor-pointer shadow-xs border border-[#1B2A4A]"
                    aria-label={isSpeakingTts ? 'Stop Narration' : 'Listen to Narration'}
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                      {isSpeakingTts ? 'stop' : 'volume_up'}
                    </span>
                  </button>
                  <span className="text-xs font-semibold text-zinc-800">
                    {isSpeakingTts ? 'Playing audio narration...' : 'Listen to narration'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(['mr', 'hi', 'en'] as SupportedLanguage[]).map((lk) => (
                    <button
                      key={lk}
                      type="button"
                      onClick={() => {
                        setLanguage(lk);
                        speakSynthesis(result.primaryRecord?.synthesis[lk] || '', lk);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer border ${
                        language === lk
                          ? 'bg-[#1B2A4A] text-white font-semibold border-[#1B2A4A]'
                          : 'bg-white text-zinc-600 border-stone-300 hover:bg-stone-100 hover:text-zinc-900'
                      }`}
                    >
                      {LANGUAGE_LABELS[lk].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Digitized Archival Folio (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Folio Toolbar with Clear Borders */}
            <div className="bg-white border border-stone-300 rounded-2xl px-5 py-3 shadow-xs flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-zinc-900">
                  {result.primaryRecord.manuscriptScan.headerTitle}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-zinc-500 font-mono-code font-medium">
                  {result.primaryRecord.manuscriptScan.archiveCode}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setZoomScale(Math.min(125, zoomScale + 10))}
                  className="p-1.5 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-stone-100 cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">zoom_in</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(Math.max(80, zoomScale - 10))}
                  className="p-1.5 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-stone-100 cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">zoom_out</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(100)}
                  className="p-1.5 text-zinc-600 hover:text-zinc-950 rounded-lg hover:bg-stone-100 cursor-pointer"
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">fit_screen</span>
                </button>
              </div>
            </div>

            {/* Archival Facsimile Canvas with High Breathing Room & Defined Border */}
            <div className="bg-white border border-stone-300 rounded-2xl p-7 sm:p-10 shadow-xs relative overflow-hidden min-h-[520px]">
              <div
                style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top left' }}
                className="transition-transform duration-200"
              >
                {/* Folio Header */}
                <div className="border-b border-stone-300 pb-4 mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif-archival text-sm tracking-wide text-zinc-900 uppercase font-bold">
                      {result.primaryRecord.collection}
                    </h3>
                    <p className="font-serif-archival text-xs text-zinc-500 mt-1">
                      {result.primaryRecord.manuscriptScan.subHeader}
                    </p>
                  </div>
                  <span className="font-mono-code text-xs font-semibold text-zinc-700 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                    {result.primaryRecord.page}
                  </span>
                </div>

                {/* 2-Column Proceedings Layout with Highlighted Passage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-800 font-serif-archival text-xs sm:text-[13.5px] leading-relaxed">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {result.primaryRecord.manuscriptScan.lines.slice(0, 3).map((line, i) => (
                      <p key={i} className="text-justify indent-4">
                        <strong className="text-zinc-900">[L{i + 1}]</strong> {line}
                      </p>
                    ))}
                    <p className="text-justify indent-4 text-zinc-500">
                      Primary proceedings verified in the official records of the Constituent Assembly and Dr. B. R. Ambedkar Writings and Speeches.
                    </p>
                  </div>

                  {/* Right Column: Verified Passage Box */}
                  <div className="space-y-4">
                    <div className="bg-[#F8FAFC] border-2 border-[#1B2A4A] p-5 rounded-2xl shadow-xs">
                      <div className="text-[10px] font-bold text-[#1B2A4A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1B2A4A]" />
                        Verified Archival Text
                      </div>
                      <p className="font-serif-archival text-xs sm:text-[13.5px] leading-relaxed font-bold text-zinc-900 italic">
                        {result.primaryRecord.verbatimQuote}
                      </p>
                    </div>

                    {result.primaryRecord.manuscriptScan.lines.slice(3).map((line, i) => (
                      <p key={i} className="text-justify indent-4">
                        <strong className="text-zinc-900">[L{i + 4}]</strong> {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
