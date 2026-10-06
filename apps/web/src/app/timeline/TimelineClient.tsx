"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { toDDMMYYYY } from "@/lib/utils";
import {
  Clock, Calendar, BookOpen, MapPin, Award,
  ArrowRight, Filter, Bookmark, ExternalLink
} from "lucide-react";
import { TIMELINE_EVENTS } from "@/lib/timelineData";

export default function TimelineClient() {
  const { language, t, addToCollection } = useApp();
  const [events, setEvents] = useState<any[]>(TIMELINE_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<any>(TIMELINE_EVENTS[0] || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/v1/timeline")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0]?.title_i18n) {
          setEvents(data);
          setSelectedEvent((prev: any) => prev || data[0]);
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
            {t.timeline.title}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            {t.timeline.subtitle}
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
              {t.timeline.categories[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Timeline Stream (Col 7) */}
        <div className="lg:col-span-7 space-y-4 max-h-[520px] lg:max-h-[800px] overflow-y-auto pr-1 sm:pr-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-primary mb-2">
            {t.timeline.chronologicalArchive}
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
                className={`p-4 sm:p-6 rounded-2xl border transition-all cursor-pointer flex gap-3 sm:gap-4 ${
                  isSelected
                    ? "bg-[#F8FAFC] border-2 border-primary shadow-md"
                    : "bg-white border-stone-300 hover:border-stone-400 shadow-xs"
                }`}
              >
                {/* Year Marker */}
                <div className="shrink-0 flex flex-col items-center">
                  <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary text-accent font-serif font-bold text-base sm:text-lg flex items-center justify-center shadow-xs">
                    {year}
                  </span>
                  <div className="w-0.5 flex-1 bg-stone-200 mt-2" />
                </div>

                {/* Event Summary */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-accent/20 text-[#8F6B1E] font-bold text-[10px] uppercase tracking-wider">
                      {t.timeline.categories[ev.category] || ev.category}
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
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl border border-stone-300 p-5 sm:p-8 shadow-sm space-y-6 sticky top-28">
            <div className="space-y-2 border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block">
                {(t.timeline.categories[selectedEvent.category] || selectedEvent.category)} • {t.timeline.dossierTitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary leading-tight">
                {(selectedEvent.title_i18n && selectedEvent.title_i18n[language]) || selectedEvent.id}
              </h2>
              <span className="text-xs text-zinc-500 font-mono block">
                {toDDMMYYYY(selectedEvent.date)}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-800 font-sans">
              {(selectedEvent.description_i18n && selectedEvent.description_i18n[language]) || ""}
            </p>

            {/* Linked Documents or Evidence */}
            {selectedEvent.media_item_ids && selectedEvent.media_item_ids.length > 0 && (
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                  {t.timeline.linkedRecords}
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
                        <span>{t.timeline.inspectAssociated}</span>
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
                <span>{t.reader.addToCollection}</span>
              </button>

              <Link
                href="/map"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-accent" />
                <span>{t.map.jumpTo}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
