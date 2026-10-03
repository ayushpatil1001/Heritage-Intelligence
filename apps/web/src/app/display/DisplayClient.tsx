"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { AshokaChakra } from "@/components/HeritageSymbols";
import {
  Sparkles, Maximize2, Minimize2, QrCode, ShieldCheck,
  Database, Users, BookOpen, ArrowRight, ArrowLeft,
  Calendar, Clock, CheckCircle2, ChevronRight, ChevronLeft,
  Play, Pause, Volume2, VolumeX
} from "lucide-react";

interface DisplayQuoteCard {
  quote: string;
  author: string;
  source: string;
  year: string;
  category: string;
  historicalContext: string;
}

const EXHIBITION_QUOTES: DisplayQuoteCard[] = [
  {
    quote: "“Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality and fraternity as the principles of life.”",
    author: "Dr. B. R. Ambedkar",
    source: "Constituent Assembly Debates, Vol. XI",
    year: "25/11/1949",
    category: "Constitutional Morality",
    historicalContext: "Concluding address on the adoption of the Constitution of India in Constitution Hall, New Delhi.",
  },
  {
    quote: "“At Mahad, we do not want to go to the tank merely to drink water. We want to go to the tank to assert that we are human beings. Lost rights are never regained by begging, but by relentless struggle.”",
    author: "Dr. B. R. Ambedkar",
    source: "Speech to the Depressed Classes, Mahad Satyagraha",
    year: "20/03/1927",
    category: "Human Rights & Civil Dignity",
    historicalContext: "Historic declaration asserting equal civic access to Chavdar Lake public drinking water.",
  },
  {
    quote: "“The trade of a country depends upon the stability of its currency. A fluctuating rupee is a tax on industry and commerce, and the worst enemy of social justice.”",
    author: "Dr. B. R. Ambedkar",
    source: "The Problem of the Rupee: Its Origin and Its Solution",
    year: "01/05/1923",
    category: "Economics & Monetary Policy",
    historicalContext: "Doctoral dissertation submitted to London School of Economics, foundational to RBI's central banking framework.",
  },
  {
    quote: "“Religion must mainly be a matter of principles only. It cannot be a matter of rules. The moment it degenerates into rules, it ceases to be religion, as it kills moral responsibility.”",
    author: "Dr. B. R. Ambedkar",
    source: "Annihilation of Caste, Section 25",
    year: "15/05/1936",
    category: "Philosophy of Liberation",
    historicalContext: "Philosophical treatise prepared for the Jat-Pat-Todak Mandal of Lahore.",
  },
  {
    quote: "“I measure the progress of a community by the degree of progress which women have achieved. There can be no social transformation where women remain subordinate.”",
    author: "Dr. B. R. Ambedkar",
    source: "All-India Depressed Classes Women's Conference, Nagpur",
    year: "20/07/1942",
    category: "Gender Justice & Equality",
    historicalContext: "Address to an assembly of over 25,000 women asserting education and economic self-determination.",
  },
];

