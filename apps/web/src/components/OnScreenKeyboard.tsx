"use client";

import React, { useState } from "react";
import { Delete, CornerDownLeft, Globe, X } from "lucide-react";

interface OnScreenKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  isOpen: boolean;
  onClose?: () => void;
}

export function OnScreenKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
  isOpen,
  onClose,
}: OnScreenKeyboardProps) {
  const [layout, setLayout] = useState<"en" | "devanagari">("en");

  if (!isOpen) return null;

  const englishRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  const devanagariRows = [
    ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ"],
    ["क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ"],
    ["ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ"],
    ["ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"]
  ];

  const rows = layout === "en" ? englishRows : devanagariRows;

  return (
    <div className="w-full max-w-4xl mx-auto bg-stone-100/95 backdrop-blur-md rounded-2xl border-2 border-stone-300 p-3 shadow-2xl mt-4 select-none">
      <div className="flex justify-between items-center px-2 pb-2 mb-1 border-b border-stone-300">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
          Touch On-Screen Keyboard ({layout === "en" ? "English" : "देवनागरी"})
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLayout(layout === "en" ? "devanagari" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-primary-hover transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{layout === "en" ? "Switch to देवनागरी" : "Switch to English"}</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 active:bg-stone-400 text-zinc-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              title="Close Keyboard"
              aria-label="Close On-Screen Keyboard"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5">
            {row.map((char) => (
              <button
                key={char}
                type="button"
                onClick={() => onKeyPress(char)}
                className="h-12 min-w-[42px] px-2.5 rounded-xl bg-white hover:bg-stone-50 active:bg-primary active:text-white border border-stone-300 shadow-sm text-sm sm:text-base font-bold text-zinc-800 transition-transform active:scale-95 cursor-pointer flex items-center justify-center"
              >
                {char}
              </button>
            ))}
          </div>
        ))}

        {/* Action Row */}
        <div className="flex justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={onBackspace}
            className="h-12 px-6 rounded-xl bg-stone-200 hover:bg-stone-300 text-zinc-700 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <Delete className="w-4 h-4" />
            <span>Backspace</span>
          </button>
          <button
            type="button"
            onClick={() => onKeyPress(" ")}
            className="h-12 flex-1 max-w-xs rounded-xl bg-white hover:bg-stone-50 border border-stone-300 font-bold text-xs shadow-sm active:scale-95 cursor-pointer"
          >
            Space
          </button>
          <button
            type="button"
            onClick={onEnter}
            className="h-12 px-8 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <span>Search</span>
            <CornerDownLeft className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnScreenKeyboard;
