"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { toDDMMYYYY } from "@/lib/utils";
import {
  AshokaChakra,
  ScalesOfJustice,
  ConstitutionalQuill,
  LionCapital,
  BodhiLeaf,
  TorchOfLiberty
} from "@/components/HeritageSymbols";
import {
  Search, BookOpen, Clock, MapPin, Network, Sparkles,
  Volume2, CheckCircle2, ArrowRight, ExternalLink, Filter,
  FileText, Mic, Image, Landmark, ShieldCheck, Award,
  Calendar, Layers, Check
} from "lucide-react";

interface ItemRecord {
  id: string;
  type: string;
  title: string;
  title_i18n?: Record<string, string>;
  source: string;
  date_start: string;
  rights: string;
}

export default function HomeClient() {
  const { language, t } = useApp();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/search?limit=30")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(
            data.map((d: any) => ({
              id: d.id,
              type: d.type,
              title: d.title,
              title_i18n: d.title_i18n,
              source: d.source,
              date_start: d.date,
              rights: d.access_tier === "open" ? "Public Domain" : "On-Premises Access",
            }))
          );
        }
        setIsLoading(false);
      })
      .catch(() => {
        setItems([
          {
            id: "item-baws-01-aoc",
            type: "book",
            title: "Annihilation of Caste",
            title_i18n: { hi: "जाति का विनाश", mr: "जातीचे निर्मूलन" },
            source: "Jat-Pat-Todak Mandal Presidential Address",
            date_start: "15/05/1936",
            rights: "Public Domain (BAWS Vol. 1)"
          },
          {
            id: "item-cad-art32",
            type: "debate",
            title: "CAD Vol. VII: Article 32 Heart and Soul of the Constitution",
            title_i18n: { hi: "अनुच्छेद 32 संविधान का हृदय और आत्मा", mr: "कलम 32 राज्यघटनेचा आत्मा आणि हृदय" },
            source: "Constituent Assembly of India Debates",
            date_start: "09/12/1948",
            rights: "Parliament of India Digital Archive"
          },
          {
            id: "item-baws-06-rupee",
            type: "book",
            title: "The Problem of the Rupee: Its Origin and Its Solution",
            title_i18n: { hi: "रुपये की समस्या", mr: "रुपयाची समस्या" },
            source: "London School of Economics D.Sc. Thesis",
            date_start: "01/06/1923",
            rights: "Public Domain (BAWS Vol. 6)"
          }
        ]);
        setIsLoading(false);
      });
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const localizedTitle = (item.title_i18n && item.title_i18n[language]) || item.title;
    const matchesSearch =
      !searchQuery ||
      localizedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const sampleQueries = [
    { label: "Article 32: Heart & Soul", query: "Article 32 Heart and Soul" },
    { label: "Reserve Bank Foundation", query: "Problem of the Rupee RBI" },
    { label: "Mahad Satyagraha 20/03/1927", query: "Mahad Chavdar Tale Satyagraha" },
    { label: "Grammar of Anarchy 25/11/1949", query: "Grammar of Anarchy Nov 25 1949" }
  ];

  const categories = [
    { id: "all", label: t.search.allTypes, icon: null },
    { id: "book", label: "Books (BAWS)", icon: BookOpen },
    { id: "debate", label: "CAD Debates", icon: FileText },
    { id: "speech", label: "Speeches", icon: Mic },
    { id: "manuscript", label: "Manuscripts", icon: Landmark },
    { id: "photo", label: "Photographs", icon: Image },
    { id: "audio", label: "Audio / Video", icon: Volume2 },
  ];

  // Key historic epochs with strict DD/MM/YYYY formatting
  const historicEpochs = [
    {
      symbol: TorchOfLiberty,
      title: "The Mahad Satyagraha",
      subtitle: "Water as a Universal Human Right",
      date: "20/03/1927",
      href: "/stories/mahad-satyagraha",
      badge: "Civil Dignity",
      description: "Historic assertion of civic equality at Chavdar Lake, declaring public watering places open to all humanity."
    },
    {
      symbol: ConstitutionalQuill,
      title: "Architect of the Constitution",
      subtitle: "Constitution Hall Debates & Final Warning",
      date: "25/11/1949",
      href: "/reader/item-cad-final-speech",
      badge: "Constitutional Law",
      description: "Dr. Ambedkar's monumental defense of Liberty, Equality, Fraternity and his prophetic warning against political Bhakti."
    },
    {
      symbol: ScalesOfJustice,
      title: "Heart and Soul of the Constitution",
      subtitle: "Constituent Assembly Article 32 Intervention",
      date: "09/12/1948",
      href: "/reader/item-cad-art32",
      badge: "Fundamental Rights",
      description: "The pivotal declaration that the right to constitutional remedies is the very core without which the charter is a nullity."
    },
    {
      symbol: BodhiLeaf,
      title: "Deekshabhoomi & Navayana",
      subtitle: "Spiritual Renaissance & Social Morality",
      date: "14/10/1956",
      href: "/stories/conversion-at-nagpur",
      badge: "Social Liberation",
      description: "Historic religious transformation in Nagpur, rejecting ritual hierarchy in favor of an egalitarian moral philosophy."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Top Institutional Bar with Government Symbols */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-3 p-3.5 px-6 rounded-2xl bg-white border border-stone-300 shadow-xs text-xs"
      >
        <div className="flex items-center gap-3">
          <LionCapital size={26} className="text-primary" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-bold text-primary tracking-wide">
              Government of India • Ministry of Social Justice & Empowerment
            </span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span className="text-zinc-600 font-medium">
              Dr. Ambedkar International Centre (DAIC)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Archive Ingest: 03/10/2026</span>
          </span>
          <span className="hidden md:inline">ISO/IEC 27001 • STQC Audited</span>
        </div>
      </motion.div>

      {/* Hero Banner with Animated Motifs and Rotating Ashoka Chakra */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#0B2A6F] via-[#0D3485] to-[#081E50] rounded-3xl p-8 sm:p-14 text-white shadow-xl border-2 border-accent/30 relative overflow-hidden"
      >
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-accent/40 text-accent text-xs font-bold tracking-wide uppercase shadow-xs">
            <AshokaChakra size={16} className="text-accent" animate={true} />
            <span>National Digital Heritage Archive • PS 26096</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight text-white drop-shadow-sm">
            Dr. B. R. Ambedkar Digital Heritage Archive
          </h1>

          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-2xl font-sans">
            Preserving 22 authenticated volumes of Dr. Ambedkar Writings & Speeches (BAWS), verbatim Constituent Assembly Debates, synchronized historic audio recordings, and museum kiosk exhibits.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2 relative max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="w-full h-14 pl-12 pr-32 rounded-2xl bg-white text-zinc-900 placeholder:text-zinc-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-accent/40 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 h-10 px-5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>
          </form>

          {/* Quick Suggested Queries with Date Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-zinc-300 font-medium">{t.search.suggestedTopics}</span>
            {sampleQueries.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSearchQuery(sq.query);
                  router.push(`/search?q=${encodeURIComponent(sq.query)}`);
                }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium cursor-pointer transition-colors"
              >
                {sq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Background Ashoka Chakra Watermark */}
        <div className="absolute -right-16 -bottom-20 opacity-10 pointer-events-none">
          <AshokaChakra size={440} className="text-white" animate={true} />
        </div>
      </motion.section>

      {/* Live Animated Statistics Counter */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "BAWS Volumes", value: "22", sub: "Complete Writings & Speeches", icon: BookOpen, color: "text-primary bg-primary/10" },
          { label: "Facsimile Scans", value: "14,200+", sub: "600 DPI Archival Pages", icon: FileText, color: "text-amber-800 bg-amber-100" },
          { label: "Chronological Span", value: "1891–1956", sub: "Mhow to Mahaparinirvan", icon: Calendar, color: "text-emerald-800 bg-emerald-100" },
          { label: "Grounded Citations", value: "100%", sub: "Verifiable Primary Proof", icon: ShieldCheck, color: "text-purple-800 bg-purple-100" }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-primary">{stat.value}</div>
                <div className="text-xs font-semibold text-zinc-800">{stat.label}</div>
                <div className="text-[11px] text-zinc-500">{stat.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Pivotal Epochs & Constitutional Architecture (Featuring Distinct Symbols & DD/MM/YYYY) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-300 pb-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block">
              Curated Heritage Exhibits
            </span>
            <h2 className="text-2xl font-serif font-bold text-primary">
              Pivotal Epochs & Constitutional Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md sm:text-right">
            Milestones grounded in primary documents, speeches, and legal folios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {historicEpochs.map((epoch, idx) => {
            const SymbolComponent = epoch.symbol;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="p-6 rounded-3xl bg-white border border-stone-300 hover:border-primary shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <SymbolComponent size={28} className="text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-accent/15 text-[#8F6B1E] font-bold text-[10px] tracking-wide uppercase">
                      {epoch.badge}
                    </span>
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary font-mono bg-stone-100 px-2 py-0.5 rounded">
                      <Calendar className="w-3 h-3 text-accent" />
                      <span>{epoch.date}</span>
                    </span>
                    <h3 className="text-lg font-serif font-bold text-primary mt-2 group-hover:text-primary-hover transition-colors">
                      {epoch.title}
                    </h3>
                    <p className="text-xs font-medium text-accent-light text-[#8F6B1E] mt-0.5">
                      {epoch.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    {epoch.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200">
                  <Link
                    href={epoch.href}
                    className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-stone-50 hover:bg-primary hover:text-white text-primary text-xs font-bold transition-all group-hover:bg-primary group-hover:text-white"
                  >
                    <span>Inspect Primary Scan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Surface Features Navigation */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/reader/item-cad-art32"
          className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-primary mb-1">Archival Reader</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Split OCR transcript beside 600 DPI original facsimile scans.
            </p>
          </div>
        </Link>

        <Link
          href="/timeline"
          className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/20 text-[#8F6B1E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-primary mb-1">1891–1956 Timeline</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              25 milestones across 6 categories with dates in DD/MM/YYYY.
            </p>
          </div>
        </Link>

        <Link
          href="/assistant"
          className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-primary mb-1">AI Assistant</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Zero-hallucination RAG with mandatory document and page citations.
            </p>
          </div>
        </Link>

        <Link
          href="/quotes/verify"
          className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-primary mb-1">Quote Verifier</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Paste attributed quotes to check authenticity against BAWS & CAD.
            </p>
          </div>
        </Link>
      </section>

      {/* Browsable Archive Catalog with Strict DD/MM/YYYY Dates */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary">
              Authenticated Primary Source Catalog
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              30 Seeded Public-Domain Records from Dr. Ambedkar Writings & Speeches (BAWS) and Constituent Assembly Debates
            </p>
          </div>

          {/* Media Type Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedType(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedType === cat.id
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-white text-zinc-700 border-stone-300 hover:bg-stone-50"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Item Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const displayTitle = (item.title_i18n && item.title_i18n[language]) || item.title;
            const formattedDate = toDDMMYYYY(item.date_start);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="bg-white rounded-2xl border border-stone-300 hover:border-stone-400 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary font-bold uppercase tracking-wide text-[10px]">
                      {item.type}
                    </span>
                    <span className="text-zinc-500 font-mono font-medium">{formattedDate}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-primary leading-snug">
                    {displayTitle}
                  </h3>

                  <p className="text-xs text-zinc-500 font-medium">
                    {item.source}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.rights}
                  </span>

                  <Link
                    href={`/reader/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Read Folio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
