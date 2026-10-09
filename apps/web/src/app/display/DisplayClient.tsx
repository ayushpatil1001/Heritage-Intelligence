"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { AshokaChakra } from "@/components/HeritageSymbols";
import { Maximize2, Minimize2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

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
    quote: "“Educate, Agitate, Organize. Have faith in yourselves. With justice on our side, I do not see how we can lose our battle.”",
    quote_hi: "“शिक्षित बनो, आंदोलन करो, संगठित रहो। अपने आप में विश्वास रखो। जब न्याय हमारे पक्ष में है, तो मुझे नहीं लगता कि हम अपनी लड़ाई हार सकते हैं।”",
    quote_mr: "“शिका, संघटित व्हा आणि संघर्ष करा. स्वतःवर विश्वास ठेवा. न्याय आपल्या बाजूने असताना आपण ही लढाई हरूच शकत नाही.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "All-India Depressed Classes Conference, Nagpur",
    source_hi: "अखिल भारतीय दलित वर्ग परिषद, नागपुर",
    source_mr: "अखिल भारतीय दलित वर्ग परिषद, नागपूर",
    year: "20/07/1942",
    category: "Call to Action",
    category_hi: "चेतना का आह्वान",
    category_mr: "जागृतीचे रणशिंग",
    historicalContext: "Address rallying the oppressed masses toward self-reliance, solidarity, and constitutional agitation.",
    historicalContext_hi: "स्वावलंबन, एकजुटता और संवैधानिक संघर्ष के लिए दलित वर्ग को किया गया ऐतिहासिक संबोधन।",
    historicalContext_mr: "स्वावलंबन, ऐक्य आणि न्याय्य संघर्षासाठी जनतेला दिलेला अमर संदेश.",
  },
  {
    quote: "“At Mahad, we do not want to go to the tank merely to drink water. We want to go to the tank to assert that we are human beings. Lost rights are never regained by begging, but by relentless struggle.”",
    quote_hi: "“महाड में हम केवल पानी पीने के लिए तालाब पर नहीं जा रहे हैं। हम यह सिद्ध करने जा रहे हैं कि हम भी मनुष्य हैं। छीने गए अधिकार कभी भी भीख मांगने से नहीं मिलते, बल्कि निरंतर संघर्ष से ही पुनः प्राप्त होते हैं।”",
    quote_mr: "“महाड येथे आपण केवळ पाणी पिण्यासाठी चवदार तळ्यावर जात नाही आहोत. आपणही मानवी व्यक्ती आहोत हे सिद्ध करण्यासाठी आपण जात आहोत. गमावलेले हक्क याचना करून नव्हे, तर अविरत संघर्षानेच परत मिळतात.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "Speech to the Depressed Classes, Mahad Satyagraha",
    source_hi: "महाड सत्याग्रह भाषण",
    source_mr: "महाड सत्याग्रह भाषण",
    year: "20/03/1927",
    category: "Human Rights & Civil Dignity",
    category_hi: "मानवाधिकार और नागरिक सम्मान",
    category_mr: "मानवी हक्क आणि नागरिक सन्मान",
    historicalContext: "Historic declaration asserting equal civic access to Chavdar Lake public drinking water.",
    historicalContext_hi: "चवदार तालाब के सार्वजनिक पेयजल के समान नागरिक अधिकार की ऐतिहासिक घोषणा।",
    historicalContext_mr: "चवदार तळ्याच्या सार्वजनिक पिण्याच्या पाण्याचा समान नागरी हक्क प्रस्थापित करणारी ऐतिहासिक घोषणा.",
  },
  {
    quote: "“If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it.”",
    quote_hi: "“यदि मुझसे कोई पूछे कि इस संविधान में सबसे महत्वपूर्ण अनुच्छेद कौन सा है, जिसके बिना यह संविधान शून्य हो जाएगा, तो मैं इसके सिवा किसी अन्य अनुच्छेद का नाम नहीं ले सकता। यह संविधान की आत्मा और इसका हृदय है।”",
    quote_mr: "“या संविधानातील सर्वात महत्त्वाचे कलम कोणते, ज्या कलमाशिवाय हे संविधान निरर्थक ठरेल, असा प्रश्न मला विचारला गेला, तर मी या कलमाशिवाय दुसऱ्या कोणत्याही कलमाचा उल्लेख करू शकणार नाही. हा संविधानाचा आत्मा आणि त्याचे हृदय आहे.”",
    author: "Dr. B. R. Ambedkar",
    author_hi: "डॉ. बी. आर. आंबेडकर",
    author_mr: "डॉ. बी. आर. आंबेडकर",
    source: "Constituent Assembly Debates, Vol. VII",
    source_hi: "संविधान सभा वादविवाद, खंड VII",
    source_mr: "संविधान सभा वादविवाद, खंड ७",
    year: "09/12/1948",
    category: "Fundamental Rights",
    category_hi: "मौलिक अधिकार",
    category_mr: "मूलभूत हक्क",
    historicalContext: "Debate on Article 32 establishing direct Supreme Court remedies as the indispensable shield of liberty.",
    historicalContext_hi: "अनुच्छेद 32 पर बहस, जिसने सर्वोच्च न्यायालय के सीधे उपचारों को स्वतंत्रता की अपरिहार्य ढाल बनाया।",
    historicalContext_mr: "कलम ३२ वरील ऐतिहासिक चर्चा, ज्याने सर्वोच्च न्यायालयाच्या न्यायिक संरक्षणाला स्वातंत्र्याची सर्वोच्च ढाल बनवले.",
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
  const { language, setLanguage, t } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  // Auto-advance quote card every 10 seconds with smooth progress tick
  useEffect(() => {
    if (isPaused) return;

    const interval = 100;
    const total = 10000;
    const step = (interval / total) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger smooth fade transition
          setFadeState("out");
          setTimeout(() => {
            setActiveIdx((curr) => (curr + 1) % EXHIBITION_QUOTES.length);
            setFadeState("in");
          }, 350);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeIdx, isPaused]);

  // Subtle keyboard controls for unattended clickers / remote presenters
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        advanceQuote(1);
      } else if (e.key === "ArrowLeft") {
        advanceQuote(-1);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const advanceQuote = (direction: number) => {
    setProgress(0);
    setFadeState("out");
    setTimeout(() => {
      setActiveIdx((prev) => (prev + direction + EXHIBITION_QUOTES.length) % EXHIBITION_QUOTES.length);
      setFadeState("in");
    }, 250);
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const current = EXHIBITION_QUOTES[activeIdx];

  const localizedQuote =
    language === "hi" ? current.quote_hi : language === "mr" ? current.quote_mr : current.quote;
  const localizedAuthor =
    language === "hi" ? current.author_hi : language === "mr" ? current.author_mr : current.author;
  const localizedSource =
    language === "hi" ? current.source_hi : language === "mr" ? current.source_mr : current.source;
  const localizedContext =
    language === "hi" ? current.historicalContext_hi : language === "mr" ? current.historicalContext_mr : current.historicalContext;

  return (
    <div className="min-h-screen bg-[#040D21] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden select-none">
      {/* Background Radial Glow & Slow Ambient Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0A2663]/40 via-[#040D21] to-[#020713] opacity-95 pointer-events-none" />
      <div className="absolute -right-28 -bottom-32 opacity-[0.03] pointer-events-none">
        <AshokaChakra size={640} className="text-white" animate={true} />
      </div>

      {/* Top Standby Header: Compact, Dignified & Discreet */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
        {/* Left: Emblem & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gold-500/90 text-navy-950 flex items-center justify-center font-serif font-black text-base shadow-sm border border-gold-400/50 shrink-0">
            अ
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-serif font-bold tracking-wide text-white/90 leading-tight">
              {t.appName}
            </h1>
          </div>
        </div>

        {/* Right: Low-opacity unobtrusive controls for museum staff / attendants */}
        <div className="flex items-center gap-2.5 opacity-25 hover:opacity-100 transition-opacity duration-300">
          {/* Subtle Language Pills */}
          <div className="inline-flex rounded-lg bg-white/10 p-0.5 border border-white/15 text-[10px]">
            {(["en", "hi", "mr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  language === l
                    ? "bg-gold-500 text-navy-950 shadow-xs"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l === "en" ? "EN" : l === "hi" ? "हिं" : "मरा"}
              </button>
            ))}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/15 cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Discreet Exit Link */}
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/15 cursor-pointer"
            title="Return to Home Portal"
            aria-label="Return to Home Portal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Screen: Quotation Display with Left & Right Arrow Navigation */}
      <main className="relative z-10 my-auto py-6 sm:py-8 max-w-5xl mx-auto w-full px-2 sm:px-4 flex items-center justify-between gap-3 sm:gap-6">
        {/* Previous Quote Arrow */}
        <button
          onClick={() => advanceQuote(-1)}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white transition-all cursor-pointer border border-white/15 shrink-0 shadow-sm"
          title="Previous quote"
          aria-label="Previous quote"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Center Quotation Content */}
        <div className="flex-1 text-center flex flex-col items-center justify-center max-w-3xl mx-auto">
          <div
            className={`transition-all duration-500 ease-in-out w-full flex flex-col items-center ${
              fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {/* The Quotation: Elegantly sized & readable */}
            <blockquote className="text-lg sm:text-2xl md:text-3xl font-serif font-normal text-stone-100 leading-relaxed sm:leading-relaxed tracking-normal min-h-[90px] sm:min-h-[120px] flex items-center justify-center max-w-2xl sm:max-w-3xl mx-auto drop-shadow-sm">
              {localizedQuote}
            </blockquote>

            {/* Author & Source Attribution without bulky badge tags */}
            <div className="mt-6 sm:mt-8 space-y-1.5">
              <div className="text-base sm:text-lg font-serif font-bold text-gold-400 tracking-wide">
                {localizedAuthor}
              </div>
              <div className="text-xs sm:text-sm text-stone-300/85 font-mono">
                {localizedSource} • {current.year}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400/75 max-w-lg mx-auto mt-1 italic font-sans leading-relaxed">
                {localizedContext}
              </div>
            </div>
          </div>
        </div>

        {/* Next Quote Arrow */}
        <button
          onClick={() => advanceQuote(1)}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white transition-all cursor-pointer border border-white/15 shrink-0 shadow-sm"
          title="Next quote"
          aria-label="Next quote"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </main>

      {/* Bottom Screen: Quiet Auto-Rotation Progress Line & Indicator */}
      <footer className="relative z-10 flex flex-col items-center justify-center gap-2 pt-3 border-t border-white/10">
        {/* Subtle, Minimal Progress Bar */}
        <div className="w-full max-w-xs bg-white/10 h-0.5 rounded-full overflow-hidden">
          <div
            className={`bg-gold-400 h-full transition-all duration-100 ease-linear rounded-full ${
              isPaused ? "opacity-40" : "opacity-100"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle Slide Indicator Dots */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {EXHIBITION_QUOTES.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                activeIdx === i ? "w-4 bg-gold-400" : "w-1 bg-white/20"
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
