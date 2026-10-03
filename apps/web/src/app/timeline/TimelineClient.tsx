"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { toDDMMYYYY } from "@/lib/utils";
import {
  Clock, Calendar, BookOpen, MapPin, Award,
  ArrowRight, Filter, Bookmark, ExternalLink
} from "lucide-react";

export default function TimelineClient() {
  const { language, t, addToCollection } = useApp();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/timeline")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
          setSelectedEvent(data[0] || null);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const categories = [
    "All",
    "Education",
    "Social Reform",
    "Politics",
    "Constitution",
    "Buddhism",
    "Legacy"
  ];

  const filteredEvents = events.filter((ev) => {
    return selectedCategory === "All" || ev.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            {t.nav.timeline}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            25 authenticated milestones from 1891 birth in Mhow to the adoption of the Constitution and timeless legacy.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-white text-zinc-700 border-stone-300 hover:bg-stone-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline Stream (Col 7) */}
        <div className="lg:col-span-7 space-y-4 max-h-[800px] overflow-y-auto pr-2">
          <h2 className="text-xl font-serif font-bold text-primary mb-2">
            Chronological Archive (1891–1956)
          </h2>
          {filteredEvents.map((ev, index) => {
            const isSelected = selectedEvent?.id === ev.id;
            const title = (ev.title_i18n && ev.title_i18n[language]) || ev.id;
            const desc = (ev.description_i18n && ev.description_i18n[language]) || "";
            const year = ev.date.substring(0, 4);

            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                  isSelected
                    ? "bg-[#F8FAFC] border-2 border-primary shadow-md"
                    : "bg-white border-stone-300 hover:border-stone-400 shadow-xs"
                }`}
              >
                {/* Year Marker */}
                <div className="shrink-0 flex flex-col items-center">
                  <span className="w-14 h-14 rounded-2xl bg-primary text-accent font-serif font-bold text-lg flex items-center justify-center shadow-xs">
                    {year}
                  </span>
                  <div className="w-0.5 flex-1 bg-stone-200 mt-2" />
                </div>

                {/* Event Summary */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-accent/20 text-[#8F6B1E] font-bold text-[10px] uppercase tracking-wider">
                      {ev.category}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs">{toDDMMYYYY(ev.date)}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-primary">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans line-clamp-2">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Event Dossier Card (Col 5) */}
        {selectedEvent && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-300 p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
            <div className="space-y-2 border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block">
                {selectedEvent.category} • Milestone Dossier
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary leading-tight">
                {(selectedEvent.title_i18n && selectedEvent.title_i18n[language]) || selectedEvent.id}
              </h2>
              <span className="text-xs text-zinc-500 font-mono block">
                Date: {toDDMMYYYY(selectedEvent.date)}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-800 font-sans">
              {(selectedEvent.description_i18n && selectedEvent.description_i18n[language]) || ""}
            </p>

            {/* Linked Documents or Evidence */}
            {selectedEvent.media_item_ids && selectedEvent.media_item_ids.length > 0 && (
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                  Linked Primary Archival Records:
                </span>
                <div className="space-y-2">
                  {selectedEvent.media_item_ids.map((itemId: string) => (
                    <Link
                      key={itemId}
                      href={`/reader/${itemId}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-300 text-xs font-bold text-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span>Inspect Associated Document Scan</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() =>
                  addToCollection({
                    id: selectedEvent.id,
                    title: (selectedEvent.title_i18n && selectedEvent.title_i18n[language]) || selectedEvent.id,
                    source: `Milestone: ${selectedEvent.date} (${selectedEvent.category})`,
                    type: "milestone",
                    date: selectedEvent.date
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-zinc-700 text-xs font-bold border border-stone-300 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-accent" />
                <span>Save to Collection</span>
              </button>

              <Link
                href="/map"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-accent" />
                <span>View on Map</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