export default function DisplayClient() {
  const { language } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1420);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-advance quote card every 10 seconds with progress tick (pauses when user holds)
  useEffect(() => {
    if (isPaused) return;

    const interval = 100;
    const total = 10000;
    const step = (interval / total) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % EXHIBITION_QUOTES.length);
          setVisitorCount((c) => c + Math.floor(Math.random() * 2));
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeIdx, isPaused]);

  // Web Speech API Ambient Narration
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const currentQuote = EXHIBITION_QUOTES[activeIdx];
      const textToRead = `${currentQuote.quote}. Stated by ${currentQuote.author}, from ${currentQuote.source}.`;
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
  }, [activeIdx]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Keyboard navigation for wall exhibition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleNext = () => {
    setProgress(0);
    setActiveIdx((prev) => (prev + 1) % EXHIBITION_QUOTES.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setActiveIdx((prev) => (prev - 1 + EXHIBITION_QUOTES.length) % EXHIBITION_QUOTES.length);
  };

  const current = EXHIBITION_QUOTES[activeIdx];

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative overflow-hidden select-none">
      {/* Background Radial Glow & Rotating Ashoka Chakra Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B2A6F]/50 via-navy-950 to-black opacity-90 pointer-events-none" />
      <div className="absolute -right-20 -bottom-24 opacity-5 pointer-events-none">
        <AshokaChakra size={600} className="text-white" animate={true} />
      </div>

      {/* Top Header: Brand, Telemetry, and Fullscreen / Exit Controls */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center font-serif font-black text-2xl shadow-lg border border-gold-400">
            अ
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-white">
              Dr. B. R. Ambedkar Heritage Archive
            </h1>
            <p className="text-xs text-gold-400 font-mono tracking-wider uppercase flex items-center gap-2">
              <span>Grand Display Wall (1920×1080 Ambient Showcase)</span>
              <span>•</span>
              <span className="text-white bg-gold-500/20 px-2 py-0.5 rounded font-mono">03/10/2026</span>
            </p>
          </div>
        </div>

        {/* Live Counters and Controls */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-mono font-bold text-gold-400">30</div>
            <div className="text-[10px] text-zinc-300 uppercase tracking-wider">Treatises & Speeches</div>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">100%</div>
            <div className="text-[10px] text-zinc-300 uppercase tracking-wider">Citation Integrity</div>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-mono font-bold text-white">14,200+</div>
            <div className="text-[10px] text-zinc-300 uppercase tracking-wider">Facsimile Scans</div>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-mono font-bold text-gold-200 font-mono">{visitorCount}</div>
            <div className="text-[10px] text-zinc-300 uppercase tracking-wider">Gallery Visitors</div>
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 cursor-pointer"
              title="Toggle Cinema Fullscreen"
              aria-label="Toggle Cinema Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20"
            >
              Exit to Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Feature: Grand Dynamic Quotation Display Card */}
      <main className="relative z-10 my-auto py-10 max-w-5xl mx-auto text-center w-full px-4">
        {/* Category & Date in DD/MM/YYYY */}
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-300 bg-gold-950/80 border border-gold-500/50 px-5 py-2 rounded-full mb-8 shadow-md">
          <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
          <span>{current.category}</span>
          <span className="text-gold-500">•</span>
          <span className="font-mono text-white">{current.year}</span>
        </div>

        <blockquote className="text-2xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-100 leading-snug tracking-tight min-h-[180px] flex items-center justify-center">
          {current.quote}
        </blockquote>

        <div className="mt-8 space-y-1.5">
          <div className="text-xl sm:text-2xl font-serif font-bold text-gold-400 tracking-wide">
            {current.author}
          </div>
          <div className="text-sm sm:text-base text-zinc-300 font-mono">
            {current.source}
          </div>
          <div className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-2 italic font-sans leading-relaxed">
            {current.historicalContext}
          </div>
        </div>

        {/* Carousel Navigation & Auto-Progress Bar */}
        <div className="mt-10 max-w-xl mx-auto space-y-3">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className={`bg-gold-400 h-full transition-all duration-100 ease-linear rounded-full ${
                isPaused ? "opacity-50" : "opacity-100"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-300 font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                title="Previous Quote (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPaused((p) => !p)}
                className={`p-2.5 rounded-xl transition-colors cursor-pointer border ${
                  isPaused
                    ? "bg-gold-500 text-navy-950 border-gold-400 font-bold"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                }`}
                title={isPaused ? "Resume slideshow (Space)" : "Pause slideshow (Space)"}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors cursor-pointer border ${
                  isSpeaking
                    ? "bg-gold-500 text-navy-950 border-gold-400 font-bold animate-pulse"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                }`}
                title="Audio Narration (TTS)"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-[11px] font-sans font-semibold">
                  {isSpeaking ? "Narrating..." : "Listen"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {EXHIBITION_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setProgress(0);
                    setActiveIdx(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === i ? "w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              title="Next Quote (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Bar: QR Mobile Handover & Quick Switchers */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-6">
        <div className="flex items-center gap-4">
          {/* Simulated QR Code for mobile handover */}
          <div className="bg-white p-2.5 rounded-xl shadow-lg flex items-center justify-center shrink-0">
            <svg viewBox="0 0 80 80" className="w-14 h-14 text-navy-950" role="img" aria-label="QR Code to continue on mobile">
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

          <div className="text-left">
            <div className="flex items-center gap-1.5 text-gold-400 font-bold text-xs uppercase tracking-wide">
              <QrCode className="w-4 h-4" />
              <span>Continue on Your Smartphone</span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5 max-w-lg">
              Scan with your mobile camera to take this exhibition quote, citation transcripts, and personal binder with you.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/kiosk"
            className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-xs font-bold text-navy-950 transition-colors shadow-md"
          >
            Launch Kiosk Surface
          </Link>
          <Link
            href="/search"
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition-colors border border-white/20"
          >
            Search Archive
          </Link>
        </div>
      </footer>
    </div>
  );
}
