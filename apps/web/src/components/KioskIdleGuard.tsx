"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { AlertCircle, RotateCcw, Check } from "lucide-react";

export function KioskIdleGuard() {
  const { isIdleWarning, idleCountdown, resetIdleTimer, clearCollection, t } = useApp();

  if (!isIdleWarning) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="idle-warning-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-3xl border-4 border-accent shadow-2xl max-w-lg w-full p-8 text-center space-y-6 animate-in fade-in zoom-in duration-200">
        <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center mx-auto text-3xl font-bold animate-pulse">
          {idleCountdown}
        </div>

        <div className="space-y-2">
          <h2 id="idle-warning-title" className="text-2xl font-serif font-bold text-primary">
            {t.kiosk.idleWarning}
          </h2>
          <p className="text-sm text-zinc-600">
            {t.kiosk.idleCountdown.replace("{seconds}", idleCountdown.toString())}
          </p>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {t.kiosk.sessionWillReset}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={resetIdleTimer}
            className="flex-1 py-4 px-6 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-base shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Check className="w-5 h-5 text-accent" />
            <span>{t.kiosk.imStillHere}</span>
          </button>
          <button
            onClick={() => {
              clearCollection();
              window.location.href = "/kiosk";
            }}
            className="py-4 px-6 bg-stone-100 hover:bg-stone-200 text-zinc-700 rounded-2xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.kiosk.resetNow}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
