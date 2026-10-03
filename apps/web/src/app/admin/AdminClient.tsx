"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  ShieldAlert,
  UploadCloud,
  FileCheck,
  Edit3,
  Server,
  Activity,
  HardDrive,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Lock,
  Layers,
  Sparkles,
  Save,
  Check
} from "lucide-react";

interface IngestItem {
  id: string;
  filename: string;
  fileSize: string;
  sha256: string;
  status: "completed" | "processing_ocr" | "generating_embeddings" | "pending";
  ocrConfidence: number;
  uploadedAt: string;
}

interface KioskNode {
  id: string;
  name: string;
  location: string;
  status: "online" | "idle" | "offline";
  currentScreen: string;
  lastPing: string;
  batteryPct: number;
}

const INITIAL_INGEST_QUEUE: IngestItem[] = [
  {
    id: "ing-101",
    filename: "BAWS_Vol_17_Part_3_Mahad_Minutes.pdf",
    fileSize: "14.2 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    status: "completed",
    ocrConfidence: 96.4,
    uploadedAt: "Today, 11:20 AM",
  },
  {
    id: "ing-102",
    filename: "Mooknayak_Issue_1_Editorial_Scan_1920.tif",
    fileSize: "28.6 MB",
    sha256: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    status: "completed",
    ocrConfidence: 82.1, // flagged for low confidence review
    uploadedAt: "Today, 10:45 AM",
  },
  {
    id: "ing-103",
    filename: "CAD_Vol_VII_Debates_Nov1948.pdf",
    fileSize: "18.1 MB",
    sha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
    status: "generating_embeddings",
    ocrConfidence: 98.2,
    uploadedAt: "Today, 12:05 PM",
  },
];

const INITIAL_KIOSKS: KioskNode[] = [
  {
    id: "kiosk-01",
    name: "Kiosk Central Hall",
    location: "Main Museum Rotunda",
    status: "online",
    currentScreen: "reader_item_001",
    lastPing: "Just now",
    batteryPct: 100,
  },
  {
    id: "kiosk-02",
    name: "Kiosk North Gallery",
    location: "Constitution Hall Wing",
    status: "online",
    currentScreen: "timeline_view",
    lastPing: "12s ago",
    batteryPct: 98,
  },
  {
    id: "kiosk-03",
    name: "Kiosk East Library",
    location: "Research & Archive Room",
    status: "idle",
    currentScreen: "attract_loop",
    lastPing: "25s ago",
    batteryPct: 100,
  },
  {
    id: "kiosk-04",
    name: "Kiosk Mobile Stand 04",
    location: "Outdoor Pavilion",
    status: "offline",
    currentScreen: "power_save",
    lastPing: "38m ago",
    batteryPct: 42,
  },
];

