"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { KioskIdleGuard } from "@/components/KioskIdleGuard";
import { SurfaceFloatingSwitcher } from "@/components/SurfaceFloatingSwitcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplay = pathname.startsWith("/display");
  const isKiosk = pathname.startsWith("/kiosk");

  // --------------------------------------------------------------------------
  // 1. DISPLAY WALL MODE (1920x1080 Ambient Museum Video Wall)
  // Full-bleed screen, no public navbar, no public footer
  // --------------------------------------------------------------------------
  if (isDisplay) {
    return (
      <div className="w-full min-h-screen bg-navy-950 overflow-x-hidden selection:bg-gold-500 selection:text-navy-950">
        <main className="w-full min-h-screen">{children}</main>
        <KioskIdleGuard />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. KIOSK TOUCH SURFACE MODE (1080x1920 Portrait Touch Kiosk)
  // Full portrait canvas, dedicated touch controls, no public footer
  // --------------------------------------------------------------------------
  if (isKiosk) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between overflow-x-hidden select-none pb-24 selection:bg-accent selection:text-primary">
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
      <footer className="w-full bg-[#0B2A6F] text-white border-t border-[#C8A24A]/30 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1: Archival Works */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                Archival Treatises
              </h2>
              <ul className="space-y-2 text-stone-200">
                <li>
                  <Link href="/reader/item-baws-01-caste" className="hover:text-[#C8A24A] transition-colors">
                    Castes in India (1916)
                  </Link>
                </li>
                <li>
                  <Link href="/reader/item-baws-01-aoc" className="hover:text-[#C8A24A] transition-colors">
                    Annihilation of Caste (1936)
                  </Link>
                </li>
                <li>
                  <Link href="/reader/item-cad-art32" className="hover:text-[#C8A24A] transition-colors">
                    Article 32 Debates (CAD Vol. VII)
                  </Link>
                </li>
                <li>
                  <Link href="/reader/item-baws-06-rupee" className="hover:text-[#C8A24A] transition-colors">
                    The Problem of the Rupee (1923)
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-[#C8A24A] transition-colors">
                    All 30 Primary Works & Papers →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Exploration & Visualizations */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                Interactive Discovery
              </h2>
              <ul className="space-y-2 text-stone-200">
                <li>
                  <Link href="/timeline" className="hover:text-[#C8A24A] transition-colors">
                    1891–1956 Life Timeline
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-[#C8A24A] transition-colors">
                    Geospatial Heritage Map
                  </Link>
                </li>
                <li>
                  <Link href="/graph" className="hover:text-[#C8A24A] transition-colors">
                    Semantic Knowledge Graph
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:text-[#C8A24A] transition-colors">
                    Curated Exhibition Visual Essays
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="hover:text-[#C8A24A] transition-colors">
                    Audiovisual & WebVTT Speeches
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Verification & Tools */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                Grounded AI & Research
              </h2>
              <ul className="space-y-2 text-stone-200">
                <li>
                  <Link href="/assistant" className="hover:text-[#C8A24A] transition-colors">
                    Grounded AI Research Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/quotes/verify" className="hover:text-[#C8A24A] transition-colors">
                    Quotation Provenance Verifier
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-[#C8A24A] transition-colors">
                    Personal Collection & 7-Day QR
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-[#C8A24A] transition-colors">
                    Archivist Ingest & Fixity Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Museum Hardware Surfaces & Technical */}
            <div>
              <h2 className="text-sm font-serif font-bold text-[#C8A24A] uppercase tracking-wider mb-3">
                Exhibition Surfaces & SEO
              </h2>
              <ul className="space-y-2 text-stone-200">
                <li>
                  <Link href="/kiosk" className="hover:text-[#C8A24A] transition-colors">
                    1080×1920 Kiosk Mode
                  </Link>
                </li>
                <li>
                  <Link href="/display" className="hover:text-[#C8A24A] transition-colors">
                    1920×1080 Grand Display Wall
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="hover:text-[#C8A24A] transition-colors">
                    Sitemap XML
                  </Link>
                </li>
                <li>
                  <Link href="/robots.txt" className="hover:text-[#C8A24A] transition-colors">
                    Robots TXT
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Institutional Attribution Line */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-300">
            <div>
              <span className="font-semibold text-white">Dr. Ambedkar International Centre (DAIC)</span>
              <span className="mx-2">•</span>
              <span>Ministry of Social Justice and Empowerment, Government of India</span>
            </div>
            <div>
              <span>Smart India Hackathon 2026 • Problem Statement ID 26096</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
