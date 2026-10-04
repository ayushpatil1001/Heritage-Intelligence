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
    {
      label: language === "mr" ? "कलम ३२: आत्मा व हृदय" : language === "hi" ? "अनुच्छेद 32: आत्मा और हृदय" : "Article 32: Heart & Soul",
      query: "Article 32 Heart and Soul",
    },
    {
      label: language === "mr" ? "रिझर्व्ह बँक स्थापना" : language === "hi" ? "रिज़र्व बैंक की स्थापना" : "Reserve Bank Foundation",
      query: "Problem of the Rupee RBI",
    },
    {
      label: language === "mr" ? "महाड सत्याग्रह २०/०३/१९२७" : language === "hi" ? "महाड सत्याग्रह 20/03/1927" : "Mahad Satyagraha 20/03/1927",
      query: "Mahad Chavdar Tale Satyagraha",
    },
    {
      label: language === "mr" ? "अराजकतेचे व्याकरण २५/११/१९४९" : language === "hi" ? "अराजकता का व्याकरण 25/11/1949" : "Grammar of Anarchy 25/11/1949",
      query: "Grammar of Anarchy Nov 25 1949",
    },
  ];

  const categories = [
    { id: "all", label: t.home.catalogCategories.all, icon: null },
    { id: "book", label: t.home.catalogCategories.book, icon: BookOpen },
    { id: "debate", label: t.home.catalogCategories.debate, icon: FileText },
    { id: "speech", label: t.home.catalogCategories.speech, icon: Mic },
    { id: "manuscript", label: t.home.catalogCategories.manuscript, icon: Landmark },
    { id: "photo", label: t.home.catalogCategories.photo, icon: Image },
    { id: "audio", label: t.home.catalogCategories.audio, icon: Volume2 },
  ];

  const epochIcons = [TorchOfLiberty, ConstitutionalQuill, ScalesOfJustice, BodhiLeaf];
  const epochHrefs = [
    "/stories/mahad-satyagraha",
    "/reader/item-cad-final-speech",
    "/reader/item-cad-art32",
    "/stories/conversion-at-nagpur",
  ];

  return (
    <div className="space-y-12">
      {/* Top Institutional Bar with Government Symbols */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 sm:px-6 rounded-2xl bg-white border border-stone-300 shadow-xs text-xs"
      >
        <div className="flex items-center gap-3">
          <LionCapital size={26} className="text-primary shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-bold text-primary tracking-wide">
              {t.home.govBar}
            </span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span className="text-zinc-600 font-medium">
              {t.home.institution}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.home.ingestStatus}</span>
          </span>
          <span className="hidden md:inline">{t.home.securityAudit}</span>
        </div>
      </motion.div>

      {/* Hero Banner with Animated Motifs and Rotating Ashoka Chakra */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#0B2A6F] via-[#0D3485] to-[#081E50] rounded-2xl sm:rounded-3xl p-6 sm:p-14 text-white shadow-xl border-2 border-accent/30 relative overflow-hidden"
      >
        <div className="max-w-3xl space-y-4 sm:space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-accent/40 text-accent text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-xs">
            <AshokaChakra size={16} className="text-accent shrink-0" animate={true} />
            <span>{t.home.nationalArchiveBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-serif font-bold tracking-tight leading-tight text-white drop-shadow-sm">
            {t.home.heroTitle}
          </h1>

          <p className="text-xs sm:text-base text-zinc-200 leading-relaxed max-w-2xl font-sans">
            {t.home.heroSubtitle}
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
                className="w-full h-14 pl-12 pr-28 sm:pr-32 rounded-2xl bg-white text-zinc-900 placeholder:text-zinc-400 text-base sm:text-sm font-medium focus:outline-none focus:ring-4 focus:ring-accent/40 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 h-10 px-4 sm:px-5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.home.searchButton}</span>
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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: t.home.stats.bawsVolumes, value: "22", sub: t.home.stats.bawsSub, icon: BookOpen, color: "text-primary bg-primary/10" },
          { label: t.home.stats.scans, value: "14,200+", sub: t.home.stats.scansSub, icon: FileText, color: "text-amber-800 bg-amber-100" },
          { label: t.home.stats.span, value: "1891–1956", sub: t.home.stats.spanSub, icon: Calendar, color: "text-emerald-800 bg-emerald-100" },
          { label: t.home.stats.citations, value: "100%", sub: t.home.stats.citationsSub, icon: ShieldCheck, color: "text-purple-800 bg-purple-100" }
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
              {t.home.epochsBadge}
            </span>
            <h2 className="text-2xl font-serif font-bold text-primary">
              {t.home.epochsTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md sm:text-right">
            {t.home.epochsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.home.epochs.map((epoch, idx) => {
            const SymbolComponent = epochIcons[idx] || BodhiLeaf;
            const href = epochHrefs[idx] || "/timeline";
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
                    <p className="text-xs font-medium text-[#8F6B1E] mt-0.5">
                      {epoch.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    {epoch.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200">
                  <Link
                    href={href}
                    className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-stone-50 hover:bg-primary hover:text-white text-primary text-xs font-bold transition-all group-hover:bg-primary group-hover:text-white"
                  >
                    <span>{t.common.inspectScan}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Surface Features Navigation */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Link
          href="/reader/item-cad-art32"
          className="p-5 rounded-2xl bg-white border border-stone-300 shadow-sm hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-primary mb-1">{t.home.features.readerTitle}</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.home.features.readerDesc}
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
            <h2 className="font-serif font-bold text-base text-primary mb-1">{t.home.features.timelineTitle}</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.home.features.timelineDesc}
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
            <h2 className="font-serif font-bold text-base text-primary mb-1">{t.home.features.assistantTitle}</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.home.features.assistantDesc}
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
            <h2 className="font-serif font-bold text-base text-primary mb-1">{t.home.features.verifierTitle}</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.home.features.verifierDesc}
            </p>
          </div>
        </Link>
      </section>

      {/* Browsable Archive Catalog with Strict DD/MM/YYYY Dates */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary">
              {t.home.catalogTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500">
              {t.home.catalogSubtitle}
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
                    <span>{t.common.readFolio}</span>
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
