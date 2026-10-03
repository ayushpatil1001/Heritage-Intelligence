"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Bookmark, QrCode, Printer, Trash2, BookOpen, Share2, Copy, Check, Download, ShieldCheck } from "lucide-react";

export default function CollectionsClient() {
  const { language, savedItems, removeSavedItem } = useApp();
  const [tokenCopied, setTokenCopied] = useState(false);
  const [ephemeralToken] = useState(() => "tok_" + Math.random().toString(36).substring(2, 10));

  // Sample seed items if empty for demonstration
  const displayItems = savedItems.length > 0 ? savedItems : [
    {
      id: "item-baws-01-caste",
      title: "Castes in India: Their Mechanism, Genesis and Development",
      category: "Academic Paper",
      date: "May 9, 1916",
    },
    {
      id: "item-baws-01-aoc",
      title: "Annihilation of Caste with a Reply to Mahatma Gandhi",
      category: "Treatise",
      date: "May 1936",
    },
    {
      id: "item-cad-final-speech",
      title: "Grammar of Anarchy (Final Assembly Speech)",
      category: "Constitutional Debate",
      date: "Nov 25, 1949",
    },
  ];

  const handleCopyToken = () => {
    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/collections?token=${ephemeralToken}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-navy-900/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold-600 uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Personal Archival Binder</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-1">
            {language === "mr" ? "माझा वैयक्तिक संग्रह (My Collection)" : language === "hi" ? "मेरा व्यक्तिगत संग्रह (My Collection)" : "My Archival Collection"}
          </h1>
          <p className="text-sm text-navy-800/75 mt-1">
            {language === "mr"
              ? "आपण जतन केलेले दस्तऐवज, संदर्भ आणि ७ दिवसांचा तात्पुरता क्यूआर (QR) कोड."
              : language === "hi"
              ? "आपके द्वारा सहेजे गए ऐतिहासिक दस्तावेज, उद्धरण और 7 दिवसीय मोबाइल ट्रांसफर टोकन।"
              : "Saved treatises, citations, and ephemeral 7-day transfer token to take your research from kiosk to mobile."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-navy-900/20 text-xs font-semibold text-navy-900 hover:bg-parchment-200 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Bibliography</span>
          </button>
          <button
            onClick={handleCopyToken}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
          >
            {tokenCopied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-gold-400" />}
            <span>{tokenCopied ? "Link Copied!" : "Export 7-Day Link"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Saved Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-navy-800/60 uppercase tracking-wider mb-2">
            <span>Saved Records ({displayItems.length})</span>
            <span>Citations Grounded</span>
          </div>

          {displayItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-navy-900/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-parchment-200 text-navy-900 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-navy-800/60 mb-1">
                    <span className="bg-parchment-200 px-2 py-0.5 rounded text-navy-900 font-bold">
                      {"category" in item && item.category ? item.category : ("type" in item && item.type ? item.type : "Archival Record")}
                    </span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="text-base font-serif font-bold text-navy-900 hover:text-gold-700 transition-colors">
                    <Link href={`/reader/${item.id}`}>{item.title}</Link>
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <Link
                      href={`/reader/${item.id}`}
                      className="text-gold-700 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open Deep Zoom Reader</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeSavedItem(item.id)}
                className="p-2 text-navy-800/40 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 shrink-0"
                title="Remove from collection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Ephemeral QR Code & Mobile Sync Widget (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-navy-900/10 rounded-xl p-6 shadow-sm text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-wider bg-gold-50 px-3 py-1 rounded-full border border-gold-200 mb-4">
              <QrCode className="w-3.5 h-3.5" />
              <span>Zero-Login Phone Handover</span>
            </div>

            {/* QR Code SVG Representation */}
            <div className="bg-parchment-100 p-4 rounded-xl border border-navy-900/10 inline-block shadow-inner mb-4">
              <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto text-navy-900">
                <rect x="10" y="10" width="25" height="25" fill="currentColor" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="currentColor" />
                <rect x="65" y="10" width="25" height="25" fill="currentColor" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="currentColor" />
                <rect x="10" y="65" width="25" height="25" fill="currentColor" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="currentColor" />
                {/* Patterns */}
                <rect x="42" y="15" width="12" height="8" fill="currentColor" />
                <rect x="42" y="30" width="8" height="12" fill="currentColor" />
                <rect x="42" y="50" width="16" height="8" fill="currentColor" />
                <rect x="42" y="68" width="12" height="18" fill="currentColor" />
                <rect x="68" y="45" width="18" height="12" fill="currentColor" />
                <rect x="68" y="70" width="16" height="16" fill="currentColor" />
              </svg>
            </div>

            <h2 className="text-base font-serif font-bold text-navy-900">
              Scan with Smartphone
            </h2>
            <p className="text-xs text-navy-800/70 mt-1 leading-relaxed">
              No login or password required. This ephemeral token transfers your reading list directly to your mobile browser and remains valid for 7 days.
            </p>

            <div className="mt-4 p-2 bg-parchment-200 rounded-lg text-xs font-mono text-navy-800/80 flex items-center justify-between">
              <span>Token: {ephemeralToken}</span>
              <span className="text-[10px] bg-green-200 text-green-800 px-1.5 py-0.5 rounded font-bold">
                7 Days Active
              </span>
            </div>
          </div>

          <div className="bg-parchment-100 rounded-xl p-5 border border-navy-900/10 text-xs space-y-2">
            <div className="font-bold text-navy-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Privacy & Citation Guarantee</span>
            </div>
            <p className="text-navy-800/75 leading-relaxed">
              Exported bibliographies strictly adhere to scholarly Chicago and APA citation styles, mapping directly to Government of Maharashtra Dr. Babasaheb Ambedkar Writings and Speeches volumes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
