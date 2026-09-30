import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { ArchivalRecord } from '../data/edgeCorpus';
import { insertRecordToSupabase } from '../lib/supabaseClient';

interface CuratorAdminModuleProps {
  customRecords: ArchivalRecord[];
  onAddCustomRecord: (rec: ArchivalRecord) => void;
  onTestIngestedInRag: (query: string) => void;
}

export const CuratorAdminModule: React.FC<CuratorAdminModuleProps> = ({
  customRecords,
  onAddCustomRecord,
  onTestIngestedInRag
}) => {
  const [title, setTitle] = useState<string>(
    'States and Minorities (1947) — Fundamental Rights & Economic Socialism Memorandum'
  );
  const [category, setCategory] = useState<ArchivalRecord['category']>('manuscripts');
  const [volume, setVolume] = useState<string>('BAWS Vol. 1, Part II');
  const [page, setPage] = useState<string>('pp. 391–412 (Article II, Section II)');
  const [keywords, setKeywords] = useState<string>(
    'states and minorities, state socialism, key industries, insurance, agriculture'
  );
  const [verbatimQuote, setVerbatimQuote] = useState<string>(
    'The main purpose behind the clause is to put an obligation on the State to plan the economic life of the people on lines which would lead to highest point of productivity without closing every avenue to private enterprise.'
  );
  const [synthesisEn, setSynthesisEn] = useState<string>(
    'Submitted to the Sub-Committee on Fundamental Rights of the Constituent Assembly in March 1947, Dr. B. R. Ambedkar proposed embedding economic democracy alongside civil rights, including nationalized insurance.'
  );
  const [ingestSuccess, setIngestSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const bomTable = [
    {
      component: 'Embedded Compute Core',
      spec: 'Raspberry Pi 5 (8GB RAM) with active cooler + 128GB High-Endurance NVMe SSD',
      cost: '₹9,200'
    },
    {
      component: 'Interactive Touch Panel',
      spec: '21.5-inch 1080p Projected Capacitive (PCAP) 10-point Touch Display (Anti-glare)',
      cost: '₹14,500'
    },
    {
      component: 'Directional Audio Dome',
      spec: 'Localized ultrasonic transducer dome speaker (Prevents gallery echo)',
      cost: '₹6,800'
    },
    {
      component: 'Proximity & Accessibility Sensor',
      spec: 'Ultrasonic proximity sensor (Auto-wake) + Tactile Braille query button',
      cost: '₹1,800'
    },
    {
      component: 'Kiosk Enclosure & Power',
      spec: 'Tamper-resistant powder-coated sheet metal kiosk housing + Internal UPS backup',
      cost: '₹6,200'
    }
  ];

  const handleIngestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const kwList = keywords
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const newRecord: ArchivalRecord = {
      id: `curator-doc-${Date.now()}`,
      title,
      category,
      collection: 'Authenticated Archival Collection',
      date: 'March 1947',
      volume,
      page,
      articleRef: 'Fundamental Rights Sub-Committee',
      keywords: [...kwList, ...title.toLowerCase().split(/\s+/)],
      manuscriptScan: {
        headerTitle: 'CURATORIAL ARCHIVAL INGESTION FOLIO',
        subHeader: `${volume.toUpperCase()} — AUTHENTICATED SCAN`,
        pageNumber: page,
        archiveCode: `ARCHIVE-${customRecords.length + 101}`,
        lines: [
          `1. Record: ${title}`,
          `2. Citation: ${volume}, ${page}`,
          `3. Excerpt: "${verbatimQuote}"`,
          `4. Synthesis: ${synthesisEn}`
        ],
        boundingBox: {
          x: 5,
          y: 25,
          width: 90,
          height: 48,
          highlightLines: [1, 2],
          caption: `${volume}, ${page}`
        }
      },
      verbatimQuote: `"${verbatimQuote}"`,
      synthesis: {
        en: synthesisEn,
        mr: synthesisEn,
        hi: synthesisEn,
        ta: synthesisEn,
        te: synthesisEn
      }
    };

    onAddCustomRecord(newRecord);
    try {
      await insertRecordToSupabase(newRecord);
    } catch {
      // Offline fallback
    }
    setIsSaving(false);
    setIngestSuccess(title);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Curatorial Ingestion Form (Col 7) */}
        <form
          onSubmit={handleIngestSubmit}
          className="lg:col-span-7 bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5"
        >
          <div className="flex items-center gap-2.5 border-b border-stone-200 pb-4">
            <Database className="w-4 h-4 text-[#1B2A4A]" />
            <h2 className="text-lg font-serif-archival font-bold text-zinc-900">
              Add Archival Document to Archive
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-700 font-semibold mb-1.5">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-700 font-semibold mb-1.5">Volume Citation</label>
                <input
                  type="text"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1.5">Page &amp; Section</label>
                <input
                  type="text"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-700 font-semibold mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArchivalRecord['category'])}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
                >
                  <option value="manuscripts">Manuscripts</option>
                  <option value="books">Books (BAWS)</option>
                  <option value="debates">Constituent Debates</option>
                  <option value="speeches">Speeches</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1.5">Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-700 font-semibold mb-1.5">Primary Archival Excerpt</label>
              <textarea
                rows={3}
                value={verbatimQuote}
                onChange={(e) => setVerbatimQuote(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
              />
            </div>

            <div>
              <label className="block text-zinc-700 font-semibold mb-1.5">English Scholarly Synthesis</label>
              <textarea
                rows={2}
                value={synthesisEn}
                onChange={(e) => setSynthesisEn(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-zinc-900 focus:outline-none focus:border-[#1B2A4A] focus:bg-white text-xs sm:text-sm transition-all shadow-inner/none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-3 border-t border-stone-100">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1B2A4A] hover:bg-[#142038] text-white cursor-pointer shadow-xs border border-[#1B2A4A] transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Indexing...' : 'Index Document'}</span>
            </button>

            {ingestSuccess && (
              <button
                type="button"
                onClick={() => onTestIngestedInRag(ingestSuccess)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 cursor-pointer shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Document Indexed — Click to Search</span>
              </button>
            )}
          </div>
        </form>

        {/* Turnkey Kiosk Hardware Specifications Table (Col 5) */}
        <div className="lg:col-span-5 bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#1B2A4A]" />
              <h2 className="text-lg font-serif-archival font-bold text-zinc-900">
                Kiosk Appliance Specifications
              </h2>
            </div>
            <span className="text-xs font-bold text-[#1B2A4A] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#1B2A4A]/20">
              ₹38,500 / Unit
            </span>
          </div>

          <div className="space-y-3.5">
            {bomTable.map((item, idx) => (
              <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-stone-50/70 border border-stone-300 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{item.component}</span>
                  <span className="font-semibold text-[#1B2A4A]">{item.cost}</span>
                </div>
                <p className="text-zinc-500 leading-relaxed">{item.spec}</p>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-[#F8FAFC] border-2 border-[#1B2A4A]/25 flex items-center justify-between text-xs shadow-2xs">
              <span className="font-bold text-zinc-900">Total Turnkey Production Cost</span>
              <span className="font-bold text-[#1B2A4A] text-sm">₹38,500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
