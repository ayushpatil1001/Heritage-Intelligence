"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Search, Mic, Filter, ArrowRight, BookOpen, Volume2,
  FileText, Landmark, Image, MicOff, Check, Sparkles
} from "lucide-react";
import { searchCatalog, CATALOG_ITEMS } from "@/lib/catalogData";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useApp();

  const initialQuery = searchParams?.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [results, setResults] = useState<any[]>(() =>
    searchCatalog(initialQuery, "all", "en")
  );
  const [isSearching, setIsSearching] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);

  const performSearch = (searchTerm: string, typeFilter: string) => {
    setIsSearching(true);
    let url = `/api/v1/search?q=${encodeURIComponent(searchTerm)}&lang=${language}`;
    if (typeFilter && typeFilter !== "all") {
      url += `&type=${typeFilter}`;
    }

    // Always compute instant local results from the 30 authenticated records
    const localResults = searchCatalog(searchTerm, typeFilter, language);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
        } else {
          setResults(localResults);
        }
        setIsSearching(false);
      })
      .catch(() => {
        setResults(localResults);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    performSearch(query, selectedType);
  }, [language, selectedType]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, selectedType);
  };

  // Voice Search via Web Speech API (FR-17)
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
      recognition.interimResults = false;
      setIsListeningMic(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListeningMic(false);
        performSearch(transcript, selectedType);
      };

      recognition.onerror = () => setIsListeningMic(false);
      recognition.onend = () => setIsListeningMic(false);
      recognition.start();
    } else {
      // Fallback sample query
      setIsListeningMic(true);
      setTimeout(() => {
        const sample = "Article 32 Heart and Soul";
        setQuery(sample);
        setIsListeningMic(false);
        performSearch(sample, selectedType);
      }, 800);
    }
  };

  const sampleQueries = [
    "Article 32 Heart and Soul",
    "Problem of the Rupee RBI",
    "Mahad Chavdar Tale Satyagraha",
    "Grammar of Anarchy Nov 25 1949",
    "Annihilation of Caste division of labourers"
  ];

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="bg-white rounded-2xl border border-stone-300 p-4 sm:p-6 shadow-sm space-y-4">
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-zinc-400 absolute left-3.5 sm:left-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full h-14 pl-11 sm:pl-12 pr-28 sm:pr-36 rounded-xl bg-stone-50 border border-stone-300 text-base sm:text-sm font-medium text-zinc-900 focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                isListeningMic
                  ? "bg-red-600 text-white animate-pulse border-red-600"
                  : "bg-white text-zinc-600 hover:text-primary border-stone-300"
              }`}
              title={t.search.voiceSearch}
              aria-label={t.search.voiceSearch}
            >
              {isListeningMic ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              type="submit"
              className="h-10 px-3.5 sm:px-5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.home.searchButton}</span>
            </button>
          </div>
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-zinc-500 font-medium">{t.search.suggestedTopics}</span>
          {sampleQueries.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(sq);
                performSearch(sq, selectedType);
              }}
              className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-zinc-700 border border-stone-300 rounded-full font-medium cursor-pointer transition-colors"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">
            {results.length} {t.search.resultsFound}
          </span>
          {isSearching && <span className="text-xs text-zinc-400">{t.search.searching}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              ["all", t.search.allTypes],
              ["book", t.search.categories.book],
              ["debate", t.search.categories.debate],
              ["speech", t.search.categories.speech],
              ["manuscript", t.search.categories.manuscript],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSelectedType(val)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedType === val
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-white text-zinc-700 border-stone-300 hover:bg-stone-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((res) => {
          const displayTitle = (res.title_i18n && res.title_i18n[language]) || res.title;
          const targetId = res.item_id || res.id;
          return (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-stone-300 hover:border-primary p-4 sm:p-6 shadow-sm transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider text-[10px]">
                    {res.type}
                  </span>
                  <span className="text-zinc-500 font-medium">{res.source}</span>
                </div>
                <span className="text-zinc-400 font-mono text-[11px]">{t.search.matchScore}: {(res.score * 100).toFixed(0)}%</span>
              </div>

              <h2 className="text-base sm:text-lg font-serif font-bold text-primary">
                {displayTitle}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-700 font-serif leading-relaxed line-clamp-3 bg-stone-50 p-3.5 sm:p-4 rounded-xl border border-stone-200">
                &ldquo;{res.snippet}&rdquo;
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Date: <strong className="text-zinc-700">{res.date}</strong>
                </span>

                <Link
                  href={`/reader/${targetId}?page=${res.page_no || 1}&highlight=${encodeURIComponent(query)}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <span>{t.search.openPageInReader.replace("{page}", String(res.page_no || 1))}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </Link>
              </div>
            </div>
          );
        })}

        {results.length === 0 && !isSearching && (
          <div className="bg-white rounded-2xl border border-stone-300 p-12 text-center space-y-3">
            <Search className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-serif font-bold text-zinc-700">{t.search.noResults}</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              {t.search.noResultsSuggestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchClient() {
  const { t } = useApp();

  return (
    <div className="space-y-8">
      {/* Header outside Suspense to guarantee exactly 1 H1 rendered in static SSR */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
          {t.search.title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          {t.search.subtitle}
        </p>
      </div>

      <React.Suspense fallback={<div className="p-12 text-center text-navy-800/60 font-serif">Loading Heritage Search...</div>}>
        <SearchContent />
      </React.Suspense>
    </div>
  );
}
