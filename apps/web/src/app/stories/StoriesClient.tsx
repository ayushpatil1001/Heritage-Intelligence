"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BookOpen, Clock, ArrowRight, Sparkles, ScrollText, Compass, ShieldCheck } from "lucide-react";

import { STORIES_DATA } from "@/lib/storiesData";


export default function StoriesClient() {
  const { language, t } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-navy-900/10 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-3 py-1 rounded-full border border-gold-200 mb-3">
          <ScrollText className="w-3.5 h-3.5" />
          <span>{t.stories.badge}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 leading-tight">
          {t.stories.title}
        </h1>
        <p className="text-sm md:text-base text-navy-800/75 mt-3 leading-relaxed">
          {t.stories.subtitle}
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STORIES_DATA.map((story) => {
          const title = language === "mr" ? story.titleMr : language === "hi" ? story.titleHi : story.titleEn;
          const subtitle = language === "mr" ? story.subtitleMr : language === "hi" ? story.subtitleHi : story.subtitleEn;

          return (
            <div
              key={story.slug}
              className="bg-white border border-navy-900/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-semibold text-navy-800/60 mb-3">
                  <span className="bg-navy-900 text-white px-2 py-0.5 rounded text-[11px] font-bold">
                    {story.period}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {story.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {story.chaptersCount} {t.stories.chapters}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-serif font-bold text-navy-900 group-hover:text-gold-700 transition-colors">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-navy-800/80 leading-relaxed">
                  {subtitle}
                </p>

                {/* Primary Historic Quote */}
                <div className="mt-5 p-3.5 rounded-lg bg-parchment-100 border-l-4 border-gold-600 text-xs">
                  <p className="italic text-navy-900 font-serif leading-relaxed">
                    {story.quoteEn}
                  </p>
                  <span className="mt-1 block font-semibold text-gold-800 text-[11px]">
                    — {story.quoteSource}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/stories/${story.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
                >
                  <span>{t.stories.experienceButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