export default function AdminClient() {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<"ingest" | "ocr" | "metadata" | "preservation" | "kiosks">("ingest");
  const [ingestQueue, setIngestQueue] = useState<IngestItem[]>(INITIAL_INGEST_QUEUE);
  const [isUploading, setIsUploading] = useState(false);
  const [kiosks, setKiosks] = useState<KioskNode[]>(INITIAL_KIOSKS);

  // OCR Correction state
  const [correctedText, setCorrectedText] = useState(
    "बहिष्कृत भारत वृत्तपत्र हे डॉ. बाबासाहेब आंबेडकरांनी अस्पृश्य समाजाच्या सर्वांगीण उद्धारासाठी आणि त्यांच्या न्याय्य हक्कांच्या लढ्यासाठी ३ एप्रिल १९२७ रोजी सुरू केले."
  );
  const [isOcrSaved, setIsOcrSaved] = useState(false);

  // Metadata form state
  const [metaTitle, setMetaTitle] = useState("Bahishkrit Bharat Vol. 1 Inaugural Issue");
  const [metaCreator, setMetaCreator] = useState("Dr. B. R. Ambedkar");
  const [metaSubject, setMetaSubject] = useState("Untouchability, Civil Rights, Equality, Journalism");
  const [metaRights, setMetaRights] = useState("Public Domain / National Heritage");
  const [metaDate, setMetaDate] = useState("1927-04-03");
  const [isMetaSaved, setIsMetaSaved] = useState(false);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newItem: IngestItem = {
        id: `ing-${Date.now().toString().slice(-3)}`,
        filename: "Round_Table_Conference_Speech_1931.pdf",
        fileSize: "9.4 MB",
        sha256: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
        status: "processing_ocr",
        ocrConfidence: 94.8,
        uploadedAt: "Just now",
      };
      setIngestQueue((prev) => [newItem, ...prev]);
      setIsUploading(false);
    }, 1500);
  };

  const handleSaveOcr = () => {
    setIsOcrSaved(true);
    setTimeout(() => setIsOcrSaved(false), 2500);
  };

  const handleSaveMeta = () => {
    setIsMetaSaved(true);
    setTimeout(() => setIsMetaSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Console Header */}
      <div className="mb-6 border-b border-navy-900/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-navy-900 uppercase tracking-wider bg-gold-100 text-gold-900 px-3 py-1 rounded-full w-fit mb-2">
            <Lock className="w-3.5 h-3.5 text-gold-700" />
            <span>Archivist & Curatorial Operations Console</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900">
            Heritage Preservation & Ingestion Management
          </h1>
          <p className="text-sm text-navy-800/70 mt-1">
            Compliant with ISO 14721 (OAIS), Dublin Core 15, PREMIS 3.0 fixity, and Indic Tesseract OCR pipeline.
          </p>
        </div>

        {/* Global Preservation Status Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-white border border-green-300 rounded-lg p-3 shadow-sm flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
            <div>
              <div className="text-xs font-bold text-green-800 uppercase tracking-wide">Fixity Integrity: 100%</div>
              <div className="text-[11px] text-green-700 font-mono">30 / 30 Hashes Verified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Archivist Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-900/10 pb-3 mb-6">
        {[
          { id: "ingest", label: "1. Document Ingest & Queue", icon: UploadCloud },
          { id: "ocr", label: "2. OCR Confidence & Correction", icon: Edit3 },
          { id: "metadata", label: "3. Dublin Core / PREMIS Metadata", icon: FileCheck },
          { id: "preservation", label: "4. Preservation & Fixity Logs", icon: HardDrive },
          { id: "kiosks", label: "5. Kiosk Fleet Monitoring", icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-parchment-200 text-navy-800 hover:bg-parchment-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Document Ingest & Upload Pipeline */}
      {activeTab === "ingest" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Upload Area (5 cols) */}
            <div className="lg:col-span-5 bg-white border-2 border-dashed border-navy-900/20 rounded-xl p-8 text-center flex flex-col items-center justify-center shadow-sm">
              <UploadCloud className="w-12 h-12 text-navy-900/40 mb-3" />
              <h2 className="text-base font-serif font-bold text-navy-900">
                Upload Historical Scans or PDF Bundles
              </h2>
              <p className="text-xs text-navy-800/60 mt-1 max-w-sm">
                Supports TIFF (400+ DPI), PDF/A-1b preservation format, and JPEG2000. Computes SHA-256 before transmission.
              </p>

              <button
                onClick={handleSimulateUpload}
                disabled={isUploading}
                className="mt-6 px-6 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors shadow flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Ingest & SHA-256...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Select & Ingest Archival Item</span>
                  </>
                )}
              </button>
            </div>

            {/* Ingest Processing Queue (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-navy-900/10 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-navy-900/10 pb-3">
                <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                  Live Ingest Processing Pipeline
                </h2>
                <span className="text-xs font-mono text-navy-800/60">{ingestQueue.length} Batches</span>
              </div>

              <div className="space-y-3">
                {ingestQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg border border-navy-900/10 bg-parchment-100/60 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-bold text-navy-900">{item.filename}</div>
                      <div className="text-[11px] font-mono text-navy-800/60 mt-0.5">
                        {item.fileSize} • SHA256: {item.sha256.substring(0, 16)}...
                      </div>
                    </div>

                    <div className="text-right">
                      {item.status === "completed" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          Ingested ({item.ocrConfidence}%)
                        </span>
                      )}
                      {item.status === "processing_ocr" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded animate-pulse">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          OCR Processing...
                        </span>
                      )}
                      {item.status === "generating_embeddings" && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded animate-pulse">
                          <Layers className="w-3 h-3 animate-spin" />
                          pgvector Embeddings...
                        </span>
                      )}
                      <div className="text-[10px] text-navy-800/50 mt-1">{item.uploadedAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: OCR Confidence Heatmap & Human-in-the-loop Correction UI */}
      {activeTab === "ocr" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Facsimile Scan Preview (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-navy-900/10 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-navy-900/10 pb-3 mb-4">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Original Facsimile (Issue 1, Page 1)
              </span>
              <span className="text-[11px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                OCR Confidence: 82.1% (Flagged)
              </span>
            </div>

            <div className="aspect-[4/3] bg-parchment-100 border border-navy-900/15 rounded-lg p-6 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
              <div className="text-center font-serif text-navy-900 select-none opacity-85">
                <div className="text-xl font-bold border-b-2 border-navy-900 pb-2 mb-4 tracking-widest">
                  बहिष्कृत भारत
                </div>
                <div className="text-xs italic mb-4">
                  साप्ताहिक पत्र • संपादक: डॉ. भीमराव रामजी आंबेडकर
                </div>
                <div className="text-xs leading-relaxed max-w-md bg-yellow-100/70 p-2 rounded border border-yellow-300">
                  बहिष्कृत भारत वृत्तपत्र हे डॉ. बाबासाहेब आंबेडकरांनी अस्पृश्य समाजाच्या सर्वांगीण उद्धारासाठी आणि त्यांच्या न्याय्य हक्कांच्या लढ्यासाठी ३ एप्रिल १९२७ रोजी सुरू केले.
                </div>
              </div>
            </div>
            <p className="text-[11px] text-navy-800/60 mt-3">
              Words flagged below 85% confidence are highlighted with amber tint for manual verification.
            </p>
          </div>

          {/* Human-in-the-loop Correction Editor (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-navy-900/10 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-navy-900/10 pb-3 mb-4">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Archivist Correction Field
                </span>
                <span className="text-[11px] font-mono text-navy-800/60">Marathi (Devanagari)</span>
              </div>

              <label className="text-xs font-semibold text-navy-900 block mb-2">
                Editable Extracted Text:
              </label>
              <textarea
                value={correctedText}
                onChange={(e) => setCorrectedText(e.target.value)}
                rows={7}
                className="w-full p-3 rounded-lg border border-navy-900/20 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-navy-900 leading-relaxed bg-white"
              />

              <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-green-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>
                  Correcting text triggers immediate real-time re-indexing in PostgreSQL `tsvector` and regenerates contextual semantic chunks.
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-900/10 flex items-center justify-end gap-3">
              <button
                onClick={handleSaveOcr}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors shadow"
              >
                {isOcrSaved ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4 text-gold-400" />}
                <span>{isOcrSaved ? "Correction Approved & Saved" : "Approve & Re-Index Text"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dublin Core & PREMIS Metadata Editor */}
      {activeTab === "metadata" && (
        <div className="bg-white border border-navy-900/10 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-navy-900/10 pb-4 mb-6">
            <div>
              <h2 className="text-base font-serif font-bold text-navy-900">
                Dublin Core Metadata Elements (ISO 15836)
              </h2>
              <p className="text-xs text-navy-800/60">
                Archival metadata schema mapping to international bibliographic and museum records.
              </p>
            </div>
            <button
              onClick={handleSaveMeta}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition-colors"
            >
              {isMetaSaved ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4 text-gold-400" />}
              <span>{isMetaSaved ? "Metadata Saved" : "Save Dublin Core Record"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-navy-900 block mb-1">dc:title (Title)</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-navy-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy-900 block mb-1">dc:creator (Creator)</label>
              <input
                type="text"
                value={metaCreator}
                onChange={(e) => setMetaCreator(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-navy-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy-900 block mb-1">dc:subject (Subject Keywords)</label>
              <input
                type="text"
                value={metaSubject}
                onChange={(e) => setMetaSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-navy-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy-900 block mb-1">dc:date (Original Publication Date)</label>
              <input
                type="date"
                value={metaDate}
                onChange={(e) => setMetaDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-navy-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy-900 block mb-1">dc:rights (Rights Statement)</label>
              <input
                type="text"
                value={metaRights}
                onChange={(e) => setMetaRights(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-navy-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy-900 block mb-1">premis:objectIdentifier (SHA-256)</label>
              <input
                type="text"
                readOnly
                value="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                className="w-full px-3 py-2 text-xs rounded-lg border border-navy-900/20 bg-parchment-200 font-mono text-navy-800/70"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Digital Preservation & Fixity Logs */}
      {activeTab === "preservation" && (
        <div className="bg-white border border-navy-900/10 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-navy-900/10 pb-4">
            <div>
              <h2 className="text-base font-serif font-bold text-navy-900">
                PREMIS 3.0 Fixity Audit Log
              </h2>
              <p className="text-xs text-navy-800/60">
                Automated cryptographic checksum verification verifying bit-level storage integrity.
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-navy-900/20 text-xs font-semibold text-navy-900 hover:bg-parchment-200 transition-colors">
              Run Scheduled Checksum Scan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-parchment-200 text-navy-900 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Item ID</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Recorded SHA-256</th>
                  <th className="py-2.5 px-3">Last Verified</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-900/10 font-mono">
                <tr>
                  <td className="py-3 px-3 font-bold text-navy-900">item-baws-01-caste</td>
                  <td className="py-3 px-3 font-sans">Castes in India (1916)</td>
                  <td className="py-3 px-3 text-navy-800/60">d41d8cd98f00b204e9800998ecf8427e...</td>
                  <td className="py-3 px-3 font-sans">Today 04:00 AM</td>
                  <td className="py-3 px-3 font-sans text-green-700 font-bold">MATCH</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-navy-900">item-baws-01-aoc</td>
                  <td className="py-3 px-3 font-sans">Annihilation of Caste (1936)</td>
                  <td className="py-3 px-3 text-navy-800/60">9e107d9d372bb6826bd81d3542a419d6...</td>
                  <td className="py-3 px-3 font-sans">Today 04:00 AM</td>
                  <td className="py-3 px-3 font-sans text-green-700 font-bold">MATCH</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-navy-900">item-cad-final-speech</td>
                  <td className="py-3 px-3 font-sans">Grammar of Anarchy (Final CAD Speech 1949)</td>
                  <td className="py-3 px-3 text-navy-800/60">4b227777d4dd1fc61c6f884f48641d02...</td>
                  <td className="py-3 px-3 font-sans">Today 04:00 AM</td>
                  <td className="py-3 px-3 font-sans text-green-700 font-bold">MATCH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Kiosk Fleet Monitoring */}
      {activeTab === "kiosks" && (
        <div className="bg-white border border-navy-900/10 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-navy-900/10 pb-4">
            <div>
              <h2 className="text-base font-serif font-bold text-navy-900">
                Connected Kiosk Fleet Status
              </h2>
              <p className="text-xs text-navy-800/60">
                Real-time heartbeat ping, active viewport, battery telemetry, and remote session reset.
              </p>
            </div>
            <Link
              href="/kiosk"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
            >
              Open New Kiosk Surface ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kiosks.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-xl border border-navy-900/10 bg-parchment-100/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        k.status === "online"
                          ? "bg-green-500 animate-pulse"
                          : k.status === "idle"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-xs font-bold text-navy-900">{k.name}</span>
                  </div>
                  <span className="text-[11px] font-mono uppercase bg-parchment-200 px-2 py-0.5 rounded text-navy-800 font-bold">
                    {k.status}
                  </span>
                </div>

                <div className="text-xs text-navy-800/70 space-y-1 mb-3">
                  <div>Location: <span className="font-semibold text-navy-900">{k.location}</span></div>
                  <div>Active Screen: <span className="font-mono text-navy-900">{k.currentScreen}</span></div>
                  <div>Last Ping: <span className="text-navy-800/60">{k.lastPing}</span> • Battery: <span className="font-bold text-navy-900">{k.batteryPct}%</span></div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-navy-900/10">
                  <button
                    onClick={() => alert(`Remote reset signal dispatched to ${k.name}`)}
                    className="flex-1 py-1.5 px-2 rounded text-[11px] font-semibold bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                  >
                    Remote Reset
                  </button>
                  <Link
                    href="/kiosk"
                    className="flex-1 text-center py-1.5 px-2 rounded text-[11px] font-semibold border border-navy-900/20 text-navy-900 hover:bg-parchment-200 transition-colors"
                  >
                    Inspect Surface
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
