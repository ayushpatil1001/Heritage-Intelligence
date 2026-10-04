"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { MapPin, Navigation, BookOpen, Clock, Calendar, ArrowRight, Layers, Compass } from "lucide-react";

interface HeritageLocation {
  id: string;
  nameEn: string;
  nameHi: string;
  nameMr: string;
  region: string;
  country: string;
  period: string;
  significanceEn: string;
  significanceHi: string;
  significanceMr: string;
  // Normalized 0-100 coordinates for SVG map positioning
  coords: { x: number; y: number };
  category: "struggle" | "education" | "governance" | "spiritual" | "birth";
  relatedItemId?: string;
  relatedItemTitle?: string;
  keyEvents: string[];
}

const LOCATIONS: HeritageLocation[] = [
  {
    id: "mhow",
    nameEn: "Mhow (Dr. Ambedkar Nagar)",
    nameHi: "महू (डॉ. आंबेडकर नगर)",
    nameMr: "महू (डॉ. आंबेडकर नगर)",
    region: "Madhya Pradesh",
    country: "India",
    period: "1891",
    significanceEn: "Birthplace of Dr. Bhimrao Ramji Ambedkar on April 14, 1891, in a military cantonment.",
    significanceHi: "14 अप्रैल 1891 को डॉ. भीमराव रामजी आंबेडकर की सैन्य छावनी में जन्मस्थली।",
    significanceMr: "१४ एप्रिल १८९१ रोजी डॉ. भीमराव रामजी आंबेडकर यांचे लष्करी छावणीतील जन्मस्थान.",
    coords: { x: 50, y: 46 },
    category: "birth",
    keyEvents: ["1891: Birth in military cantonment", "Foundation of early resilience and social observation"],
  },
  {
    id: "baroda",
    nameEn: "Vadodara (Baroda)",
    nameHi: "वडोदरा (बड़ौदा)",
    nameMr: "वडोदरा (बडोदा)",
    region: "Gujarat",
    country: "India",
    period: "1912 - 1917",
    significanceEn: "Patronage of Maharaja Sayajirao Gaekwad III, state scholar service, and pivotal encounter with caste discrimination.",
    significanceHi: "महाराजा सयाजीराव गायकवाड़ तृतीय का संरक्षण, राज्य छात्रवृत्ति सेवा और जाति भेदभाव का कटु अनुभव।",
    significanceMr: "महाराजा सयाजीराव गायकवाड यांचे संरक्षण, शिष्यवृत्ती सेवा आणि अस्पृश्यतेचे भीषण अनुभव.",
    coords: { x: 44, y: 48 },
    category: "struggle",
    keyEvents: ["1913: Gaekwad scholarship award to study abroad", "1917: Return as Military Secretary and Kamathi Baug incident"],
  },
  {
    id: "newyork",
    nameEn: "Columbia University, New York",
    nameHi: "कोलंबिया विश्वविद्यालय, न्यूयॉर्क",
    nameMr: "कोलंबिया विद्यापीठ, न्यूयॉर्क",
    region: "New York",
    country: "United States",
    period: "1913 - 1916",
    significanceEn: "Earned M.A. and Ph.D. under scholars like John Dewey. Presented 'Castes in India: Their Mechanism, Genesis and Development'.",
    significanceHi: "जॉन डेवी जैसे विद्वानों के मार्गदर्शन में एम.ए. और पीएच.डी. की उपाधि। 'कास्ट्स इन इंडिया' शोधपत्र प्रस्तुत किया।",
    significanceMr: "जॉन ड्युई यांच्या मार्गदर्शनाखाली एम.ए. व पीएच.डी. संपादन. 'कास्ट्स इन इंडिया' निबंधाचे वाचन.",
    coords: { x: 18, y: 28 },
    category: "education",
    relatedItemId: "item-baws-01-caste",
    relatedItemTitle: "Castes in India: Their Mechanism, Genesis and Development",
    keyEvents: ["1915: M.A. in Economics", "1916: Ph.D. thesis on 'The Evolution of Provincial Finance in British India'"],
  },
  {
    id: "london",
    nameEn: "London (LSE & Gray's Inn)",
    nameHi: "लंदन (एलएसई और ग्रेज़ इन)",
    nameMr: "लंडन (एलएसई आणि ग्रेज इन)",
    region: "London",
    country: "United Kingdom",
    period: "1916 - 1923, 1930 - 1932",
    significanceEn: "D.Sc. in Economics from London School of Economics (The Problem of the Rupee), Barrister-at-Law, and Round Table Conferences delegate.",
    significanceHi: "लंदन स्कूल ऑफ इकोनॉमिक्स से डी.एससी. ('द प्रॉब्लम ऑफ द रुपया'), बैरिस्टर-एट-लॉ, और गोलमेज सम्मेलनों के प्रतिनिधि।",
    significanceMr: "लंडन स्कूल ऑफ इकॉनॉमिक्समधून डी.एस्सी. ('द प्रॉब्लेम ऑफ द रुपी'), बॅरिस्टर पदवी, आणि गोलमेज परिषदांमधील ऐतिहासिक सहभाग.",
    coords: { x: 26, y: 22 },
    category: "education",
    relatedItemId: "item-baws-06-rupee",
    relatedItemTitle: "The Problem of the Rupee: Its Origin and Its Solution",
    keyEvents: ["1923: Completed D.Sc. (Economics)", "1930-1932: Round Table Conferences advocating depressed classes rights"],
  },
  {
    id: "mahad",
    nameEn: "Mahad (Chavdar Tale)",
    nameHi: "महाड़ (चवदार तालाब)",
    nameMr: "महाड (चवदार तळे)",
    region: "Maharashtra",
    country: "India",
    period: "March 20, 1927",
    significanceEn: "Mahad Satyagraha for asserting equal access to public drinking water, often hailed as the Declaration of Human Rights in India.",
    significanceHi: "सार्वजनिक पेयजल के अधिकार के लिए महाड़ सत्याग्रह, जिसे भारत में मानवाधिकारों की घोषणा माना जाता है।",
    significanceMr: "पिण्याच्या पाण्यासाठी ऐतिहासिक चवदार तळे सत्याग्रह; सामाजिक समतेचा जाहीरनामा.",
    coords: { x: 46, y: 55 },
    category: "struggle",
    relatedItemId: "item-editorial-bahishkrit",
    relatedItemTitle: "Bahishkrit Bharat - Editorial on Mahad Satyagraha",
    keyEvents: ["March 20, 1927: Dr. Ambedkar drinks water at Chavdar Lake", "Dec 25, 1927: Manusmriti Dahan Din (burning of inequality code)"],
  },
  {
    id: "nashik",
    nameEn: "Nashik (Kalaram Temple)",
    nameHi: "नासिक (कालाराम मंदिर)",
    nameMr: "नाशिक (काळाराम मंदिर)",
    region: "Maharashtra",
    country: "India",
    period: "1930 - 1935",
    significanceEn: "Kalaram Temple Satyagraha demanding equal entry for Dalits into religious places, affirming full democratic civic equality.",
    significanceHi: "दलितों के धार्मिक स्थलों में समान प्रवेश के लिए कालाराम मंदिर सत्याग्रह, नागरिक समानता की मांग।",
    significanceMr: "काळाराम मंदिर सत्याग्रह; सामाजिक व धार्मिक समानतेसाठी ५ वर्षे चाललेला शांततामय लढा.",
    coords: { x: 47, y: 52 },
    category: "struggle",
    keyEvents: ["March 2, 1930: Launch of Satyagraha with 15,000 volunteers", "1935: Yeola Declaration declaring renunciation of Hinduism"],
  },
  {
    id: "delhi",
    nameEn: "New Delhi (Constitution Hall & Parliament)",
    nameHi: "नई दिल्ली (संविधान सभा और संसद)",
    nameMr: "नवी दिल्ली (संविधान सभागृह आणि संसद)",
    region: "Delhi",
    country: "India",
    period: "1947 - 1956",
    significanceEn: "Chairmanship of Constitution Drafting Committee, India's First Law Minister, and championing the Hindu Code Bill.",
    significanceHi: "संविधान प्रारूप समिति के अध्यक्ष, भारत के प्रथम विधि मंत्री और हिंदू कोड बिल के प्रणेता।",
    significanceMr: "भारतीय संविधान मसुदा समितीचे अध्यक्ष, स्वतंत्र भारताचे पहिले कायदेमंत्री व हिंदू कोड बिल प्रणेते.",
    coords: { x: 49, y: 38 },
    category: "governance",
    relatedItemId: "item-cad-final-speech",
    relatedItemTitle: "Drafting Committee Presentation to Constituent Assembly",
    keyEvents: ["August 29, 1947: Appointed Drafting Committee Chairman", "Nov 26, 1949: Presentation of final Constitution draft", "1951: Resignation as Law Minister over Hindu Code Bill stall"],
  },
  {
    id: "nagpur",
    nameEn: "Nagpur (Deekshabhoomi)",
    nameHi: "नागपुर (दीक्षाभूमि)",
    nameMr: "नागपूर (दीक्षाभूमी)",
    region: "Maharashtra",
    country: "India",
    period: "October 14, 1956",
    significanceEn: "Historic Dhammadeeksha ceremony where Dr. Ambedkar and over 500,000 followers embraced Buddhism, initiating the Navayana movement.",
    significanceHi: "ऐतिहासिक धम्मदीक्षा समारोह जहाँ डॉ. आंबेडकर और 500,000+ अनुयायियों ने बौद्ध धर्म स्वीकार किया।",
    significanceMr: "ऐतिहासिक धम्मदीक्षा सोहळा; डॉ. आंबेडकर व ५ लाख अनुयायांचा बौद्ध धर्मात प्रवेश, नवयान पुनरुत्थान.",
    coords: { x: 53, y: 49 },
    category: "spiritual",
    relatedItemId: "item-baws-11-buddha",
    relatedItemTitle: "The Buddha and His Dhamma - Selected Passages",
    keyEvents: ["October 14, 1956: 22 Pledges recited at Deekshabhoomi", "Rebirth of Buddhist philosophy anchored in liberty, equality, fraternity"],
  },
  {
    id: "mumbai",
    nameEn: "Mumbai (Chaityabhoomi / Rajgriha)",
    nameHi: "मुंबई (चैत्यभूमि / राजगृह)",
    nameMr: "मुंबई (चैत्यभूमी / राजगृह)",
    region: "Maharashtra",
    country: "India",
    period: "Lifetime Residence",
    significanceEn: "Rajgriha personal residence housing 50,000+ books; founding Siddharth College; memorial at Chaityabhoomi (Dadar Chowpatty).",
    significanceHi: "राजगृह - 50,000+ पुस्तकों का निजी पुस्तकालय; सिद्धार्थ कॉलेज की स्थापना; दादर चैत्यभूमि स्मारक।",
    significanceMr: "राजगृह निवासस्थान (५०,०००+ ग्रंथांचा संग्रह); सिद्धार्थ कॉलेज स्थापना; दादर चौपाटीवरील चैत्यभूमी स्मारक.",
    coords: { x: 45, y: 56 },
    category: "governance",
    keyEvents: ["1930s: Built Rajgriha specifically to house his library", "Dec 7, 1956: Final resting place at Chaityabhoomi Dadar"],
  },
];

