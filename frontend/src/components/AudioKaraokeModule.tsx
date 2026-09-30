import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Volume2 } from 'lucide-react';
import {
  EDGE_KARAOKE_TRACKS,
  EDGE_PARLIAMENTARY_LEXICON,
  KaraokeTrack,
  LANGUAGE_LABELS,
  SupportedLanguage
} from '../data/edgeCorpus';

interface AudioKaraokeModuleProps {
  language: SupportedLanguage;
  ultrasonicDomeActive: boolean;
}

export const AudioKaraokeModule: React.FC<AudioKaraokeModuleProps> = ({ language }) => {
  const [selectedTrack, setSelectedTrack] = useState<KaraokeTrack>(EDGE_KARAOKE_TRACKS[0]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedTermKey, setSelectedTermKey] = useState<string>('Grammar of Anarchy');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= selectedTrack.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return Number((prev + 0.5).toFixed(1));
        });
      }, 500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, selectedTrack]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const activeSeg =
          selectedTrack.segments.find((s) => currentTime >= s.startTime && currentTime < s.endTime) ||
          selectedTrack.segments[0];
        const textToSpeak =
          language === 'mr' ? activeSeg.mr : language === 'hi' ? activeSeg.hi : activeSeg.en;
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = LANGUAGE_LABELS[language].ttsLang;
        utter.rate = 0.94;
        window.speechSynthesis.speak(utter);
      }
      setIsPlaying(true);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const activeLexicon = EDGE_PARLIAMENTARY_LEXICON[selectedTermKey] || EDGE_PARLIAMENTARY_LEXICON['Grammar of Anarchy'];

  return (
    <div className="space-y-8">
      {/* Audio Player Card with Defined Borders */}
      <div className="bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
        {/* Track Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif-archival font-bold text-zinc-900 leading-snug">
              {selectedTrack.title}
            </h2>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">{selectedTrack.source} ({selectedTrack.date})</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {EDGE_KARAOKE_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  handleReset();
                  setSelectedTrack(track);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  selectedTrack.id === track.id
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-xs'
                    : 'bg-stone-50 text-zinc-700 border-stone-300 hover:bg-white hover:text-zinc-900'
                }`}
              >
                {track.date}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-50/70 border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="w-11 h-11 rounded-full bg-[#1B2A4A] hover:bg-[#142038] text-white flex items-center justify-center shadow-xs cursor-pointer border border-[#1B2A4A] transition-colors"
              aria-label={isPlaying ? 'Pause Speech' : 'Play Speech'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white hover:bg-stone-100 text-zinc-700 border border-stone-300 cursor-pointer shadow-2xs"
              title="Restart Recording"
              aria-label="Restart Recording"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-zinc-800">
              {isPlaying ? 'Playing speech recording...' : 'Click play to start narration'}
            </span>
          </div>

          <div className="w-full sm:w-72 flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono-code">{currentTime.toFixed(1)}s</span>
            <div className="flex-1 h-2.5 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
              <div
                className="h-full bg-[#1B2A4A] transition-all duration-300"
                style={{ width: `${(currentTime / selectedTrack.durationSeconds) * 100}%` }}
              />
            </div>
            <span className="text-xs text-zinc-500 font-mono-code">{selectedTrack.durationSeconds}s</span>
          </div>
        </div>
      </div>

      {/* Split View: Synchronized Text (Left) + Constitutional Glossary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Synchronized Transcript */}
        <div className="lg:col-span-7 bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#1B2A4A]" /> Speech Transcript
            </h3>
            <span className="text-xs text-zinc-500 font-medium">
              Translation: <strong className="text-zinc-800">{LANGUAGE_LABELS[language].native}</strong>
            </span>
          </div>

          <div className="space-y-3.5">
            {selectedTrack.segments.map((seg) => {
              const isActive = currentTime >= seg.startTime && currentTime < seg.endTime;
              return (
                <div
                  key={seg.id}
                  onClick={() => {
                    setCurrentTime(seg.startTime);
                    if (seg.terms[0]) setSelectedTermKey(seg.terms[0]);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F8FAFC] border-2 border-[#1B2A4A] shadow-xs'
                      : 'bg-stone-50/60 border-stone-300 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                    <span className="font-mono-code font-medium">
                      {seg.startTime}s – {seg.endTime}s
                    </span>
                    <div className="flex items-center gap-1.5">
                      {seg.terms.map((t) => (
                        <button
                          key={t}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTermKey(t);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white text-[#1B2A4A] border border-stone-300 hover:bg-stone-50 text-[11px] font-semibold cursor-pointer shadow-2xs"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className={`text-sm sm:text-[14.5px] font-serif-archival leading-relaxed ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-800'}`}>
                    &ldquo;{seg.en}&rdquo;
                  </p>
                  <p className="text-xs sm:text-[13px] text-zinc-600 mt-1.5 leading-relaxed">
                    {language === 'hi' ? seg.hi : seg.mr}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Constitutional Glossary */}
        <div className="lg:col-span-5 bg-white border border-stone-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1B2A4A]" /> Constitutional Term Decoder
            </h3>
            <div className="text-lg font-serif-archival font-bold text-[#1B2A4A] mt-1.5">
              {activeLexicon.term}
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50/70 border border-stone-300 space-y-4 shadow-2xs text-xs sm:text-sm">
            <div>
              <span className="text-[11px] font-bold text-[#1B2A4A] uppercase tracking-wide block mb-1">
                English Meaning:
              </span>
              <p className="text-zinc-700 leading-relaxed">{activeLexicon.en}</p>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide block mb-1">
                मराठी स्पष्टीकरण (Marathi):
              </span>
              <p className="text-zinc-800 leading-relaxed font-medium">{activeLexicon.mr}</p>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide block mb-1">
                हिन्दी व्याख्या (Hindi):
              </span>
              <p className="text-zinc-700 leading-relaxed">{activeLexicon.hi}</p>
            </div>
          </div>

          <div>
            <span className="text-xs text-zinc-600 font-semibold block mb-2.5">
              Select term to inspect:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(EDGE_PARLIAMENTARY_LEXICON).map((termKey) => (
                <button
                  key={termKey}
                  onClick={() => setSelectedTermKey(termKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                    selectedTermKey === termKey
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-xs'
                      : 'bg-stone-50 text-zinc-700 border-stone-300 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  {termKey}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
