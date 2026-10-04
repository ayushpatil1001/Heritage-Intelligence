"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { AshokaChakra } from "@/components/HeritageSymbols";
import {
  Sparkles, Maximize2, Minimize2, QrCode, ShieldCheck,
  Database, Users, BookOpen, ArrowRight, ArrowLeft,
  Calendar, Clock, CheckCircle2, ChevronRight, ChevronLeft,
  Play, Pause, Volume2, VolumeX
} from "lucide-react";

interface DisplayQuoteCard {
  quote: string;
  author: string;
  source: string;
  year: string;
  category: string;
  historicalContext: string;
}

interface DisplayQuoteCard {
  quote: string;
  quote_hi: string;
  quote_mr: string;
  author: string;
  author_hi: string;
  author_mr: string;
  source: string;
  source_hi: string;
  source_mr: string;
  year: string;
  category: string;
  category_hi: string;
  category_mr: string;
  historicalContext: string;
  historicalContext_hi: string;
  historicalContext_mr: string;
}

const EXHIBITION_QUOTES: DisplayQuoteCard[] = [
  {
    quote: "“Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality and fraternity as the principles of life.”",
    quote_hi: "“राजनीतिक लोकतंत्र तब तक नहीं टिक सकता जब तक कि उसके मूल में सामाजिक लोकतंत्र न हो। सामाजिक लोकतंत्र का क्या अर्थ है? इसका अर्थ है जीवन का वह तरीका जो स्वतंत्रता, समता और बंधुत्व को जीवन के सिद्धांतों के रूप में मान्यता देता है।”",
    quote_mr: "“राजकीय लोकशाहीच्या पायाशी जोपर्यंत सामाजिक लोकशाहीचे अधिष्ठान नसते, तोपर्यंत ती टिकू शकत नाही. सामाजिक लोकशाही म्हणजे काय? तर स्वातंत्र्य, समता आणि बंधुता यांना जीवनाची मूलतत्त्वे म्हणून स्वीकारणारा जीवनमार्ग.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "Constituent Assembly Debates, Vol. XI",
    source_hi: "संविधान सभा वादविवाद, खंड XI",
    source_mr: "संविधान सभा वादविवाद, खंड ११",
    year: "25/11/1949",
    category: "Constitutional Morality",
    category_hi: "संवैधानिक नैतिकता",
    category_mr: "घटनात्मक नैतिकता",
    historicalContext: "Concluding address on the adoption of the Constitution of India in Constitution Hall, New Delhi.",
    historicalContext_hi: "संविधान भवन, नई दिल्ली में भारत के संविधान को अंगीकार किए जाने पर अंतिम संबोधन।",
    historicalContext_mr: "संविधान सभागृह, नवी दिल्ली येथे भारतीय राज्यघटना स्वीकारण्यावेळचे ऐतिहासिक समारोपाचे भाषण.",
  },
  {
    quote: "“At Mahad, we do not want to go to the tank merely to drink water. We want to go to the tank to assert that we are human beings. Lost rights are never regained by begging, but by relentless struggle.”",
    quote_hi: "“महाड में हम केवल पानी पीने के लिए तालाब पर नहीं जा रहे हैं। हम यह सिद्ध करने जा रहे हैं कि हम भी मनुष्य हैं। छीने गए अधिकार कभी भी भीख मांगने से नहीं मिलते, बल्कि निरंतर संघर्ष से ही पुनः प्राप्त होते हैं।”",
    quote_mr: "“महाड येथे आपण केवळ पाणी पिण्यासाठी चवदार तळ्यावर जात नाही आहोत. आपणही मानवी व्यक्ती आहोत हे सिद्ध करण्यासाठी आपण जात आहोत. गमावलेले हक्क याचना करून नव्हे, तर अविरत संघर्षानेच परत मिळतात.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "Speech to the Depressed Classes, Mahad Satyagraha",
    source_hi: "महाड सत्याग्रह भाषण, 20/03/1927",
    source_mr: "महाड सत्याग्रह भाषण, २०/०३/१९२७",
    year: "20/03/1927",
    category: "Human Rights & Civil Dignity",
    category_hi: "मानवाधिकार और नागरिक सम्मान",
    category_mr: "मानवी हक्क आणि नागरिक सन्मान",
    historicalContext: "Historic declaration asserting equal civic access to Chavdar Lake public drinking water.",
    historicalContext_hi: "चवदार तालाब के सार्वजनिक पेयजल के समान नागरिक अधिकार की ऐतिहासिक घोषणा।",
    historicalContext_mr: "चवदार तळ्याच्या सार्वजनिक पिण्याच्या पाण्याचा समान नागरी हक्क प्रस्थापित करणारी ऐतिहासिक घोषणा.",
  },
  {
    quote: "“The trade of a country depends upon the stability of its currency. A fluctuating rupee is a tax on industry and commerce, and the worst enemy of social justice.”",
    quote_hi: "“किसी देश का व्यापार उसकी मुद्रा की स्थिरता पर निर्भर करता है। अस्थिर रुपया उद्योग और व्यापार पर कर की तरह है, और सामाजिक न्याय का सबसे बड़ा शत्रु है।”",
    quote_mr: "“कोणत्याही देशाचा व्यापार त्याच्या चलनातील स्थिरतेवर अवलंबून असतो. अस्थिर रुपया हा उद्योग आणि व्यापारावरील छुपा कर असून सामाजिक न्यायाचा सर्वात मोठा शत्रू आहे.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "The Problem of the Rupee: Its Origin and Its Solution",
    source_hi: "रुपये की समस्या: इसका उद्भव और समाधान",
    source_mr: "रुपयाची समस्या: तिचे मूळ आणि निवारण",
    year: "01/05/1923",
    category: "Economics & Monetary Policy",
    category_hi: "अर्थशास्त्र और मौद्रिक नीति",
    category_mr: "अर्थशास्त्र आणि चलननीती",
    historicalContext: "Doctoral dissertation submitted to London School of Economics, foundational to RBI's central banking framework.",
    historicalContext_hi: "लंदन स्कूल ऑफ इकोनॉमिक्स में प्रस्तुत डॉक्टरेट शोध प्रबंध, जो आरबीआई की केंद्रीय बैंकिंग का आधार बना।",
    historicalContext_mr: "लंडन स्कूल ऑफ इकॉनॉमिक्समध्ये सादर केलेला डॉक्टरेट प्रबंध, जो रिझर्व्ह बँक ऑफ इंडियाच्या स्थापनेचा पाया ठरला.",
  },
  {
    quote: "“Religion must mainly be a matter of principles only. It cannot be a matter of rules. The moment it degenerates into rules, it ceases to be religion, as it kills moral responsibility.”",
    quote_hi: "“धर्म मुख्य रूप से केवल सिद्धांतों का विषय होना चाहिए। यह नियमों का विषय नहीं हो सकता। जिस क्षण यह नियमों में बदल जाता है, यह धर्म नहीं रह जाता, क्योंकि यह नैतिक जिम्मेदारी को समाप्त कर देता है।”",
    quote_mr: "“धर्म हा प्रामुख्याने तत्त्वांचाच विषय असावा. तो नियमांचा संच असू शकत नाही. ज्या क्षणी तो नियमांत रूपांतरित होतो, त्या क्षणी तो धर्म उरत नाही, कारण तो नैतिक जबाबदारी नष्ट करतो.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "Annihilation of Caste, Section 25",
    source_hi: "जाति का विनाश, खंड 25",
    source_mr: "जातीचे निर्मूलन, खंड २५",
    year: "15/05/1936",
    category: "Philosophy of Liberation",
    category_hi: "मुक्ति का दर्शन",
    category_mr: "मुक्तीचे तत्त्वज्ञान",
    historicalContext: "Philosophical treatise prepared for the Jat-Pat-Todak Mandal of Lahore.",
    historicalContext_hi: "लाहौर के जात-पात तोड़क मंडल के लिए तैयार किया गया दार्शनिक शोध-ग्रंथ।",
    historicalContext_mr: "लाहोरच्या जात-पात तोडक मंडळासाठी तयार केलेला क्रांतीकारी वैचारिक ग्रंथ.",
  },
  {
    quote: "“I measure the progress of a community by the degree of progress which women have achieved. There can be no social transformation where women remain subordinate.”",
    quote_hi: "“मैं किसी समुदाय की प्रगति को महिलाओं द्वारा हासिल की गई प्रगति की मात्रा से मापता हूँ। जहाँ महिलाएँ पराधीन रहती हैं वहाँ कोई सामाजिक परिवर्तन नहीं हो सकता।”",
    quote_mr: "“एखाद्या समाजाची प्रगती मी त्या समाजातील स्त्रियांनी केलेल्या प्रगतीवरून मोजतो. जिथे स्त्रिया दुय्यम राहतात तिथे कोणताही सामाजिक बदल घडून येऊ शकत नाही.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "All-India Depressed Classes Women's Conference, Nagpur",
    source_hi: "अखिल भारतीय दलित महिला सम्मेलन, नागपुर",
    source_mr: "अखिल भारतीय दलित महिला परिषद, नागपूर",
    year: "20/07/1942",
    category: "Gender Justice & Equality",
    category_hi: "लैंगिक न्याय और समानता",
    category_mr: "स्त्री सन्मान आणि समता",
    historicalContext: "Address to an assembly of over 25,000 women asserting education and economic self-determination.",
    historicalContext_hi: "नागपुर में 25,000 से अधिक महिलाओं के ऐतिहासिक सम्मेलन को संबोधित करते हुए भाषण।",
    historicalContext_mr: "नागपूर येथे २५,००० पेक्षा अधिक स्त्रियांच्या ऐतिहासिक परिषदेला मार्गदर्शन करताना केलेले भाषण.",
  },
];

