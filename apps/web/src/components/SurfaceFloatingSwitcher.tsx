"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Tv } from "lucide-react";

export function SurfaceFloatingSwitcher() {
  const pathname = usePathname();

  // Hide when already on full-bleed display wall or dedicated kiosk page
  if (pathname.startsWith("/display") || pathname.startsWith("/kiosk")) {
    return null;
  }

  return (
    <aside
      aria-label="Exhibition Surfaces Quick Switcher"
      className="fixed bottom-6 right-6 z-40 flex items-center bg-[#0B2A6F]/95 text-white backdrop-blur-md rounded-2xl p-1.5 shadow-2xl border border-[#C8A24A]/40 transition-all hover:border-[#C8A24A] hover:shadow-lg select-none"
    >
      <Link
        href="/kiosk"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/15 active:bg-white/20 transition-all group"
        title="Launch Museum Kiosk Mode (1080×1920 Touch Surface)"
      >
        <div className="w-6 h-6 rounded-lg bg-white/10 group-hover:bg-[#C8A24A] group-hover:text-navy-950 flex items-center justify-center transition-colors">
          <Monitor className="w-3.5 h-3.5" />
        </div>
        <span className="tracking-wide font-medium">Kiosk</span>
      </Link>

      <span className="w-px h-5 bg-white/20" />

      <Link
        href="/display"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/15 active:bg-white/20 transition-all group"
        title="Launch Grand Display Wall (1920×1080 Ambient Showcase)"
      >
        <div className="w-6 h-6 rounded-lg bg-white/10 group-hover:bg-[#C8A24A] group-hover:text-navy-950 flex items-center justify-center transition-colors">
          <Tv className="w-3.5 h-3.5" />
        </div>
        <span className="tracking-wide font-medium">Wall</span>
      </Link>
    </aside>
  );
}
