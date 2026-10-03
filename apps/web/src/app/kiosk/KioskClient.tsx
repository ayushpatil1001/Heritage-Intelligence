"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { AshokaChakra, LionCapital } from "@/components/HeritageSymbols";
import {
  BookOpen, Search, MessageSquare, ShieldCheck, Compass,
  Clock, Sparkles, QrCode, Volume2, Eye, RefreshCw,
  Globe, ArrowRight, Hand, Calendar, CheckCircle2, ChevronRight
} from "lucide-react";
import OnScreenKeyboard from "@/components/OnScreenKeyboard";

const ROTATING_QUOTES = [
  {
    quote: "“Educate, Agitate, Organize. Have faith in yourselves. With justice on our side, I do not see how we can lose our battle.”",
    context: "All-India Depressed Classes Conference, Nagpur",
    date: "20/07/1942",
  },
  {
    quote: "“Constitutional morality is not a natural sentiment. It has to be cultivated. We must realize that our people have yet to learn it.”",
    context: "Constituent Assembly of India (Draft Constitution Debate)",
    date: "04/11/1948",
  },
  {
    quote: "“I measure the progress of a community by the degree of progress which women have achieved.”",
    context: "Second All-India Depressed Classes Women's Conference",
    date: "20/07/1942",
  },
  {
    quote: "“Cultivation of mind should be the ultimate aim of human existence.”",
    context: "Annihilation of Caste & Columbia University Lectures",
    date: "15/05/1936",
  },
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

  // Activate kiosk mode when mounted
  useEffect(() => {
    setKioskMode(true);
    return () => {
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/kiosk")) {
        setKioskMode(false);
      }
    };
  }, [setKioskMode]);

  // Rotate quotes every 8 seconds for kiosk attract mode
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuoteIdx((idx) => (idx + 1) % ROTATING_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Web Speech API for Kiosk Attract Quote Narration
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const q = ROTATING_QUOTES[activeQuoteIdx];
      const textToRead = `${q.quote}. Context: ${q.context}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
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
  }, [activeQuoteIdx]);

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
              Ambedkar Heritage Kiosk
            </h1>
            <p className="text-xs text-stone-200/90 flex items-center gap-1.5 font-medium">
              <span>DAIC National Digital Heritage Archive • PS 26096</span>
              <span className="text-[#C8A24A]">•</span>
              <span className="font-mono text-[#C8A24A]">03/10/2026</span>
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
            title="Toggle High Contrast for Accessibility"
          >
            <Eye className="w-4 h-4 text-accent" />
            <span className="hidden xs:inline">High Contrast</span>
          </button>
        </div>
      </header>

      {/* Attract Hero Section: Rotating Quotation with Date formatted in DD/MM/YYYY */}
      <section className="bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-accent/15 px-3.5 py-1 rounded-full border border-accent/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Interactive Exhibition Mode</span>
          <span className="text-zinc-400">•</span>
          <span className="font-mono text-primary font-bold">{currentQuote.date}</span>
        </div>

        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary max-w-3xl mx-auto leading-relaxed">
          {currentQuote.quote}
        </blockquote>

        <p className="text-xs sm:text-sm text-[#8F6B1E] font-semibold mt-3 font-sans">
          — {currentQuote.context}
        </p>

        {/* Audio Narration & Slide Dots */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <button
            onClick={toggleSpeech}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-primary font-bold text-xs border border-stone-300 transition-colors cursor-pointer"
            title="Read quote aloud"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? "text-accent animate-pulse" : "text-primary"}`} />
            <span>{isSpeaking ? "Stop Narration" : "Listen (Speech Narration)"}</span>
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
              placeholder="Touch here to search speeches, CAD debates, or writings..."
              className="w-full h-16 pl-14 pr-4 rounded-2xl bg-stone-50 border border-stone-300 text-base sm:text-lg font-medium text-zinc-900 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            className="h-16 px-6 sm:px-8 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm sm:text-base transition-colors shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Search</span>
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
        <Link
          href="/reader/item-baws-01-caste"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              Read Original Works
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">High-Res Facsimiles & BAWS</p>
          </div>
        </Link>

        <Link
          href="/timeline"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent/20 text-[#8F6B1E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              1891–1956 Timeline
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">25 Life Milestones in DD/MM/YYYY</p>
          </div>
        </Link>

        <Link
          href="/quotes/verify"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              Verify a Quotation
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">Instant Verbatim Fact-Check</p>
          </div>
        </Link>

        <Link
          href="/map"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              Historical Map
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">Mahad, Columbia, LSE, Nagpur</p>
          </div>
        </Link>

        <Link
          href="/assistant"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              Archival AI Assistant
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">Strict Citations & Audio Dialogue</p>
          </div>
        </Link>

        <Link
          href="/stories"
          className="h-36 p-5 rounded-3xl bg-white border border-stone-300 hover:border-primary hover:shadow-lg transition-all flex flex-col justify-between group active:scale-95"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-primary group-hover:text-primary-hover transition-colors">
              Exhibition Stories
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">4 Curated Archival Visual Essays</p>
          </div>
        </Link>
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
            Node: Central Hall Kiosk 01 • Telemetry: {heartbeatStatus}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-primary font-semibold border border-stone-300 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-accent" />
            <span>Mobile Transfer QR</span>
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
            <span>Reset Kiosk Session</span>
          </button>
        </div>
      </div>

      {/* Mobile QR Transfer Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-300 p-8 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-serif font-bold text-primary">Transfer Session to Mobile</h3>
            <p className="text-xs text-zinc-600">
              Scan this QR code with your phone camera to continue browsing on your mobile device.
            </p>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-center">
              <svg viewBox="0 0 80 80" className="w-40 h-40 text-primary" role="img" aria-label="Kiosk Handover QR">
                <rect x="5" y="5" width="22" height="22" fill="currentColor" />
                <rect x="9" y="9" width="14" height="14" fill="white" />
                <rect x="12" y="12" width="8" height="8" fill="currentColor" />
                <rect x="53" y="5" width="22" height="22" fill="currentColor" />
                <rect x="57" y="9" width="14" height="14" fill="white" />
                <rect x="60" y="12" width="8" height="8" fill="currentColor" />
                <rect x="5" y="53" width="22" height="22" fill="currentColor" />
                <rect x="9" y="57" width="14" height="14" fill="white" />
                <rect x="12" y="60" width="8" height="8" fill="currentColor" />
                {/* Pattern dots */}
                <rect x="35" y="10" width="8" height="8" fill="currentColor" />
                <rect x="35" y="24" width="6" height="6" fill="currentColor" />
                <rect x="32" y="36" width="16" height="8" fill="currentColor" />
                <rect x="35" y="50" width="8" height="14" fill="currentColor" />
                <rect x="55" y="38" width="16" height="8" fill="currentColor" />
                <rect x="55" y="55" width="12" height="12" fill="currentColor" />
              </svg>
            </div>
            <button
              onClick={() => setQrModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs cursor-pointer hover:bg-primary-hover"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