export default function DisplayClient() {
  const { language, t } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1420);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-advance quote card every 10 seconds with progress tick (pauses when user holds)
  useEffect(() => {
    if (isPaused) return;

    const interval = 100;
    const total = 10000;
    const step = (interval / total) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % EXHIBITION_QUOTES.length);
          setVisitorCount((c) => c + Math.floor(Math.random() * 2));
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeIdx, isPaused]);

  // Web Speech API Ambient Narration
  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const currentQuote = EXHIBITION_QUOTES[activeIdx];
      const textToRead = `${currentQuote.quote}. Stated by ${currentQuote.author}, from ${currentQuote.source}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeIdx]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Keyboard navigation for wall exhibition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleNext = () => {
    setProgress(0);
    setActiveIdx((prev) => (prev + 1) % EXHIBITION_QUOTES.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setActiveIdx((prev) => (prev - 1 + EXHIBITION_QUOTES.length) % EXHIBITION_QUOTES.length);
  };

  const current = EXHIBITION_QUOTES[activeIdx];

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden select-none">
      {/* Background Radial Glow & Rotating Ashoka Chakra Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B2A6F]/50 via-navy-950 to-black opacity-90 pointer-events-none" />
      <div className="absolute -right-20 -bottom-24 opacity-5 pointer-events-none">
        <AshokaChakra size={600} className="text-white" animate={true} />
      </div>

      {/* Top Header: Brand, Telemetry, and Fullscreen / Exit Controls */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-4 sm:pb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center font-serif font-black text-xl sm:text-2xl shadow-lg border border-gold-400 shrink-0">
            अ
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-serif font-bold tracking-wide text-white leading-tight">
              {t.display.wallTitle}
            </h1>
            <p className="text-[11px] sm:text-xs text-gold-400 font-mono tracking-wider uppercase flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>{t.display.wallSubtitle}</span>
              <span>•</span>
              <span className="text-white bg-gold-500/20 px-1.5 py-0.2 rounded font-mono">03/10/2026</span>
            </p>
          </div>
        </div>

        {/* Live Counters and Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 flex-wrap">
          <div className="hidden lg:flex items-center gap-4 sm:gap-6">
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-mono font-bold text-gold-400">30</div>
              <div className="text-[10px] text-zinc-300 uppercase tracking-wider">{t.display.treatises}</div>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">100%</div>
              <div className="text-[10px] text-zinc-300 uppercase tracking-wider">{t.display.integrity}</div>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-mono font-bold text-white">14,200+</div>
              <div className="text-[10px] text-zinc-300 uppercase tracking-wider">{t.display.scans}</div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-lg sm:text-2xl font-mono font-bold text-gold-200">{visitorCount}</div>
            <div className="text-[10px] text-zinc-300 uppercase tracking-wider">{t.display.visitors}</div>
          </div>

          <div className="flex items-center gap-2 border-l border-white/20 pl-3 sm:pl-4">
            <button
              onClick={toggleFullscreen}
              className="p-2.5 sm:p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15 cursor-pointer"
              title={t.display.fullscreen}
              aria-label={t.display.fullscreen}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            <Link
              href="/"
              className="px-3.5 sm:px-4 py-2.5 min-h-[44px] flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20"
            >
              {t.display.exitPortal}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Feature: Grand Dynamic Quotation Display Card */}
      <main className="relative z-10 my-auto py-10 max-w-5xl mx-auto text-center w-full px-4">
        {/* Category & Date in DD/MM/YYYY */}
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-300 bg-gold-950/80 border border-gold-500/50 px-5 py-2 rounded-full mb-8 shadow-md">
          <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
          <span>{language === "hi" ? current.category_hi : language === "mr" ? current.category_mr : current.category}</span>
          <span className="text-gold-500">•</span>
          <span className="font-mono text-white">{current.year}</span>
        </div>

        <blockquote className="text-2xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-100 leading-snug tracking-tight min-h-[180px] flex items-center justify-center">
          {language === "hi" ? current.quote_hi : language === "mr" ? current.quote_mr : current.quote}
        </blockquote>

        <div className="mt-8 space-y-1.5">
          <div className="text-xl sm:text-2xl font-serif font-bold text-gold-400 tracking-wide">
            {language === "hi" ? current.author_hi : language === "mr" ? current.author_mr : current.author}
          </div>
          <div className="text-sm sm:text-base text-zinc-300 font-mono">
            {language === "hi" ? current.source_hi : language === "mr" ? current.source_mr : current.source}
          </div>
          <div className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-2 italic font-sans leading-relaxed">
            {language === "hi" ? current.historicalContext_hi : language === "mr" ? current.historicalContext_mr : current.historicalContext}
          </div>
        </div>

        {/* Carousel Navigation & Auto-Progress Bar */}
        <div className="mt-10 max-w-xl mx-auto space-y-3">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className={`bg-gold-400 h-full transition-all duration-100 ease-linear rounded-full ${
                isPaused ? "opacity-50" : "opacity-100"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs text-zinc-300 font-mono">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                title="Previous Quote (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPaused((p) => !p)}
                className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer border ${
                  isPaused
                    ? "bg-gold-500 text-navy-950 border-gold-400 font-bold"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                }`}
                title={isPaused ? "Resume slideshow (Space)" : "Pause slideshow (Space)"}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl transition-colors cursor-pointer border ${
                  isSpeaking
                    ? "bg-gold-500 text-navy-950 border-gold-400 font-bold animate-pulse"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                }`}
                title="Audio Narration (TTS)"
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-sans font-semibold">
                  {isSpeaking ? t.display.narrating : t.display.listen}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
              {EXHIBITION_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setProgress(0);
                    setActiveIdx(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === i ? "w-6 sm:w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              title="Next Quote (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Bar: QR Mobile Handover & Quick Switchers */}
      <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4 sm:pt-6">
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
          {/* Simulated QR Code for mobile handover */}
          <div className="bg-white p-2 rounded-xl shadow-lg flex items-center justify-center shrink-0">
            <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-14 sm:h-14 text-navy-950" role="img" aria-label="QR Code to continue on mobile">
              <rect x="5" y="5" width="22" height="22" fill="currentColor" />
              <rect x="9" y="9" width="14" height="14" fill="white" />
              <rect x="12" y="12" width="8" height="8" fill="currentColor" />
              <rect x="53" y="5" width="22" height="22" fill="currentColor" />
              <rect x="57" y="9" width="14" height="14" fill="white" />
              <rect x="60" y="12" width="8" height="8" fill="currentColor" />
              <rect x="5" y="53" width="22" height="22" fill="currentColor" />
              <rect x="9" y="57" width="14" height="14" fill="white" />
              <rect x="12" y="60" width="8" height="8" fill="currentColor" />
              {/* Pattern dots */}
              <rect x="35" y="10" width="8" height="8" fill="currentColor" />
              <rect x="35" y="24" width="6" height="6" fill="currentColor" />
              <rect x="32" y="36" width="16" height="8" fill="currentColor" />
              <rect x="35" y="50" width="8" height="14" fill="currentColor" />
              <rect x="55" y="38" width="16" height="8" fill="currentColor" />
              <rect x="55" y="55" width="12" height="12" fill="currentColor" />
            </svg>
          </div>

          <div className="text-left flex-1">
            <div className="flex items-center gap-1.5 text-gold-400 font-bold text-xs uppercase tracking-wide">
              <QrCode className="w-4 h-4 shrink-0" />
              <span>{t.display.continueOnMobile}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 max-w-lg line-clamp-2 sm:line-clamp-none">
              {t.display.continueSub}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-stretch sm:justify-end gap-2.5 sm:gap-3 w-full md:w-auto">
          <Link
            href="/kiosk"
            className="flex-1 sm:flex-initial text-center px-4 py-2.5 min-h-[44px] flex items-center justify-center rounded-xl bg-gold-500 hover:bg-gold-400 text-xs font-bold text-navy-950 transition-colors shadow-md"
          >
            {t.display.launchKiosk}
          </Link>
          <Link
            href="/search"
            className="flex-1 sm:flex-initial text-center px-4 py-2.5 min-h-[44px] flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition-colors border border-white/20"
          >
            {t.display.searchArchive}
          </Link>
        </div>
      </footer>
    </div>
  );
}
