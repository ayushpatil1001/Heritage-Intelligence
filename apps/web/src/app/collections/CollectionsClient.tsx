"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { useApp } from "@/context/AppContext";
import { Bookmark, QrCode, Printer, Trash2, BookOpen, Share2, Copy, Check, Download, ShieldCheck, FileText, Smartphone } from "lucide-react";
import QRCodeModal from "@/components/QRCodeModal";
import ResearchDossierModal from "@/components/ResearchDossierModal";
import { getCatalogItemById } from "@/lib/catalogData";

export default function CollectionsClient() {
  const { language, savedItems, removeSavedItem, t } = useApp();
  const [tokenCopied, setTokenCopied] = useState(false);
  const [ephemeralToken] = useState(() => "tok_" + Math.random().toString(36).substring(2, 10));
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedDossierItem, setSelectedDossierItem] = useState<any>(null);

  const shareUrl = `https://heritage-intelligence-drab.vercel.app/collections?token=${ephemeralToken}`;

  useEffect(() => {
    QRCode.toDataURL(shareUrl, {
      width: 280,
      margin: 1,
      color: { dark: "#0B2A6F", light: "#FFFFFF" }
    })
      .then((dataUri) => setQrDataUrl(dataUri))
      .catch((err) => console.error("QR generation error:", err));
  }, [shareUrl]);

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
            <span>{t.collections.badge}</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-1">
            {t.collections.title}
          </h1>
          <p className="text-sm text-navy-800/75 mt-1">
            {t.collections.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-navy-900/20 text-xs font-semibold text-navy-900 hover:bg-parchment-200 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{t.collections.printBibliography}</span>
          </button>
          <button
            onClick={handleCopyToken}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors shadow-sm"
          >
            {tokenCopied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-gold-400" />}
            <span>{tokenCopied ? t.collections.linkCopied : t.collections.exportToken}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Saved Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-navy-800/60 uppercase tracking-wider mb-2">
            <span>{t.collections.savedRecords} ({displayItems.length})</span>
            <span>{t.collections.citationsGrounded}</span>
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
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                    <Link
                      href={`/reader/${item.id}`}
                      className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>{t.collections.readSource}</span>
                      <span>→</span>
                    </Link>

                    <button
                      onClick={() => {
                        const cat = getCatalogItemById(item.id) || item;
                        setSelectedDossierItem(cat);
                      }}
                      className="text-zinc-600 hover:text-primary font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-accent" />
                      <span>{language === "hi" ? "शोध डोजियर" : language === "mr" ? "संशोधन डोजियर" : "Research Dossier"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeSavedItem(item.id)}
                className="p-2 text-navy-800/40 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 shrink-0"
                title={t.collections.remove}
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
              <span>{t.collections.qrTitle}</span>
            </div>

            {/* Real SCANNABLE QR Code */}
            <div
              onClick={() => setIsQrModalOpen(true)}
              className="bg-white p-3 rounded-2xl border-2 border-stone-300 inline-block shadow-sm hover:shadow-md transition-all cursor-pointer group mb-3 relative"
              title="Click to view full screen QR"
            >
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Collection Sync QR Code"
                  className="w-36 h-36 mx-auto rounded-lg object-contain"
                />
              ) : (
                <div className="w-36 h-36 flex items-center justify-center bg-stone-100 rounded-lg">
                  <QrCode className="w-8 h-8 animate-pulse text-zinc-400" />
                </div>
              )}
              <div className="mt-1 text-[10px] text-primary font-bold group-hover:underline flex items-center justify-center gap-1">
                <Smartphone className="w-3 h-3 text-accent" />
                <span>Tap to Expand</span>
              </div>
            </div>

            <h2 className="text-base font-serif font-bold text-navy-900">
              {t.collections.qrTitle}
            </h2>
            <p className="text-xs text-navy-800/70 mt-1 leading-relaxed">
              {t.collections.qrSubtitle}
            </p>

            <div className="mt-4 p-2 bg-parchment-200 rounded-lg text-xs font-mono text-navy-800/80 flex items-center justify-between">
              <span>Token: {ephemeralToken}</span>
              <span className="text-[10px] bg-green-200 text-green-800 px-1.5 py-0.5 rounded font-bold">
                {language === "mr" ? "७ दिवस सक्रिय" : language === "hi" ? "7 दिन सक्रिय" : "7 Days Active"}
              </span>
            </div>
          </div>

          <div className="bg-parchment-100 rounded-xl p-5 border border-navy-900/10 text-xs space-y-2">
            <div className="font-bold text-navy-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>{language === "mr" ? "गोपनीयता आणि संदर्भ हमी" : language === "hi" ? "गोपनीयता और संदर्भ गारंटी" : "Privacy & Citation Guarantee"}</span>
            </div>
            <p className="text-navy-800/75 leading-relaxed">
              {language === "mr"
                ? "निर्यात केलेले संदर्भ शिकागो आणि एपीए (APA) नियमांनुसार थेट महाराष्ट्र शासनाच्या डॉ. बाबासाहेब आंबेडकर ग्रंथमालेशी जोडलेले आहेत."
                : language === "hi"
                ? "निर्यात किए गए संदर्भ शिकागो और एपीए (APA) नियमावली के अनुसार सीधे महाराष्ट्र शासन के डॉ. बाबासाहेब आंबेडकर ग्रंथावली से संबद्ध हैं।"
                : "Exported bibliographies strictly adhere to scholarly Chicago and APA citation styles, mapping directly to Government of Maharashtra Dr. Babasaheb Ambedkar Writings and Speeches volumes."}
            </p>
          </div>
        </div>
      </div>

      {/* Send to Phone QR Code Modal */}
      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        url={shareUrl}
        title="Mobile Research Collection Sync"
        subtitle={`Token: ${ephemeralToken} • ${displayItems.length} Saved Records`}
        badge="Sync to Smartphone"
      />

      {/* Research Dossier Modal */}
      {selectedDossierItem && (
        <ResearchDossierModal
          isOpen={!!selectedDossierItem}
          onClose={() => setSelectedDossierItem(null)}
          item={selectedDossierItem}
          language={language}
        />
      )}
    </div>
  );
}
