"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { AshokaChakra, LionCapital } from "@/components/HeritageSymbols";
import {
  BookOpen, Search, MessageSquare, ShieldCheck, Compass,
  Clock, Sparkles, QrCode, Volume2, Eye, RefreshCw,
  Globe, ArrowRight, Hand, Calendar, CheckCircle2, ChevronRight,
  X, Filter, FileText, ExternalLink, Bookmark, Layers
} from "lucide-react";
import OnScreenKeyboard from "@/components/OnScreenKeyboard";
import QRCodeModal from "@/components/QRCodeModal";
import { CATALOG_ITEMS, CatalogItem } from "@/lib/catalogData";
import { toDDMMYYYY } from "@/lib/utils";

const ROTATING_QUOTES = [
  {
    quote: "“Educate, Agitate, Organize. Have faith in yourselves. With justice on our side, I do not see how we can lose our battle.”",
    quote_hi: "“शिक्षित बनो, आंदोलन करो, संगठित रहो। अपने आप में विश्वास रखो। जब न्याय हमारे पक्ष में है, तो मुझे नहीं लगता कि हम अपनी लड़ाई हार सकते हैं।”",
    quote_mr: "“शिका, संघटित व्हा आणि संघर्ष करा. स्वतःवर विश्वास ठेवा. न्याय आपल्या बाजूने असताना आपण ही लढाई हरूच शकत नाही.”",
    context: "All-India Depressed Classes Conference, Nagpur",
    context_hi: "अखिल भारतीय दलित वर्ग परिषद, नागपुर",
    context_mr: "अखिल भारतीय दलित वर्ग परिषद, नागपूर",
    date: "20/07/1942",
  },
  {
    quote: "“Constitutional morality is not a natural sentiment. It has to be cultivated. We must realize that our people have yet to learn it.”",
    quote_hi: "“संवैधानिक नैतिकता कोई प्राकृतिक भावना नहीं है। इसे विकसित करना होता है। हमें यह समझना चाहिए कि हमारे लोगों को अभी इसे सीखना बाकी है।”",
    quote_mr: "“घटनात्मक नैतिकता ही काही नैसर्गिक भावना नव्हे; तिची जोपासना करावी लागते. आपल्या लोकांना ती अजून शिकायची आहे हे आपण लक्षात घेतले पाहिजे.”",
    context: "Constituent Assembly of India (Draft Constitution Debate)",
    context_hi: "भारत की संविधान सभा (प्रारूप संविधान वादविवाद)",
    context_mr: "भारतीय संविधान सभा (मसुदा राज्यघटना वादविवाद)",
    date: "04/11/1948",
  },
  {
    quote: "“I measure the progress of a community by the degree of progress which women have achieved.”",
    quote_hi: "“मैं किसी समुदाय की प्रगति को महिलाओं द्वारा हासिल की गई प्रगति की मात्रा से मापता हूँ।”",
    quote_mr: "“एखाद्या समाजाची प्रगती मी त्या समाजातील स्त्रियांनी केलेल्या प्रगतीवरून मोजतो.”",
    context: "Second All-India Depressed Classes Women's Conference",
    context_hi: "द्वितीय अखिल भारतीय दलित महिला सम्मेलन",
    context_mr: "दुसरी अखिल भारतीय दलित महिला परिषद",
    date: "20/07/1942",
  },
  {
    quote: "“Cultivation of mind should be the ultimate aim of human existence.”",
    quote_hi: "“मन का विकास मानव अस्तित्व का अंतिम लक्ष्य होना चाहिए।”",
    quote_mr: "“मनाचा विकास हेच मानवी अस्तित्वाचे अंतिम ध्येय असले पाहिजे.”",
    context: "Annihilation of Caste & Columbia University Lectures",
    context_hi: "जाति का विनाश और कोलंबिया विश्वविद्यालय व्याख्यान",
    context_mr: "जातीचे निर्मूलन आणि कोलंबिया विद्यापीठ व्याख्याने",
    date: "15/05/1936",
  },
];

