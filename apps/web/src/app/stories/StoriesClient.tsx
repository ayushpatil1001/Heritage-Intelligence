"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BookOpen, Clock, ArrowRight, ScrollText } from "lucide-react";
import { STORIES_DATA } from "@/lib/storiesData";

export default function StoriesClient() {
  const { language, t } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 border-b border-stone-300 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#886524] bg-[#FDF8ED] px-3.5 py-1.5 rounded-full border border-[#F4DF9E] mb-3 shadow-xs">
          <ScrollText className="w-3.5 h-3.5 text-[#C8A24A]" />
          <span>{t.stories.badge}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B2A6F] text-primary leading-tight">
          {t.stories.title}
        </h1>
        <p className="text-sm md:text-base text-zinc-600 mt-3 leading-relaxed">
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
              className="bg-white border border-stone-300 hover:border-stone-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 mb-3">
                  <span className="bg-[#0B2A6F] bg-primary text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-xs">
                    {story.period}
                  </span>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {story.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-accent" />
                      {story.chaptersCount} {t.stories.chapters}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-serif font-bold text-[#0B2A6F] text-primary hover:text-gold-700 transition-colors">
                  {title}
                </h2>

                <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                  {subtitle}
                </p>

                {/* Primary Historic Quote */}
                <div className="mt-5 p-4 rounded-xl bg-[#FDF8ED] border-l-4 border-[#C8A24A] text-xs shadow-xs">
                  <p className="italic text-zinc-900 font-serif leading-relaxed text-xs sm:text-sm">
                    {story.quoteEn}
                  </p>
                  <span className="mt-1.5 block font-bold text-[#886524] text-[11px]">
                    — {story.quoteSource}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                <Link
                  href={`/stories/${story.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B2A6F] bg-primary text-white text-xs font-bold hover:bg-[#081E50] transition-all shadow-sm cursor-pointer"
                >
                  <span>{t.stories.experienceButton}</span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
