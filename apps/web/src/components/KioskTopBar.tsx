"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { AshokaChakra } from "@/components/HeritageSymbols";
import {
  ArrowLeft,
  Landmark,
  Eye,
  RefreshCw,
  LogOut,
  Sliders,
  Sparkles,
} from "lucide-react";

export function KioskTopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    language,
    setLanguage,
    highContrast,
    toggleHighContrast,
    setKioskMode,
    clearCollection,
    t,
  } = useApp();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/kiosk");
    }
  };

  const handleResetSession = () => {
    clearCollection();
    router.push("/kiosk");
  };

  const handleExitKiosk = () => {
    setKioskMode(false);
    router.push("/");
  };

  // Determine section title based on active pathname
  let sectionTitle = t.kiosk.kioskHeaderTitle;
  if (pathname.startsWith("/reader")) {
    sectionTitle = language === "mr" ? "मूळ ग्रंथ व दस्तऐवज वाचक" : language === "hi" ? "मूल ग्रंथ व दस्तावेज पाठक" : "Original Works & Treatise Reader";
  } else if (pathname.startsWith("/timeline")) {
    sectionTitle = t.timeline.title;
  } else if (pathname.startsWith("/map")) {
    sectionTitle = t.map.title;
  } else if (pathname.startsWith("/quotes")) {
    sectionTitle = t.quoteVerifier.title;
  } else if (pathname.startsWith("/assistant")) {
    sectionTitle = t.assistant.title;
  } else if (pathname.startsWith("/stories")) {
    sectionTitle = t.stories.title;
  } else if (pathname.startsWith("/search")) {
    sectionTitle = t.nav.search;
  } else if (pathname.startsWith("/collections")) {
    sectionTitle = t.collections.title;
  } else if (pathname.startsWith("/graph")) {
    sectionTitle = t.graph.title;
  } else if (pathname.startsWith("/media")) {
    sectionTitle = t.media.title;
  } else if (pathname.startsWith("/admin")) {
    sectionTitle = t.admin.consoleTitle;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B2A6F] text-white border-b-2 border-[#C8A24A]/40 shadow-xl px-3 sm:px-6 py-2.5 select-none backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-h-[52px]">
        {/* Left: Prominent Back & Home Touch Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleBack}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 h-12 min-w-[56px] sm:min-w-[64px] bg-white/15 hover:bg-white/25 active:bg-white/30 rounded-xl text-xs sm:text-sm font-bold border border-white/20 cursor-pointer transition-transform active:scale-95 shadow-sm"
            aria-label={t.nav.back}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
            <span className="font-bold">{t.nav.back}</span>
          </button>

          <Link
            href="/kiosk"
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 h-12 min-w-[56px] sm:min-w-[64px] bg-white/15 hover:bg-white/25 active:bg-white/30 rounded-xl text-xs sm:text-sm font-bold border border-white/20 cursor-pointer transition-transform active:scale-95 shadow-sm"
          >
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
            <span className="hidden xs:inline">{t.nav.home}</span>
          </Link>
        </div>

        {/* Center: Current Section Banner */}
        <div className="flex items-center gap-2 truncate px-2">
          <AshokaChakra size={20} className="text-accent shrink-0 hidden md:inline-block" animate={true} />
          <div className="flex flex-col min-w-0 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F4DF9E] truncate">
              {t.kiosk.kioskActiveBanner}
            </span>
            <span className="font-serif font-bold text-xs sm:text-base text-white truncate">
              {sectionTitle}
            </span>
          </div>
        </div>

        {/* Right: Language, Accessibility, Reset, Exit */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher */}
          <div className="flex bg-white/10 rounded-xl p-0.5 border border-white/15 h-11 sm:h-12 items-center">
            {(["en", "hi", "mr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`h-9 sm:h-10 px-2 sm:px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  language === l
                    ? "bg-[#C8A24A] text-navy-950 shadow-sm font-black"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l === "en" ? "EN" : l === "hi" ? "हिं" : "मरा"}
              </button>
            ))}
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`h-11 sm:h-12 px-2.5 sm:px-3 rounded-xl flex items-center justify-center font-bold text-xs transition-colors border cursor-pointer ${
              highContrast
                ? "bg-yellow-400 text-black border-yellow-500 font-black shadow-md"
                : "bg-white/10 text-white border-white/15 hover:bg-white/20"
            }`}
            title={t.kiosk.highContrast}
            aria-label={t.kiosk.highContrast}
          >
            <Eye className="w-4 h-4 text-accent" />
          </button>

          {/* Reset Kiosk Session */}
          <button
            onClick={handleResetSession}
            className="hidden sm:flex items-center justify-center gap-1 px-3 h-11 sm:h-12 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-xl text-xs font-semibold border border-white/15 cursor-pointer text-white transition-transform active:scale-95"
            title={t.kiosk.resetNow}
          >
            <RefreshCw className="w-3.5 h-3.5 text-accent" />
            <span className="hidden md:inline">{t.kiosk.resetNow}</span>
          </button>

          {/* Exit Kiosk button */}
          <button
            onClick={handleExitKiosk}
            className="flex items-center justify-center p-2.5 h-11 sm:h-12 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold border border-red-500/50 cursor-pointer transition-transform active:scale-95 shadow-sm"
            title="Exit Kiosk Mode"
            aria-label="Exit Kiosk Mode"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default KioskTopBar;