// 6 Seminal Works to feature directly on the shelf
const FEATURED_TREATISE_IDS = [
  "item-baws-01-caste",
  "item-baws-01-aoc",
  "item-baws-06-rupee",
  "item-cad-art32",
  "item-baws-07-shudras",
  "item-baws-11-buddha",
];

export default function KioskClient() {
  const { language, setLanguage, highContrast, toggleHighContrast, setKioskMode, t } = useApp();
  const router = useRouter();
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [heartbeatStatus, setHeartbeatStatus] = useState<string>("connected");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Original Works Catalog Browser States
  const [isWorksModalOpen, setIsWorksModalOpen] = useState(false);
  const [worksCategory, setWorksCategory] = useState<"all" | "book" | "debate" | "speech" | "editorial">("all");
  const [worksSearch, setWorksSearch] = useState("");

  // Activate kiosk mode when mounted; keep kiosk mode active across page visits
  useEffect(() => {
    setKioskMode(true);
  }, [setKioskMode]);

  // Rotate quotes every 8 seconds for kiosk attract mode
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIdx((idx) => (idx + 1) % ROTATING_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Web Speech API for Kiosk Attract Quote Narration in selected language
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const q = ROTATING_QUOTES[activeQuoteIdx];
      const quoteText = language === "hi" ? q.quote_hi : language === "mr" ? q.quote_mr : q.quote;
      const contextText = language === "hi" ? q.context_hi : language === "mr" ? q.context_mr : q.context;
      const textToRead = `${quoteText}. ${contextText}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeQuoteIdx, language]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Send Kiosk Heartbeat to backend every 30 seconds
  useEffect(() => {
    const sendHeartbeat = async () => {
      try {
        const res = await fetch("/api/v1/kiosks/kiosk-central-hall/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kiosk_id: "kiosk-central-hall",
            status: "active",
            screen: "kiosk_home",
            battery_pct: 100,
            active_language: language,
          }),
        });
        if (res.ok) {
          setHeartbeatStatus("online");
        }
      } catch (err) {
        setHeartbeatStatus("offline-cached");
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 30000);
    return () => clearInterval(interval);
  }, [language]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentQuote = ROTATING_QUOTES[activeQuoteIdx];
  const currentDateFormatted = toDDMMYYYY(new Date().toISOString().substring(0, 10));

  // Curated shelf of seminal works
  const featuredTreatises = useMemo(() => {
    return FEATURED_TREATISE_IDS.map(
      (id) => CATALOG_ITEMS.find((item) => item.id === id) || CATALOG_ITEMS[0]
    );
  }, []);

  // Filtered list of all 30 original works for the modal
  const filteredWorks = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCat =
        worksCategory === "all" ||
        (worksCategory === "book" && item.type === "book") ||
        (worksCategory === "debate" && item.type === "debate") ||
        (worksCategory === "speech" && item.type === "speech") ||
        (worksCategory === "editorial" &&
          (item.type === "editorial" || item.type === "manuscript" || item.type === "article"));

      const searchLower = worksSearch.trim().toLowerCase();
      const titleMatches =
        !searchLower ||
        item.title.toLowerCase().includes(searchLower) ||
        (item.title_i18n?.hi && item.title_i18n.hi.toLowerCase().includes(searchLower)) ||
        (item.title_i18n?.mr && item.title_i18n.mr.toLowerCase().includes(searchLower)) ||
        (item.snippet && item.snippet.toLowerCase().includes(searchLower));

      return matchesCat && titleMatches;
    });
  }, [worksCategory, worksSearch]);

  const getItemTitle = (item: CatalogItem) => {
    if (language === "hi" && item.title_i18n?.hi) return item.title_i18n.hi;
    if (language === "mr" && item.title_i18n?.mr) return item.title_i18n.mr;
    return item.title_i18n?.en || item.title;
  };

  const getItemCategoryLabel = (type: string) => {
    if (type === "book") return t.kiosk.allWorksFilterBook;
    if (type === "debate") return t.kiosk.allWorksFilterDebate;
    if (type === "speech") return t.kiosk.allWorksFilterSpeech;
    if (type === "editorial" || type === "manuscript" || type === "article") return t.kiosk.allWorksFilterEditorial;
    return type;
  };

  return (
    <div className="flex flex-col justify-between space-y-6 w-full max-w-[1080px] mx-auto select-none">
      {/* Kiosk Top Bar: 72px high touch controls with DAIC Emblem */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B2A6F] text-white p-5 px-6 rounded-3xl shadow-lg border-2 border-[#C8A24A]/40">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center font-serif font-black text-2xl shadow-md border border-gold-400">
            अ
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-white">
              {t.kiosk.kioskHeaderTitle}
            </h1>
            <p className="text-xs text-stone-200/90 flex items-center gap-1.5 font-medium">
              <span>{t.kiosk.kioskHeaderSubtitle}</span>
              <span className="text-[#C8A24A]">•</span>
              <span className="font-mono text-[#C8A24A]">{currentDateFormatted}</span>
            </p>
          </div>
        </div>

        {/* Accessibility & Multilingual Fast Buttons (Min 64px touch target) */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle Pills */}
          <div className="inline-flex rounded-2xl bg-white/10 p-1 border border-white/20">
            {(["en", "hi", "mr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`h-12 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  language === l ? "bg-[#C8A24A] text-navy-950 shadow-md font-black" : "text-white hover:bg-white/15"
                }`}
              >
                {l === "en" ? "English" : l === "hi" ? "हिन्दी" : "मराठी"}
              </button>
            ))}
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`h-12 px-4 rounded-2xl flex items-center gap-2 font-bold text-xs transition-colors border cursor-pointer ${
              highContrast
                ? "bg-yellow-400 text-black border-yellow-500 font-black shadow-md"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
            title={t.kiosk.highContrast}
          >
            <Eye className="w-4 h-4 text-accent" />
            <span className="hidden xs:inline">{t.kiosk.highContrast}</span>
          </button>
        </div>
      </header>

      {/* Attract Hero Section: Rotating Quotation with Date formatted in DD/MM/YYYY */}
      <section className="bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-accent/15 px-3.5 py-1 rounded-full border border-accent/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>{t.kiosk.interactiveMode}</span>
          <span className="text-zinc-400">•</span>
          <span className="font-mono text-primary font-bold">{currentQuote.date}</span>
        </div>

        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary max-w-3xl mx-auto leading-relaxed">
          {language === "hi" ? currentQuote.quote_hi : language === "mr" ? currentQuote.quote_mr : currentQuote.quote}
        </blockquote>

        <p className="text-xs sm:text-sm text-[#8F6B1E] font-semibold mt-3 font-sans">
          — {language === "hi" ? currentQuote.context_hi : language === "mr" ? currentQuote.context_mr : currentQuote.context}
        </p>

        {/* Audio Narration & Slide Dots */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <button
            onClick={toggleSpeech}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-primary font-bold text-xs border border-stone-300 transition-colors cursor-pointer"
            title="Read quote aloud"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-accent animate-pulse" : "text-primary"}`} />
            <span>{isSpeaking ? t.kiosk.stopSpeech : t.kiosk.listenSpeech}</span>
          </button>

          <div className="flex items-center gap-1.5">
            {ROTATING_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuoteIdx(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeQuoteIdx === i ? "w-8 bg-primary" : "w-2.5 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Show quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Kiosk Touch Search Bar (Integrates On-Screen Keyboard) */}
      <section className="bg-white border border-stone-300 rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-6 h-6 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowKeyboard(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.kiosk.touchSearchPlaceholder}
              className="w-full h-16 pl-14 pr-4 rounded-2xl bg-stone-50 border border-stone-300 text-base sm:text-lg font-medium text-zinc-900 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            className="h-16 px-6 sm:px-8 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base transition-colors shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>{t.kiosk.searchButton}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </button>
        </div>

        {/* Embedded Virtual Touch Keyboard when search input focused */}
        {showKeyboard && (
          <div className="pt-3 border-t border-stone-200">
            <OnScreenKeyboard
              isOpen={showKeyboard}
              onKeyPress={(char) => setSearchQuery((q) => q + char)}
              onBackspace={() => setSearchQuery((q) => q.slice(0, -1))}
              onEnter={handleSearchSubmit}
              onClose={() => setShowKeyboard(false)}
            />
          </div>
        )}
      </section>

      {/* 6 High-Impact Touch Action Tiles (Min 64px Touch Height) */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Tile 1: Opens All 30 Original Works Modal */}
        <button
          onClick={() => setIsWorksModalOpen(true)}
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95 text-left cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {t.kiosk.worksCount}
            </span>
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              {t.kiosk.readOriginalWorks}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.kiosk.readOriginalWorksDesc}</p>
          </div>
        </button>

        {/* Tile 2: Timeline */}
        <Link
          href="/timeline"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent/20 text-[#8F6B1E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              {t.kiosk.timelineTile}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.kiosk.timelineTileDesc}</p>
          </div>
        </Link>

        {/* Tile 3: Verify a Quotation */}
        <Link
          href="/quotes/verify"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              {t.kiosk.verifyQuoteTile}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.kiosk.verifyQuoteTileDesc}</p>
          </div>
        </Link>

        {/* Tile 4: Historical Map */}
        <Link
          href="/map"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              {t.kiosk.mapTile}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.kiosk.mapTileDesc}</p>
          </div>
        </Link>

        {/* Tile 5: Archival AI Assistant */}
        <Link
          href="/assistant"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              {t.kiosk.assistantTile}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.kiosk.assistantTileDesc}</p>
          </div>
        </Link>

        {/* Tile 6: Exhibition Stories */}
        <Link
          href="/stories"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              {t.kiosk.storiesTile}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{t.kiosk.storiesTileDesc}</p>
          </div>
        </Link>
      </section>

      {/* Curated Treatises Shelf: Featured Seminal Works on Kiosk Surface */}
      <section className="bg-white border border-stone-300 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-accent" />
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-primary">
                {t.kiosk.readOriginalWorks}
              </h2>
              <p className="text-xs text-zinc-500">{t.kiosk.readOriginalWorksDesc}</p>
            </div>
          </div>

          <button
            onClick={() => setIsWorksModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{t.kiosk.worksCount}</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        {/* 6 Curated Treatises Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {featuredTreatises.map((item) => (
            <Link
              key={item.id}
              href={`/reader/${item.id}`}
              className="p-4 rounded-2xl border border-stone-200 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between bg-stone-50/50 group active:scale-98"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-white border border-stone-200 uppercase text-primary">
                    {getItemCategoryLabel(item.type)}
                  </span>
                  <span className="font-mono text-zinc-600 font-semibold">
                    {toDDMMYYYY(item.date_start)}
                  </span>
                </div>

                <h3 className="text-sm font-serif font-bold text-primary group-hover:text-[#8F6B1E] transition-colors line-clamp-2">
                  {getItemTitle(item)}
                </h3>

                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                  {item.source}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-primary group-hover:text-accent">
                <span>{t.kiosk.openInReader}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Kiosk Status & Reset Panel */}
      <div className="bg-white border border-stone-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              heartbeatStatus === "online" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          <span className="font-mono text-zinc-600">
            {t.kiosk.nodeTelemetry} {heartbeatStatus === "online" ? t.kiosk.statusOnline : t.kiosk.statusOffline}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-primary font-semibold border border-stone-300 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-accent" />
            <span>{t.kiosk.mobileTransferQr}</span>
          </button>

          <button
            onClick={() => {
              setSearchQuery("");
              setShowKeyboard(false);
              router.push("/kiosk");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-accent" />
            <span>{t.kiosk.resetNow}</span>
          </button>
        </div>
      </div>

      {/* Mobile QR Transfer Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        url={
          searchQuery
            ? `https://heritage-intelligence-drab.vercel.app/search?q=${encodeURIComponent(searchQuery)}`
            : "https://heritage-intelligence-drab.vercel.app/kiosk"
        }
        title={t.appName}
        subtitle={
          searchQuery
            ? `Search: "${searchQuery}" • Continue on Smartphone`
            : "Continue interactive exploration seamlessly on your personal smartphone"
        }
        badge="Museum Kiosk Handover"
      />

      {/* All 30 Authenticated Original Works Catalog Browser Modal */}
      {isWorksModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto flex items-center justify-center animate-fade-in">
          <div className="bg-[#FAF9F6] border-2 border-[#C8A24A]/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#0B2A6F] text-white flex items-center justify-between gap-4 border-b border-[#C8A24A]/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8A24A] text-[#061537] flex items-center justify-center font-bold shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {t.kiosk.allWorksTitle}
                  </h2>
                  <p className="text-xs text-stone-200 mt-0.5 line-clamp-1">
                    {t.kiosk.allWorksSubtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWorksModalOpen(false)}
                className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-transform active:scale-95 shrink-0"
                aria-label={t.kiosk.closeCatalog}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Controls & Search */}
            <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              {/* Type Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(
                  [
                    { key: "all", label: t.kiosk.allWorksFilterAll },
                    { key: "book", label: t.kiosk.allWorksFilterBook },
                    { key: "debate", label: t.kiosk.allWorksFilterDebate },
                    { key: "speech", label: t.kiosk.allWorksFilterSpeech },
                    { key: "editorial", label: t.kiosk.allWorksFilterEditorial },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setWorksCategory(tab.key)}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      worksCategory === tab.key
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-stone-50 text-zinc-700 border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Works Search Input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={worksSearch}
                  onChange={(e) => setWorksSearch(e.target.value)}
                  placeholder={language === "mr" ? "ग्रंथामध्ये शोधा..." : language === "hi" ? "ग्रंथों में खोजें..." : "Filter original works..."}
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-stone-50 border border-stone-300 text-xs text-zinc-900 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>
            </div>

            {/* Catalog Grid (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorks.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-stone-300 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#FDF8ED] text-[#886524] border border-[#F4DF9E] text-[10px] uppercase">
                        {getItemCategoryLabel(item.type)}
                      </span>
                      <span className="font-mono text-primary font-semibold">
                        {toDDMMYYYY(item.date_start)}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-primary leading-snug">
                      {getItemTitle(item)}
                    </h3>

                    <p className="text-xs text-[#8F6B1E] font-medium">
                      {item.source}
                    </p>

                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {item.pages?.length || 1} {language === "mr" ? "पृष्ठे" : language === "hi" ? "पृष्ठ" : "Pages"} • {item.rights}
                    </span>

                    <Link
                      href={`/reader/${item.id}`}
                      onClick={() => setIsWorksModalOpen(false)}
                      className="px-4 py-2.5 min-h-[44px] rounded-xl bg-primary hover:bg-primary-hover active:bg-[#081E50] text-white text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs cursor-pointer shrink-0"
                    >
                      <span>{t.kiosk.openInReader}</span>
                    </Link>
                  </div>
                </div>
              ))}

              {filteredWorks.length === 0 && (
                <div className="col-span-full py-12 text-center text-zinc-500">
                  <p className="text-sm font-medium">
                    {language === "mr" ? "कोणतेही मूळ ग्रंथ सापडले नाहीत." : language === "hi" ? "कोई मूल ग्रंथ नहीं मिला।" : "No original treatises matched your filter."}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-stone-300 flex items-center justify-between shrink-0">
              <span className="text-xs text-zinc-600 font-medium">
                {filteredWorks.length} / {CATALOG_ITEMS.length} {t.kiosk.allWorksTitle}
              </span>

              <button
                onClick={() => setIsWorksModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-zinc-800 text-xs font-bold cursor-pointer transition-colors"
              >
                {t.kiosk.closeCatalog}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
