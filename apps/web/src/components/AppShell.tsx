"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { KioskIdleGuard } from "@/components/KioskIdleGuard";
import { SurfaceFloatingSwitcher } from "@/components/SurfaceFloatingSwitcher";
import { useApp } from "@/context/AppContext";

import { KioskTopBar } from "@/components/KioskTopBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, t, kioskMode } = useApp();

  const isDisplay = pathname.startsWith("/display");
  const isKiosk = pathname.startsWith("/kiosk") || kioskMode;

  // --------------------------------------------------------------------------
  // 1. DISPLAY WALL MODE (1920x1080 Ambient Museum Video Wall)
  // Full-bleed screen, no public navbar, no public footer
  // --------------------------------------------------------------------------
  if (isDisplay) {
    return (
      <div className="w-full min-h-screen bg-navy-950 overflow-x-hidden selection:bg-gold-500 selection:text-navy-950">
        <main className="w-full min-h-screen">{children}</main>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. KIOSK TOUCH SURFACE MODE (1080x1920 Portrait Touch Kiosk)
  // Full portrait canvas, persistent top back bar on subpages, bottom touch dock
  // --------------------------------------------------------------------------
  if (isKiosk) {
    const isSubPage = !pathname.startsWith("/kiosk") || pathname.length > 6;
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between overflow-x-hidden select-none pb-24 selection:bg-accent selection:text-primary">
        {isSubPage && <KioskTopBar />}
        <main className="flex-1 w-full max-w-[1080px] mx-auto p-4 sm:p-6">
          {children}
        </main>
        <Navigation />
        <AccessibilityPanel />
        <KioskIdleGuard />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 3. STANDARD PUBLIC WEB PORTAL & RESEARCH CONSOLE
  // Responsive navigation, container constraints, institutional 4-column footer
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col archival-texture selection:bg-accent selection:text-primary">
      <Navigation />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        {children}
      </main>
      <AccessibilityPanel />
      <KioskIdleGuard />
      <SurfaceFloatingSwitcher />

      {/* Institutional Sitemapped Footer with Internal Links */}
      <footer className="w-full bg-[#0B2A6F] text-white border-t border-[#C8A24A]/30 py-10 sm:py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Column 1: Archival Works */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                {t.footer.treatisesTitle}
              </h2>
              <ul className="space-y-1.5 sm:space-y-2 text-stone-200">
                <li>
                  <Link href="/reader/item-baws-01-caste" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {language === "mr" ? "कास्ट्स इन इंडिया (१९१६)" : language === "hi" ? "कास्ट्स इन इंडिया (1916)" : "Castes in India (1916)"}
                  </Link>
                </li>
                <li>
                  <Link href="/reader/item-baws-01-aoc" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {language === "mr" ? "जातीचे निर्मूलन (१९३६)" : language === "hi" ? "जाति का विनाश (1936)" : "Annihilation of Caste (1936)"}
                  </Link>
                </li>
                <li>
                  <Link href="/reader/item-cad-art32" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {language === "mr" ? "कलम ३२ संविधान सभा चर्चा" : language === "hi" ? "अनुच्छेद 32 संविधान सभा बहस" : "Article 32 Debates (CAD Vol. VII)"}
                  </Link>
                </li>
                <li>
                  <Link href="/reader/item-baws-06-rupee" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {language === "mr" ? "रुपयाची समस्या (१९२३)" : language === "hi" ? "रुपये की समस्या (1923)" : "The Problem of the Rupee (1923)"}
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-[#C8A24A] transition-colors py-1 inline-block font-semibold text-gold-300">
                    {t.footer.allTreatises}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Exploration & Visualizations */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                {t.footer.interactiveTitle}
              </h2>
              <ul className="space-y-1.5 sm:space-y-2 text-stone-200">
                <li>
                  <Link href="/timeline" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.timeline}
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.map}
                  </Link>
                </li>
                <li>
                  <Link href="/graph" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.graph}
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.stories}
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.media}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Verification & Tools */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                {t.footer.researchTitle}
              </h2>
              <ul className="space-y-1.5 sm:space-y-2 text-stone-200">
                <li>
                  <Link href="/assistant" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.assistant}
                  </Link>
                </li>
                <li>
                  <Link href="/quotes/verify" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.quoteVerifier}
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.myCollection}
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.admin}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Museum Hardware Surfaces & Technical */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                {t.footer.surfacesTitle}
              </h2>
              <ul className="space-y-1.5 sm:space-y-2 text-stone-200">
                <li>
                  <Link href="/kiosk" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.kioskMode}
                  </Link>
                </li>
                <li>
                  <Link href="/display" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.nav.displayWall}
                  </Link>
                </li>
                <li>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.footer.sitemap}
                  </a>
                </li>
                <li>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A24A] transition-colors py-1 inline-block">
                    {t.footer.robots}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Institutional Attribution Line */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-stone-300">
            <div>
              <span className="font-semibold text-white">{t.footer.institution}</span>
              <span className="mx-2">•</span>
              <span>{t.footer.govMinistry}</span>
            </div>
            <div>
              <span>{t.footer.hackathonTag}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
