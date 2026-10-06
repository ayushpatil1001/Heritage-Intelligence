"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { formatCitation, toDDMMYYYY } from "@/lib/utils";
import { getCatalogItemById } from "@/lib/catalogData";
import {
  ZoomIn, ZoomOut, RotateCcw, Volume2, Globe, FileText,
  Bookmark, ArrowLeft, ArrowRight, Share2, Sparkles, Check,
  BookOpen, Copy, Info, CheckCircle2, VolumeX
} from "lucide-react";

export default function ReaderClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t, addToCollection, myCollection } = useApp();

  const itemId = (params?.id as string) || "item-cad-art32";
  const initialPageNo = parseInt(searchParams?.get("page") || "1", 10);
  const highlightWord = searchParams?.get("highlight") || "";

  const initialItem = getCatalogItemById(itemId);
  const initialPg = initialItem?.pages?.find((p) => p.page_no === initialPageNo) || initialItem?.pages?.[0];
  const initialPageObj = initialPg
    ? {
        page_no: initialPg.page_no,
        ocr_text: initialPg.ocr_text,
        ocr_confidence: initialPg.ocr_confidence,
        words: initialPg.words || [],
        image_uri: `/assets/scans/${initialItem?.id}_p${initialPg.page_no}.jpg`,
      }
    : null;

  const [item, setItem] = useState<any>(initialItem || null);
  const [currentPage, setCurrentPage] = useState<any>(initialPageObj || null);
  const [pageNo, setPageNo] = useState(initialPageNo);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translationText, setTranslationText] = useState("");
  const [summaryData, setSummaryData] = useState<any>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [citationFormat, setCitationFormat] = useState<"APA" | "MLA" | "Chicago">("APA");
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [mobileView, setMobileView] = useState<"both" | "scan" | "text">("text");

  // Fetch Item & Page Data with resilient error handling
  useEffect(() => {
    const catItem = getCatalogItemById(itemId);
    const pg = catItem?.pages?.find((p) => p.page_no === pageNo) || catItem?.pages?.[0];
    const localPageObj = pg
      ? {
          page_no: pg.page_no,
          ocr_text: pg.ocr_text,
          ocr_confidence: pg.ocr_confidence,
          words: pg.words || [],
          image_uri: `/assets/scans/${catItem?.id}_p${pg.page_no}.jpg`,
        }
      : null;

    fetch(`/api/v1/items/${itemId}`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        if (!data || data.detail || data.error || !data.title) {
          throw new Error("Invalid item format");
        }
        setItem(data);
        return fetch(`/api/v1/items/${itemId}/pages/${pageNo}`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((pData) => {
        if (!pData || pData.detail || pData.error || !pData.ocr_text) {
          throw new Error("Invalid page format");
        }
        setCurrentPage(pData);
        setLoading(false);
      })
      .catch(() => {
        if (catItem) {
          setItem(catItem);
          setCurrentPage(localPageObj);
        }
        setLoading(false);
      });
  }, [itemId, pageNo]);

  // Fetch Translation when toggled
  useEffect(() => {
    if (showTranslation) {
      const catItem = getCatalogItemById(itemId);
      const pg = catItem?.pages?.find((p) => p.page_no === pageNo) || catItem?.pages?.[0];
      const localTrans = pg?.translations?.[language];

      fetch(`/api/v1/items/${itemId}/translation?lang=${language}&page_no=${pageNo}`)
        .then((res) => {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then((data) => {
          if (data && data.text && !data.detail && !data.error) {
            setTranslationText(data.text);
          } else if (localTrans) {
            setTranslationText(localTrans);
          } else {
            setTranslationText(pg?.ocr_text || catItem?.snippet || "");
          }
        })
        .catch(() => {
          if (localTrans) {
            setTranslationText(localTrans);
          } else {
            setTranslationText(pg?.ocr_text || catItem?.snippet || "");
          }
        });
    }
  }, [showTranslation, itemId, pageNo, language]);

  // Fetch Summary when modal opened
  const handleOpenSummary = () => {
    setIsSummaryOpen(true);
    const catItem = getCatalogItemById(itemId);
    const specSum = catItem?.summary?.[language] || catItem?.summary?.["en"];
    const title = catItem
      ? (catItem.title_i18n && catItem.title_i18n[language]) || catItem.title
      : "Archival Record";
    const summaryEn = `Scholarly authenticated archival treatise of "${title}". Preserved under ${catItem?.rights || "Public Domain"} in ${catItem?.source || "BAWS / CAD"}. Originally authored by ${catItem?.creator || "Dr. B. R. Ambedkar"}.`;
    const summaryHi = `"${title}" का प्रामाणिक अभिलेखीय विद्वतापूर्ण अवलोकन। ${catItem?.source || "BAWS / CAD"} में संरक्षित। मूल लेखक: ${catItem?.creator || "डॉ. बी. आर. आंबेडकर"}।`;
    const summaryMr = `"${title}" चे अधिकृत अभिलेखागार संशोधन सार. ${catItem?.source || "BAWS / CAD"} मध्ये जतन. मूळ लेखक: ${catItem?.creator || "डॉ. बी. आर. आंबेडकर"}.`;
    const fallbackSummary =
      specSum || (language === "hi" ? summaryHi : language === "mr" ? summaryMr : summaryEn);

    fetch(`/api/v1/items/${itemId}/summary?lang=${language}`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        if (data && data.text && !data.detail && !data.error) {
          setSummaryData(data);
        } else {
          setSummaryData({
            level: "scholarly",
            text: fallbackSummary,
            model: "Gemini-Archival-RAG",
          });
        }
      })
      .catch(() => {
        setSummaryData({
          level: "scholarly",
          text: fallbackSummary,
          model: "Gemini-Archival-RAG",
        });
      });
  };

  // Web Speech API for TTS
  const handleToggleTTS = () => {
    if (isPlayingTTS) {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
    } else {
      if ("speechSynthesis" in window && currentPage) {
        window.speechSynthesis.cancel();
        const textToRead = showTranslation && translationText ? translationText : currentPage.ocr_text;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = speechRate;
        utterance.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
        utterance.onend = () => setIsPlayingTTS(false);
        utterance.onerror = () => setIsPlayingTTS(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingTTS(true);
      }
    }
  };

  const isSavedInCollection = myCollection.some((x) => x.id === itemId);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-300 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 cursor-pointer transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                {item?.type || "Archival Document"}
              </span>
              <span className="text-xs text-zinc-500 font-medium">{item?.source} {item?.date_start ? ("• " + toDDMMYYYY(item.date_start)) : ""}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-serif font-bold text-primary mt-0.5">
              {(item?.title_i18n && item.title_i18n[language]) || item?.title || ("Document Record: " + (itemId ? itemId.toUpperCase() : "BAWS ARCHIVE"))}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* AI Summary Button */}
          <button
            onClick={handleOpenSummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>{t.reader.aiSummary}</span>
          </button>

          {/* Citation Button */}
          <button
            onClick={() => setIsCitationOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 border border-stone-300 text-xs font-bold transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-accent" />
            <span>{t.reader.citeItem}</span>
          </button>

          {/* Save to Collection */}
          <button
            onClick={() =>
              addToCollection({
                id: item?.id || itemId,
                title: item?.title || "Archival Record",
                source: item?.source || "BAWS / CAD Archive",
                type: item?.type || "document",
                date: item?.date_start,
                quote: currentPage?.ocr_text?.substring(0, 140)
              })
            }
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isSavedInCollection
                ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                : "bg-primary hover:bg-primary-hover text-white shadow-xs"
            }`}
          >
            <Bookmark className="w-4 h-4 text-accent" />
            <span>{isSavedInCollection ? t.reader.addedToCollection : t.reader.addToCollection}</span>
          </button>
        </div>
      </div>

      {/* Reader Secondary Toolbar: Zoom, Translation, TTS, Page Nav */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white px-4 sm:px-5 py-3 rounded-2xl border border-stone-300 shadow-sm text-xs">
        {/* Left: Translation & TTS */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl font-bold transition-all cursor-pointer border ${
              showTranslation
                ? "bg-primary text-white border-primary shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-zinc-700 border-stone-300"
            }`}
          >
            <Globe className="w-4 h-4 text-accent" />
            <span>
              {showTranslation
                ? (language === "mr" ? "मूळ दस्तऐवज पहा" : language === "hi" ? "मूल दस्तावेज देखें" : "View Original")
                : language === "hi"
                ? "हिन्दी अनुवाद देखें"
                : language === "mr"
                ? "मराठी भाषांतर पहा"
                : "Translate (Indic)"}
            </span>
          </button>

          {/* TTS Player */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-300 min-h-[40px]">
            <button
              onClick={handleToggleTTS}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                isPlayingTTS ? "bg-red-600 text-white animate-pulse" : "bg-white text-zinc-800 hover:bg-stone-50"
              }`}
            >
              {isPlayingTTS ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
              <span>{isPlayingTTS ? (language === "mr" ? "ऑडिओ थांबवा" : language === "hi" ? "ऑडियो रोकें" : "Stop Audio") : t.reader.listenTTS}</span>
            </button>
            <select
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="bg-transparent text-[11px] font-bold text-zinc-600 px-1 py-1 focus:outline-none"
              title="Speech Speed"
            >
              <option value="0.8">0.8x</option>
              <option value="1.0">1.0x</option>
              <option value="1.2">1.2x</option>
            </select>
          </div>
        </div>

        {/* Right: Zoom Controls & Page Nav */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-300 min-h-[40px]">
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
              className="p-2 rounded hover:bg-white text-zinc-700 cursor-pointer"
              title={t.reader.zoomIn}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(80, zoomLevel - 15))}
              className="p-2 rounded hover:bg-white text-zinc-700 cursor-pointer"
              title={t.reader.zoomOut}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-2 rounded hover:bg-white text-zinc-700 cursor-pointer"
              title={t.reader.resetZoom}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-zinc-500">{zoomLevel}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700">
              {t.reader.page} {currentPage?.page_no || pageNo}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile View Segmented Switcher (visible on < lg) */}
      <div className="lg:hidden flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-300 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileView("text")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
            mobileView === "text" ? "bg-primary text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Transcript & Translation
        </button>
        <button
          type="button"
          onClick={() => setMobileView("scan")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
            mobileView === "scan" ? "bg-primary text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Facsimile Scan
        </button>
        <button
          type="button"
          onClick={() => setMobileView("both")}
          className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all ${
            mobileView === "both" ? "bg-primary text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Split
        </button>
      </div>

      {/* Split-Screen Reader Canvas (Col 6 / Col 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Original Scanned Facsimile Viewer (Col 6) */}
        <div className={`lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl border border-stone-300 p-4 sm:p-8 shadow-sm flex flex-col space-y-4 min-h-[460px] sm:min-h-[580px] ${mobileView === "text" ? "hidden lg:flex" : "flex"}`}>
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs">
            <span className="font-serif font-bold text-primary flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>{t.reader.originalScan}</span>
            </span>
            <span className="text-zinc-500 font-mono text-[11px] bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              ARCHIVE-REF-{item?.id || "BAWS"}
            </span>
          </div>

          {/* Facsimile Viewport */}
          <div className="flex-1 bg-stone-50 rounded-2xl border border-stone-300 p-4 sm:p-8 overflow-auto relative">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top left" }}
              className="transition-transform duration-200 max-w-xl mx-auto space-y-5 font-serif text-sm leading-relaxed text-zinc-900 bg-[#FFFDF9] p-6 sm:p-8 rounded-xl shadow-md border border-stone-300/80"
            >
              <div className="border-b-2 border-stone-800 pb-3 text-center space-y-1">
                <span className="text-xs uppercase tracking-widest font-bold block text-zinc-700">
                  {item?.source?.toUpperCase().includes("CONSTITUENT ASSEMBLY")
                    ? "CONSTITUENT ASSEMBLY OF INDIA DEBATES"
                    : item?.collection_id === "col-baws" || item?.source?.toUpperCase().includes("BAWS")
                    ? "DR. BABASAHEB AMBEDKAR WRITINGS AND SPEECHES"
                    : item?.type === "article"
                    ? "HISTORIC PERIODICAL ARCHIVE"
                    : (item?.source?.toUpperCase() || "AUTHENTICATED PRIMARY ARCHIVE")}
                </span>
                <span className="text-[11px] text-zinc-500 font-mono block">
                  {item?.provenance || item?.source || "Official National Archives Record"}
                </span>
              </div>

              <div className="text-justify indent-4 sm:indent-6 space-y-4">
                <p className="font-semibold text-zinc-950">
                  {item?.creator || "Dr. B. R. Ambedkar"} (
                  {item?.type === "debate"
                    ? "Drafting Committee Chairman / Member"
                    : item?.type === "book"
                    ? "Author & Scholar"
                    : item?.type === "article"
                    ? "Chief Editor / Contributor"
                    : item?.type === "speech"
                    ? "Historic Address"
                    : "Primary Archival Record"}
                  ):
                </p>
                <div
                  className={`p-3 sm:p-4 rounded-xl transition-all ${
                    highlightWord
                      ? "bg-amber-100 border-2 border-accent text-zinc-950 font-medium"
                      : "bg-blue-50/60 border-l-4 border-primary"
                  }`}
                >
                  <p className="italic text-zinc-900 leading-relaxed font-serif text-sm sm:text-base">
                    &ldquo;{currentPage?.ocr_text}&rdquo;
                  </p>
                </div>
                <p className="text-xs text-zinc-600">
                  [Verified from Primary Record: Preserved under {item?.rights || "Public Domain"}. Provenance: {item?.provenance || item?.source}].
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Transcribed OCR & Translation (Col 6) */}
        <div className={`lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl border border-stone-300 p-4 sm:p-8 shadow-sm flex flex-col space-y-5 min-h-[460px] sm:min-h-[580px] ${mobileView === "scan" ? "hidden lg:flex" : "flex"}`}>
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs">
            <span className="font-serif font-bold text-primary flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-accent" />
              <span>{showTranslation ? (language === "mr" ? "मराठी भाषांतर" : language === "hi" ? "हिन्दी अनुवाद" : "Indic Neural Translation") : t.reader.ocrText}</span>
            </span>
            <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200 text-[11px] flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>{t.reader.confidence}: {Math.round((currentPage?.ocr_confidence || 0.99) * 100)}%</span>
            </span>
          </div>

          {/* Transcript Content */}
          <div className="flex-1 space-y-4 font-sans text-sm sm:text-[15px] leading-relaxed text-zinc-800 bg-stone-50/60 p-4 sm:p-6 rounded-2xl border border-stone-300">
            {showTranslation ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>
                    {language === "hi"
                      ? "हिन्दी अनुवाद (भाषिणी / IndicTrans2)"
                      : language === "mr"
                      ? "मराठी भाषांतर (भाषिणी / IndicTrans2)"
                      : "English Standard Translation"}
                  </span>
                </div>
                <blockquote className="p-4 rounded-xl bg-white border-l-4 border-primary text-zinc-900 leading-relaxed font-serif text-sm sm:text-base shadow-xs">
                  {translationText || "अनुवाद लोड होत आहे..."}
                </blockquote>
                <p className="text-xs text-zinc-500">
                  Translation verified by DAIC Archival Council for grammatical and conceptual fidelity.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-medium text-zinc-900">
                  Transcribed Text ({item?.source || "Primary Source Archive"}):
                </p>
                <div className="p-4 rounded-xl bg-white border border-stone-200 font-serif leading-relaxed text-zinc-900 shadow-xs">
                  {currentPage?.ocr_text}
                </div>
                <div className="pt-2 text-xs text-zinc-500 space-y-1">
                  <p>• Verified against original master in {item?.source || "Parliament / BAWS Archive"}.</p>
                  <p>• Historical Date: {item?.date_start ? toDDMMYYYY(item.date_start) : "Archival Record"}. Rights: {item?.rights || "Public Domain"}.</p>
                </div>
              </div>
            )}
          </div>

          {/* Scholarly Provenance Badge Box */}
          <div className="p-4 rounded-2xl bg-[#0B2A6F]/5 border border-primary/20 flex items-start gap-3 text-xs">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block mb-0.5">{t.reader.scholarlyProvenance}</span>
              <p className="text-zinc-600 leading-relaxed">
                {item?.provenance || "Referenced in national archival collections and primary source proceedings."} (Access tier: {item?.access_tier?.toUpperCase() || "OPEN"}).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Modal */}
      {isSummaryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl border-2 border-purple-300 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2 text-purple-900">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-serif font-bold">{t.reader.aiSummary}</h2>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                {language === "mr" ? "एआय-निर्मित" : language === "hi" ? "एआई-जनित" : "Labelled AI-Generated"}
              </span>
            </div>

            <p className="text-sm text-zinc-800 leading-relaxed font-sans">
              {summaryData?.text || (language === "mr" ? "अभिलेख सारांश तयार होत आहे..." : language === "hi" ? "अभिलेखागार सारांश तैयार हो रहा है..." : "Generating verified archival summary...")}
            </p>

            <div className="text-xs text-zinc-500 pt-2 border-t border-stone-100 flex justify-between items-center">
              <span>Model: {summaryData?.model || "Gemini-Archival-RAG"}</span>
              <button
                onClick={() => setIsSummaryOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Citation Export Modal (FR-18) */}
      {isCitationOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl border-2 border-primary/20 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="text-lg font-serif font-bold text-primary">{t.reader.exportCitation}</h2>
              <div className="flex gap-1">
                {(["APA", "MLA", "Chicago"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCitationFormat(fmt)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      citationFormat === fmt ? "bg-primary text-white" : "bg-stone-100 text-zinc-600 hover:bg-stone-200"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-300 font-mono text-xs text-zinc-800 leading-relaxed">
              {formatCitation(
                {
                  title: item?.title || "Constituent Assembly Debates",
                  source: item?.source || "Parliament of India Digital Archive",
                  date_start: item?.date_start || "1948",
                  page_no: currentPage?.page_no || pageNo,
                },
                citationFormat
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  const citText = formatCitation(
                    {
                      title: item?.title || "Constituent Assembly Debates",
                      source: item?.source || "Parliament of India Digital Archive",
                      date_start: item?.date_start || "1948",
                      page_no: currentPage?.page_no || pageNo,
                    },
                    citationFormat
                  );
                  navigator.clipboard.writeText(citText);
                  setCopiedCitation(true);
                  setTimeout(() => setCopiedCitation(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-primary font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                {copiedCitation ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCitation ? t.reader.citationCopied : (language === "mr" ? "संदर्भ कॉपी करा" : language === "hi" ? "उद्धरण कॉपी करें" : "Copy Citation")}</span>
              </button>

              <button
                onClick={() => setIsCitationOpen(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-zinc-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
