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
  Volume2
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
    { id: 'all', label: 'All Records', icon: null },
    { id: 'books', label: 'Books (BAWS)', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'debates', label: 'CAD Debates', icon: <ScrollText className="w-3.5 h-3.5" /> },
    { id: 'speeches', label: 'Speeches', icon: <Mic className="w-3.5 h-3.5" /> },
    { id: 'manuscripts', label: 'Manuscripts', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'photographs', label: 'Photographs', icon: <Camera className="w-3.5 h-3.5" /> },
    { id: 'documentaries', label: 'Documentaries', icon: <Film className="w-3.5 h-3.5" /> }
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
    <div className="space-y-8">
      {/* Category Filter and Search Toolbar */}
      <div className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-xs'
                      : 'bg-stone-50 text-zinc-700 border-stone-300 hover:bg-white hover:text-zinc-900 hover:border-stone-400'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter by title, volume..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#1B2A4A] focus:bg-white transition-all shadow-inner/none"
            />
          </div>
        </div>
      </div>

      {/* Archival Cards Grid with Spacious Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-white border border-stone-300 hover:border-stone-400 transition-all p-6 sm:p-7 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#1B2A4A]/10 text-[#1B2A4A] uppercase tracking-wide">
                  {rec.category}
                </span>
                <span className="text-zinc-500 font-medium">{rec.date}</span>
              </div>

              <h2 className="text-lg font-bold text-zinc-900 font-serif-archival leading-snug">
                {rec.title}
              </h2>

              <div className="text-xs font-semibold text-zinc-500">
                {rec.volume} • {rec.page}
              </div>

              <p className="text-xs sm:text-[13px] text-zinc-600 line-clamp-3 leading-relaxed">
                {rec.synthesis[language] || rec.synthesis.en}
              </p>

              <blockquote className="p-4 rounded-xl bg-[#F8FAFC] border-l-4 border-l-[#1B2A4A] border-y border-r border-stone-200 text-xs sm:text-[13px] italic text-zinc-800 line-clamp-2 font-serif-archival leading-relaxed my-2 shadow-2xs">
                {rec.verbatimQuote}
              </blockquote>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-200 flex items-center justify-between gap-2.5">
              <button
                onClick={() => setActiveModalRecord(rec)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-50 hover:bg-stone-100 text-zinc-700 border border-stone-300 cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-600" />
                <span>Read Folio</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakRecord(rec)}
                  className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-zinc-700 border border-stone-300 cursor-pointer transition-colors"
                  title="Listen"
                  aria-label="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onInspectInRag(rec.title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#1B2A4A] hover:bg-[#142038] text-white cursor-pointer shadow-xs border border-[#1B2A4A] transition-colors"
                >
                  <span>Search in AI</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Archival Folio Modal with Defined Borders */}
      {activeModalRecord && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-2xl w-full rounded-2xl border border-stone-300 bg-white p-7 sm:p-8 shadow-xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider">
                  {activeModalRecord.collection}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 font-serif-archival mt-1 leading-snug">
                  {activeModalRecord.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalRecord(null)}
                className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-zinc-700 text-xs font-semibold border border-stone-300 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 text-zinc-800 font-serif-archival space-y-3 border border-stone-300 text-xs sm:text-sm">
              <div className="flex justify-between text-xs text-zinc-500 border-b border-stone-200 pb-2">
                <span className="font-semibold text-zinc-800">{activeModalRecord.manuscriptScan.headerTitle}</span>
                <span className="font-mono-code">{activeModalRecord.manuscriptScan.archiveCode}</span>
              </div>
              {activeModalRecord.manuscriptScan.lines.map((l, i) => (
                <p
                  key={i}
                  className={`p-2 rounded-lg leading-relaxed ${
                    activeModalRecord.manuscriptScan.boundingBox.highlightLines.includes(i)
                      ? 'bg-[#F8FAFC] font-semibold border-l-4 border-l-[#1B2A4A] border-y border-r border-stone-200 shadow-2xs'
                      : ''
                  }`}
                >
                  {l}
                </p>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Summary ({LANGUAGE_LABELS[language].native})
              </h4>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {activeModalRecord.synthesis[language] || activeModalRecord.synthesis.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
