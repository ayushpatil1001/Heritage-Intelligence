"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { AshokaChakra } from "@/components/HeritageSymbols";
import {
  Search, Clock, MapPin, Network, Sparkles,
  CheckCircle2, Bookmark, Monitor, Sliders,
  ArrowLeft, MessageSquare, Volume2, Shield, Landmark,
  Menu, X, Tv, ChevronDown
} from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t, setIsAccessibilityOpen, myCollection, kioskMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isKiosk = pathname.startsWith("/kiosk") || kioskMode;
  const isDisplay = pathname.startsWith("/display");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --------------------------------------------------------------------------
  // 1. DISPLAY WALL: Pure immersion without public navbar
  // --------------------------------------------------------------------------
  if (isDisplay) {
    return null;
  }

  // --------------------------------------------------------------------------
  // 2. KIOSK PERSISTENT TOUCH BOTTOM DOCK (Touch targets >= 64px, PRD Section 5.1)
  // Single unbroken line, minimal design, zero horizontal scroll
  // --------------------------------------------------------------------------
  if (isKiosk) {
    return (
      <nav
        aria-label="Kiosk Touch Navigation Bar"
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B2A6F] text-white border-t border-[#C8A24A]/40 shadow-2xl px-2 sm:px-6 py-2 flex items-center justify-between min-h-[64px] sm:min-h-[72px] overflow-hidden select-none"
      >
        {/* Left: Navigation Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-1 px-2.5 sm:px-4 h-12 sm:h-14 min-w-[44px] sm:min-w-[64px] bg-white/10 active:bg-white/20 rounded-xl text-xs sm:text-sm font-semibold border border-white/15 cursor-pointer transition-transform active:scale-95"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="hidden sm:inline">{t.nav.back}</span>
          </button>

          <Link
            href="/kiosk"
            className="flex items-center justify-center gap-1 px-2.5 sm:px-4 h-12 sm:h-14 min-w-[44px] sm:min-w-[64px] bg-white/10 active:bg-white/20 rounded-xl text-xs sm:text-sm font-semibold border border-white/15 cursor-pointer transition-transform active:scale-95"
          >
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="hidden sm:inline">{t.nav.home}</span>
          </Link>

          <Link
            href="/search"
            className="flex items-center justify-center gap-1 px-2.5 sm:px-4 h-12 sm:h-14 min-w-[44px] sm:min-w-[64px] bg-white/10 active:bg-white/20 rounded-xl text-xs sm:text-sm font-semibold border border-white/15 cursor-pointer transition-transform active:scale-95"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="hidden sm:inline">{t.nav.search}</span>
          </Link>
        </div>

        {/* Center: Institutional Minimal Emblem */}
        <div className="hidden lg:flex items-center gap-2.5 px-2 shrink-0">
          <AshokaChakra size={24} className="text-accent" animate={true} />
          <span className="font-serif font-bold text-sm text-stone-100 tracking-wide">
            {t.appName}
          </span>
        </div>

        {/* Right side: Language, Accessibility, Collection, Ask AI */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher */}
          <div className="flex bg-white/10 rounded-xl p-0.5 border border-white/15 h-12 sm:h-14 items-center">
            {(["en", "hi", "mr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`h-10 sm:h-12 px-2 sm:px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  language === l ? "bg-[#C8A24A] text-navy-950 shadow-sm font-black" : "text-white/80 hover:text-white"
                }`}
              >
                {l === "en" ? "EN" : l === "hi" ? "हिं" : "मरा"}
              </button>
            ))}
          </div>

          {/* Accessibility Panel Trigger */}
          <button
            onClick={() => setIsAccessibilityOpen(true)}
            className="flex items-center justify-center p-2.5 sm:p-3 h-12 sm:h-14 min-w-[44px] sm:min-w-[52px] bg-white/10 active:bg-white/20 rounded-xl font-semibold border border-white/15 cursor-pointer transition-transform active:scale-95"
            aria-label="Accessibility Options"
            title={t.accessibility.title}
          >
            <Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </button>

          {/* My Collection */}
          <Link
            href="/collections"
            className="relative flex items-center justify-center p-2.5 sm:p-3 h-12 sm:h-14 min-w-[44px] sm:min-w-[52px] bg-white/10 active:bg-white/20 rounded-xl font-semibold border border-white/15 cursor-pointer transition-transform active:scale-95"
            title={t.nav.myCollection}
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            {myCollection.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent text-primary text-[10px] font-bold flex items-center justify-center">
                {myCollection.length}
              </span>
            )}
          </Link>

          {/* Ask AI touch button */}
          <Link
            href="/assistant"
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 h-12 sm:h-14 bg-[#C8A24A] text-navy-950 rounded-xl font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-transform active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t.nav.ask}</span>
          </Link>
        </div>
      </nav>
    );
  }

  // ----------------------------------------------------------------------------
  // 3. PUBLIC WEB PORTAL HEADER: PURE MINIMALIST DESIGN
  // Clean, uncluttered, strictly in ONE line, zero horizontal scroll
  // ----------------------------------------------------------------------------
  const exploreLinks = [
    { href: "/map", label: t.nav.map },
    { href: "/graph", label: t.nav.graph },
    { href: "/stories", label: t.nav.stories },
    { href: "/media", label: t.nav.media },
    { href: "/kiosk", label: t.nav.kioskMode },
    { href: "/display", label: t.nav.displayWall },
    { href: "/admin", label: t.nav.admin },
  ];

  const isExploreActive = ["/map", "/graph", "/stories", "/media", "/admin"].some((p) =>
    pathname.startsWith(p)
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand: Clean Minimalist Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#0B2A6F] text-[#C8A24A] flex items-center justify-center font-serif font-black text-base shadow-xs group-hover:bg-[#12368c] transition-colors shrink-0">
              अ
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-sm sm:text-base text-zinc-900 dark:text-stone-100 tracking-tight leading-tight truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                {t.appName}
              </span>
            </div>
          </Link>

          {/* Center: Minimal Text Navigation Links (All in one line) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            <Link
              href="/search"
              className={`text-xs tracking-wide transition-colors ${
                pathname === "/search"
                  ? "text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                  : "text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white font-medium"
              }`}
            >
              {t.nav.search}
            </Link>

            <Link
              href="/timeline"
              className={`text-xs tracking-wide transition-colors ${
                pathname === "/timeline"
                  ? "text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                  : "text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white font-medium"
              }`}
            >
              {t.nav.timeline}
            </Link>

            {/* Explore Dropdown: Minimal & Clean */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setExploreOpen(!exploreOpen)}
                className={`flex items-center gap-1 text-xs tracking-wide transition-colors cursor-pointer ${
                  isExploreActive
                    ? "text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                    : "text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white font-medium"
                }`}
                aria-expanded={exploreOpen}
              >
                <span>{t.nav.explore}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreOpen && (
                <div className="absolute left-0 mt-2.5 w-48 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg p-1.5 z-50 animate-in fade-in duration-100 space-y-0.5">
                  {exploreLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setExploreOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                          isActive
                            ? "bg-stone-100 dark:bg-stone-800 text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                            : "text-zinc-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/60 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/quotes/verify"
              className={`text-xs tracking-wide transition-colors ${
                pathname === "/quotes/verify"
                  ? "text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                  : "text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white font-medium"
              }`}
            >
              {t.nav.quoteVerifier}
            </Link>

            <Link
              href="/assistant"
              className={`text-xs tracking-wide transition-colors ${
                pathname === "/assistant"
                  ? "text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                  : "text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white font-medium"
              }`}
            >
              {t.nav.assistant}
            </Link>
          </nav>

          {/* Right: Clean Minimal Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Language Switcher (Text Dividers) */}
            <div className="hidden sm:flex items-center text-xs text-zinc-500 dark:text-stone-400 font-medium">
              {(["en", "hi", "mr"] as const).map((l, idx) => (
                <React.Fragment key={l}>
                  {idx > 0 && <span className="text-stone-300 dark:text-stone-700 mx-1.5">/</span>}
                  <button
                    onClick={() => setLanguage(l)}
                    className={`cursor-pointer transition-colors ${
                      language === l
                        ? "text-[#0B2A6F] dark:text-[#C8A24A] font-bold"
                        : "hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {l === "en" ? "EN" : l === "hi" ? "हिन्दी" : "मराठी"}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <span className="hidden sm:inline-block w-px h-4 bg-stone-200 dark:bg-stone-800" />

            {/* Accessibility Button */}
            <button
              onClick={() => setIsAccessibilityOpen(true)}
              className="text-zinc-500 hover:text-zinc-900 dark:text-stone-400 dark:hover:text-white transition-colors p-1 cursor-pointer"
              title={t.accessibility.title}
              aria-label={t.accessibility.title}
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* My Collection Icon */}
            <Link
              href="/collections"
              className="relative text-zinc-500 hover:text-zinc-900 dark:text-stone-400 dark:hover:text-white transition-colors p-1"
              title={t.nav.myCollection}
              aria-label={t.nav.myCollection}
            >
              <Bookmark className="w-4 h-4" />
              {myCollection.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#0B2A6F] text-white text-[9px] font-bold flex items-center justify-center">
                  {myCollection.length}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-700 dark:text-stone-300 hover:text-zinc-900 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors rounded-xl active:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Minimalist Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white/98 dark:bg-stone-950/98 backdrop-blur-md px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <span className="text-xs text-zinc-500 font-semibold">Language / भाषा:</span>
            <div className="flex gap-1.5">
              {(["en", "hi", "mr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`text-xs min-h-[36px] px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    language === l
                      ? "text-[#0B2A6F] bg-stone-100 border border-stone-300"
                      : "text-zinc-600 hover:text-zinc-900 bg-stone-50"
                  }`}
                >
                  {l === "en" ? "EN" : l === "hi" ? "हिन्दी" : "मराठी"}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="space-y-1">
            {[
              { href: "/search", label: t.nav.search },
              { href: "/timeline", label: t.nav.timeline },
              { href: "/map", label: t.nav.map },
              { href: "/graph", label: t.nav.graph },
              { href: "/stories", label: t.nav.stories },
              { href: "/media", label: t.nav.media },
              { href: "/assistant", label: t.nav.assistant },
              { href: "/quotes/verify", label: t.nav.quoteVerifier },
              { href: "/kiosk", label: t.nav.kioskMode },
              { href: "/display", label: t.nav.displayWall },
              { href: "/admin", label: t.nav.admin },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#0B2A6F] bg-stone-100 dark:bg-stone-800 font-bold border-l-4 border-primary"
                      : "text-zinc-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
