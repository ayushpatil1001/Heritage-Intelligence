"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Sliders, X, Check, Volume2, Eye, Move } from "lucide-react";

export function AccessibilityPanel() {
  const {
    t,
    isAccessibilityOpen,
    setIsAccessibilityOpen,
    highContrast,
    setHighContrast,
    textScale,
    setTextScale,
    reducedMotion,
    setReducedMotion,
    audioFirst,
    setAudioFirst,
    oneHandReach,
    setOneHandReach,
  } = useApp();

  if (!isAccessibilityOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-primary/20 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col p-5 sm:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0">
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 id="accessibility-title" className="text-lg sm:text-xl font-bold font-serif text-primary leading-tight">
                {t.accessibility.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500">WCAG 2.2 AA & GIGW 3.0 Compliant Architecture</p>
            </div>
          </div>
          <button
            onClick={() => setIsAccessibilityOpen(false)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-600 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto space-y-5 py-4 pr-1 -mr-1 flex-1">

        {/* Text Scaling */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
            {t.accessibility.textSize}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ["normal", t.accessibility.normal],
                ["large", t.accessibility.large],
                ["extraLarge", t.accessibility.extraLarge],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTextScale(val)}
                className={`py-3 px-3 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                  textScale === val
                    ? "border-primary bg-primary text-white shadow-xs"
                    : "border-stone-200 bg-stone-50 text-zinc-700 hover:bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="space-y-3 pt-2">
          {/* High Contrast */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 bg-stone-50">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-bold text-zinc-900 block">{t.accessibility.highContrast}</span>
                <span className="text-xs text-zinc-500">4.5:1 minimum contrast with inverted dark palettes</span>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                highContrast ? "bg-primary" : "bg-stone-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  highContrast ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 bg-stone-50">
            <div className="flex items-center gap-3">
              <Move className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-bold text-zinc-900 block">{t.accessibility.reducedMotion}</span>
                <span className="text-xs text-zinc-500">Disables parallax animations and camera pans</span>
              </div>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                reducedMotion ? "bg-primary" : "bg-stone-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  reducedMotion ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Audio-First Mode */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 bg-stone-50">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-bold text-zinc-900 block">{t.accessibility.audioFirst}</span>
                <span className="text-xs text-zinc-500">Auto-narrates documents and summaries via TTS</span>
              </div>
            </div>
            <button
              onClick={() => setAudioFirst(!audioFirst)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                audioFirst ? "bg-primary" : "bg-stone-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  audioFirst ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* One-Hand Reach Mode (Wheelchair & Ergonomic) */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 bg-stone-50">
            <div className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-bold text-zinc-900 block">{t.accessibility.oneHandReach}</span>
                <span className="text-xs text-zinc-500">Lowers all primary interactive zones for wheelchair accessibility</span>
              </div>
            </div>
            <button
              onClick={() => setOneHandReach(!oneHandReach)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                oneHandReach ? "bg-primary" : "bg-stone-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  oneHandReach ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={() => setIsAccessibilityOpen(false)}
            className="px-6 py-3 min-h-[44px] bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
          >
            {t.accessibility.close}
          </button>
        </div>
      </div>
    </div>
  );
}