export default function MapClient() {
  const { language, t } = useApp();
  const [selectedLocation, setSelectedLocation] = useState<HeritageLocation>(LOCATIONS[4]); // Mahad default
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mapScope, setMapScope] = useState<"india" | "global">("india");

  const filteredLocations = LOCATIONS.filter((loc) => {
    if (activeCategory !== "all" && loc.category !== activeCategory) return false;
    if (mapScope === "india" && loc.country !== "India") return false;
    return true;
  });

  const getLocName = (loc: HeritageLocation) => {
    if (language === "hi") return loc.nameHi;
    if (language === "mr") return loc.nameMr;
    return loc.nameEn;
  };

  const getLocSignificance = (loc: HeritageLocation) => {
    if (language === "hi") return loc.significanceHi;
    if (language === "mr") return loc.significanceMr;
    return loc.significanceEn;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-900/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-sm text-gold-600 font-semibold tracking-wide uppercase">
            <Compass className="w-4 h-4" />
            <span>Geo-Spatial Archive Explorer</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-1">
            {t.map.title}
          </h1>
          <p className="text-sm text-navy-800/70 mt-1">
            {t.map.subtitle}
          </p>
        </div>

        {/* Scope and Filter Pills */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-navy-900/20 p-1 bg-white shadow-sm">
            <button
              onClick={() => setMapScope("india")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mapScope === "india" ? "bg-navy-900 text-white" : "text-navy-800 hover:bg-parchment-200"
              }`}
            >
              {t.map.scopeIndia}
            </button>
            <button
              onClick={() => setMapScope("global")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mapScope === "global" ? "bg-navy-900 text-white" : "text-navy-800 hover:bg-parchment-200"
              }`}
            >
              {t.map.scopeGlobal}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "all", label: language === "mr" ? "सर्व स्थाने" : language === "hi" ? "सभी स्थल" : "All Sites" },
          { id: "struggle", label: t.map.legendStruggles },
          { id: "education", label: t.map.legendEducation },
          { id: "governance", label: t.map.legendGovernance },
          { id: "spiritual", label: t.map.legendSpiritual },
          { id: "birth", label: language === "mr" ? "जन्मस्थान" : language === "hi" ? "जन्मस्थली" : "Birthplace" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-navy-900 text-white shadow-sm"
                : "bg-parchment-200 text-navy-800 hover:bg-parchment-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Viewport & Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Visualizer (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-navy-900/10 rounded-xl shadow-sm p-4 flex flex-col">
          <div className="relative w-full aspect-[4/3] bg-parchment-100 rounded-lg border border-navy-900/10 overflow-hidden flex items-center justify-center">
            {/* SVG Background Map Representation */}
            <svg
              viewBox="0 0 100 80"
              className="w-full h-full object-cover select-none pointer-events-none"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }}
            >
              {/* Abstract Landmass Outlines */}
              {mapScope === "global" ? (
                <>
                  {/* North America */}
                  <path
                    d="M 10 18 Q 22 15 25 25 T 20 45 T 10 40 Z"
                    fill="#E8DEC8"
                    stroke="#D4C4A8"
                    strokeWidth="0.5"
                  />
                  {/* Western Europe & UK */}
                  <path
                    d="M 23 18 Q 30 15 32 24 T 27 30 Z"
                    fill="#E8DEC8"
                    stroke="#D4C4A8"
                    strokeWidth="0.5"
                  />
                  {/* Indian Subcontinent */}
                  <path
                    d="M 44 32 Q 56 30 58 42 T 52 64 T 42 54 Z"
                    fill="#DFD2B7"
                    stroke="#C8A24A"
                    strokeWidth="0.7"
                  />
                </>
              ) : (
                <>
                  {/* Focused India Map Stylized Silhouette */}
                  <path
                    d="M 48 18 Q 54 22 56 30 Q 64 36 68 40 Q 60 48 56 55 Q 52 68 49 74 Q 45 68 43 56 Q 38 52 40 42 Q 42 32 48 18 Z"
                    fill="#DFD2B7"
                    stroke="#C8A24A"
                    strokeWidth="0.8"
                  />
                  {/* Rivers / Coordinates Grid for institutional cartography aesthetic */}
                  <line x1="30" y1="40" x2="70" y2="40" stroke="#0B2A6F" strokeOpacity="0.08" strokeDasharray="1 1" />
                  <line x1="30" y1="55" x2="70" y2="55" stroke="#0B2A6F" strokeOpacity="0.08" strokeDasharray="1 1" />
                  <line x1="50" y1="20" x2="50" y2="70" stroke="#0B2A6F" strokeOpacity="0.08" strokeDasharray="1 1" />
                </>
              )}
            </svg>

            {/* Interactive Location Markers Overlay */}
            <div className="absolute inset-0">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    style={{
                      left: `${loc.coords.x}%`,
                      top: `${loc.coords.y}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                    className={`absolute group z-10 transition-all focus:outline-none ${
                      isSelected ? "scale-125 z-20" : "hover:scale-110"
                    }`}
                    title={loc.nameEn}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all ${
                          isSelected
                            ? "bg-navy-900 text-gold-400 ring-4 ring-gold-500/40"
                            : loc.category === "struggle"
                            ? "bg-red-700 text-white"
                            : loc.category === "education"
                            ? "bg-blue-700 text-white"
                            : loc.category === "spiritual"
                            ? "bg-amber-600 text-white"
                            : "bg-navy-900 text-white"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span
                        className={`mt-1 text-[11px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap border ${
                          isSelected
                            ? "bg-navy-900 text-gold-300 border-gold-500"
                            : "bg-white/95 text-navy-900 border-navy-900/10"
                        }`}
                      >
                        {getLocName(loc)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-navy-900/15 rounded-md p-2.5 shadow-sm text-xs space-y-1.5 pointer-events-none">
              <div className="font-semibold text-navy-900 text-[11px] uppercase tracking-wider mb-1">{t.map.legendTitle}</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-700"></span>
                <span className="text-navy-800">{t.map.legendStruggles}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span>
                <span className="text-navy-800">{t.map.legendEducation}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-navy-900"></span>
                <span className="text-navy-800">{t.map.legendGovernance}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <span className="text-navy-800">{t.map.legendSpiritual}</span>
              </div>
            </div>
          </div>

          {/* Quick Location Slider / Mini List */}
          <div className="mt-4 pt-3 border-t border-navy-900/10 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-navy-800/60 uppercase whitespace-nowrap">{t.map.jumpTo}:</span>
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => {
                  setSelectedLocation(loc);
                  if (loc.country !== "India" && mapScope !== "global") setMapScope("global");
                }}
                className={`text-xs px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
                  selectedLocation.id === loc.id
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-parchment-100 text-navy-800 border-navy-900/10 hover:bg-parchment-200"
                }`}
              >
                {getLocName(loc)}
              </button>
            ))}
          </div>
        </div>

        {/* Location Detail Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-navy-900/10 rounded-xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-navy-800/60 font-medium mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                {selectedLocation.region}, {selectedLocation.country}
              </span>
              <span className="bg-parchment-200 px-2 py-0.5 rounded text-navy-900 font-bold">
                {selectedLocation.period}
              </span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-navy-900 leading-snug">
              {getLocName(selectedLocation)}
            </h2>

            <p className="mt-3 text-sm text-navy-800/90 leading-relaxed bg-parchment-100 p-3.5 rounded-lg border border-navy-900/10">
              {getLocSignificance(selectedLocation)}
            </p>

            <div className="mt-5">
              <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-navy-800/60" />
                {t.map.keyMilestones}
              </h3>
              <ul className="space-y-2 text-xs text-navy-800/80">
                {selectedLocation.keyEvents.map((ev, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedLocation.relatedItemId && (
              <div className="mt-6 pt-4 border-t border-navy-900/10">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider block mb-2">
                  {t.map.connectedWork}
                </span>
                <Link
                  href={`/reader/${selectedLocation.relatedItemId}`}
                  className="group block p-3 rounded-lg border border-gold-500/30 bg-gold-50/50 hover:bg-gold-50 transition-colors"
                >
                  <div className="text-xs font-semibold text-navy-900 group-hover:text-gold-700 flex items-center justify-between">
                    <span className="line-clamp-1">{selectedLocation.relatedItemTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </div>
                  <span className="text-[11px] text-navy-800/60 mt-0.5 block">
                    {t.map.readZoom}
                  </span>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-navy-900/10 flex items-center gap-2">
            <Link
              href="/timeline"
              className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-md border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-colors"
            >
              {t.timeline.title}
            </Link>
            <Link
              href={`/search?q=${encodeURIComponent(selectedLocation.nameEn)}`}
              className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-md bg-navy-900 text-white hover:bg-navy-800 transition-colors"
            >
              {t.nav.search}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
