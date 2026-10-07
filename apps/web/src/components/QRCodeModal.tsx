"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, Smartphone, Download, ExternalLink, QrCode } from "lucide-react";
import { AshokaChakra } from "./HeritageSymbols";
import { useApp } from "@/context/AppContext";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  url,
  title,
  subtitle,
  badge = "Send to Mobile Device",
}: QRCodeModalProps) {
  const { language } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, {
        width: 360,
        margin: 2,
        color: {
          dark: "#0B2A6F",
          light: "#FFFFFF",
        },
      })
        .then((dataUri) => setQrDataUrl(dataUri))
        .catch((err) => console.error("QR Code generation error:", err));
    }
  }, [isOpen, url]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `archive-qr-${title.replace(/[^a-z0-9]/gi, "_").toLowerCase().slice(0, 30)}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const getInstructions = () => {
    if (language === "hi") {
      return "अपने स्मार्टफोन के कैमरे या स्कैनर से क्यूआर कोड को स्कैन करें और इस ऐतिहासिक दस्तावेज को अपने मोबाइल पर पढ़ें।";
    }
    if (language === "mr") {
      return "आपल्या स्मार्टफोनच्या कॅमेऱ्याने हा QR कोड स्कॅन करा आणि हा ऐतिहासिक दस्तऐवज आपल्या फोनवर सहजपणे वाचा.";
    }
    return "Scan this QR code with your mobile camera to instantly open and read this authentic archival document on your smartphone.";
  };

  const getBadgeLabel = () => {
    if (language === "hi") return "स्मार्टफोन पर भेजें";
    if (language === "mr") return "मोबाईलवर पाठवा";
    return badge;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl border border-stone-300 shadow-2xl p-6 sm:p-7 overflow-hidden text-center space-y-5 animate-in zoom-in-95 duration-200"
      >
        {/* Institutional Watermark Background */}
        <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none">
          <AshokaChakra size={200} className="text-primary" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
          <Smartphone className="w-3.5 h-3.5 text-accent" />
          <span>{getBadgeLabel()}</span>
        </div>

        {/* Document Title */}
        <div className="space-y-1">
          <h2
            id="qr-modal-title"
            className="text-lg font-serif font-bold text-primary leading-snug line-clamp-2 px-2"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-3.5 bg-white rounded-2xl border-2 border-stone-300 shadow-inner relative group">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Document QR Code"
                className="w-56 h-56 rounded-xl object-contain"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-stone-100 rounded-xl text-zinc-400">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center border border-accent/40">
                <AshokaChakra size={24} className="text-primary" />
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-600 mt-3 max-w-xs leading-relaxed font-sans">
            {getInstructions()}
          </p>
        </div>

        {/* Direct Link & Copy Action */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-100 border border-stone-200 text-xs">
          <span className="font-mono text-[11px] text-zinc-600 truncate flex-1 text-left px-2 select-all">
            {url}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-zinc-800 font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-accent" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-stone-200 text-xs">
          <button
            onClick={handleDownloadQR}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-primary font-medium cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-accent" />
            <span>Save QR Image</span>
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary hover:text-primary-hover font-bold cursor-pointer transition-colors"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </a>
        </div>
      </div>
    </div>
  );
}
