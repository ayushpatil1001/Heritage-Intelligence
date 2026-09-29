import React, { useState } from 'react';
import {
  BookOpen,
  Mic,
  ScrollText,
  FileText,
  Camera,
  Film,
  Search,
  ExternalLink,
  Volume2,
  Sparkles,
  CheckCircle2,
  Database
} from 'lucide-react';
import { ArchivalRecord, EDGE_NVME_CORPUS, LANGUAGE_LABELS, SupportedLanguage } from '../data/edgeCorpus';

interface HeritageVaultModuleProps {
  language: SupportedLanguage;
  customRecords: ArchivalRecord[];
  onInspectInRag: (query: string) => void;
}

export const HeritageVaultModule: React.FC<HeritageVaultModuleProps> = ({
  language,
  customRecords,
  onInspectInRag
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterText, setFilterText] = useState<string>('');
  const [activeModalRecord, setActiveModalRecord] = useState<ArchivalRecord | null>(null);

  const mergedMap = new Map<string, ArchivalRecord>();
  for (const r of [...EDGE_NVME_CORPUS, ...customRecords]) {
    mergedMap.set(r.id, r);
  }
  const allRecords = Array.from(mergedMap.values());

  const categories = [
    { id: 'all', label: 'All Heritage Records', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'books', label: 'Books (BAWS Vol. 1–22)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'debates', label: 'Constituent Assembly (CAD)', icon: <ScrollText className="w-4 h-4" /> },
    { id: 'speeches', label: 'Historic Speeches', icon: <Mic className="w-4 h-4" /> },
    { id: 'manuscripts', label: 'Rare Manuscripts', icon: <FileText className="w-4 h-4" /> },
    { id: 'photographs', label: 'Archival Photographs', icon: <Camera className="w-4 h-4" /> },
    { id: 'documentaries', label: 'Documentaries & Reels', icon: <Film className="w-4 h-4" /> }
  ];

  const filteredRecords = allRecords.filter((rec) => {
    const matchesCat = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesSearch =
      !filterText.trim() ||
      rec.title.toLowerCase().includes(filterText.toLowerCase()) ||
      rec.collection.toLowerCase().includes(filterText.toLowerCase()) ||
      rec.articleRef.toLowerCase().includes(filterText.toLowerCase()) ||
      rec.keywords.some((k) => k.toLowerCase().includes(filterText.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const speakRecord = (rec: ArchivalRecord) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const text = rec.synthesis[language] || rec.synthesis.en;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGUAGE_LABELS[language].ttsLang;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-5">
      {/* Header & Category Filter Strip */}
      <div className="stitch-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#1B2A4A]" />
              Primary Archival Repository
            </span>
            <h2 className="text-xl font-bold text-zinc-900 font-serif-archival mt-0.5">
              Collected Works (BAWS Vol. 1–22), Speeches, Debates &amp; Manuscripts
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter archive by title, volume, article..."
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#faf9f6] border border-stone-300 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#1B2A4A] focus:bg-white"
            />
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-2xs'
                    : 'bg-[#faf9f6] text-zinc-600 border-stone-200 hover:bg-stone-100 hover:text-[#1B2A4A]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Archival Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            className="stitch-card rounded-2xl hover:border-[#1B2A4A]/40 transition-all p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono-code uppercase font-semibold bg-[#1B2A4A]/8 text-[#1B2A4A]">
                  {rec.category}
                </span>
                <span className="text-xs font-mono-code font-medium text-zinc-500">{rec.date}</span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 font-serif-archival leading-snug">
                {rec.title}
              </h3>

              <div className="text-xs text-zinc-500 space-y-1 font-mono-code">
                <div>{rec.volume}</div>
                <div>{rec.page}</div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                {rec.synthesis[language] || rec.synthesis.en}
              </p>

              <blockquote className="p-3 rounded-lg bg-[#F8FAFC] border-l-2 border-l-[#1B2A4A] text-xs italic text-zinc-700 line-clamp-2 font-serif-archival">
                {rec.verbatimQuote}
              </blockquote>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalRecord(rec)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#faf9f6] hover:bg-stone-100 text-zinc-800 border border-stone-200 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#1B2A4A]" />
                <span>Inspect Folio</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => speakRecord(rec)}
                  className="p-1.5 rounded-lg bg-[#faf9f6] hover:bg-stone-100 text-[#1B2A4A] border border-stone-200 cursor-pointer"
                  title="Listen to narration"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onInspectInRag(rec.title)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1B2A4A] hover:bg-[#152238] text-white cursor-pointer"
                >
                  <span>Open in Provenance</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Archival Folio Modal */}
      {activeModalRecord && (
        <div className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-3xl w-full rounded-2xl border border-stone-300 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs font-mono-code font-semibold text-zinc-500 uppercase">
                  {activeModalRecord.collection}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 font-serif-archival mt-0.5">
                  {activeModalRecord.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalRecord(null)}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-zinc-800 text-xs font-mono-code font-semibold border border-stone-200 cursor-pointer"
              >
                ESC / Close
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#faf9f6] text-zinc-900 font-serif-archival space-y-2 border border-stone-200">
              <div className="flex justify-between text-xs font-mono-code font-semibold text-zinc-500 border-b border-stone-200 pb-1">
                <span>{activeModalRecord.manuscriptScan.headerTitle}</span>
                <span>{activeModalRecord.manuscriptScan.archiveCode}</span>
              </div>
              {activeModalRecord.manuscriptScan.lines.map((l, i) => (
                <p
                  key={i}
                  className={`text-xs sm:text-sm px-2.5 py-1.5 rounded ${
                    activeModalRecord.manuscriptScan.boundingBox.highlightLines.includes(i)
                      ? 'bg-stone-200/80 font-semibold border-l-2 border-l-zinc-900'
                      : ''
                  }`}
                >
                  {l}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono-code font-semibold uppercase text-zinc-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-800" />
                Multilingual Summary ({LANGUAGE_LABELS[language].native})
              </h4>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {activeModalRecord.synthesis[language] || activeModalRecord.synthesis.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
