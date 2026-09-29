import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Radio, BookOpen, Volume2, Sparkles } from 'lucide-react';
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

export const AudioKaraokeModule: React.FC<AudioKaraokeModuleProps> = ({
  language,
  ultrasonicDomeActive
}) => {
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
    <div className="space-y-5">
      <div className="stitch-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B2A4A]">
              Archival Speech Recordings &amp; Legal Lexicon
            </span>
            <h2 className="text-xl font-bold text-zinc-900 font-serif-archival mt-0.5">
              Synchronized Voice-to-Transcript Highlighting &amp; Constitutional Vocabulary
            </h2>
          </div>

          {/* Track Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {EDGE_KARAOKE_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  handleReset();
                  setSelectedTrack(track);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  selectedTrack.id === track.id
                    ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                    : 'bg-[#faf9f6] text-zinc-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {track.date}: {track.title.slice(0, 32)}...
              </button>
            ))}
          </div>
        </div>

        {/* Audio Player */}
        <div className="mt-4 p-4 rounded-xl bg-[#faf9f6] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="w-11 h-11 rounded-full bg-[#1B2A4A] hover:bg-[#152238] text-white flex items-center justify-center shadow-2xs cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg bg-white hover:bg-stone-100 text-zinc-700 border border-stone-200 cursor-pointer"
              title="Restart Recording"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">{selectedTrack.title}</h3>
              <p className="text-xs text-zinc-500 font-mono-code">{selectedTrack.source}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:w-48">
              <div className="flex justify-between text-[11px] font-mono-code font-semibold text-[#1B2A4A] mb-1">
                <span>{currentTime.toFixed(1)}s</span>
                <span>{selectedTrack.durationSeconds}.0s</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B2A4A] transition-all duration-300"
                  style={{ width: `${(currentTime / selectedTrack.durationSeconds) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split View: Synchronized Karaoke Segments (Left) + Archaic Parliamentary Lexicon (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 stitch-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-xs font-semibold uppercase text-[#1B2A4A] flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#1B2A4A]" /> Synchronized Transcript
            </span>
            <span className="text-xs text-zinc-500">
              Language: <strong className="text-zinc-900">{LANGUAGE_LABELS[language].native}</strong>
            </span>
          </div>

          <div className="space-y-3">
            {selectedTrack.segments.map((seg) => {
              const isActive = currentTime >= seg.startTime && currentTime < seg.endTime;
              return (
                <div
                  key={seg.id}
                  onClick={() => {
                    setCurrentTime(seg.startTime);
                    if (seg.terms[0]) setSelectedTermKey(seg.terms[0]);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F8FAFC] border-[#1B2A4A] shadow-2xs'
                      : 'bg-[#faf9f6] border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono-code font-semibold text-[#1B2A4A] mb-1">
                    <span>
                      [{seg.startTime}s – {seg.endTime}s] {isActive && '• Playing'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {seg.terms.map((t) => (
                        <button
                          key={t}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTermKey(t);
                          }}
                          className="px-2 py-0.5 rounded bg-white text-[#1B2A4A] border border-stone-300 hover:bg-stone-100 cursor-pointer"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className={`text-base font-serif-archival ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-800'}`}>
                    &ldquo;{seg.en}&rdquo;
                  </p>
                  <p className="text-sm text-zinc-600 font-medium mt-1.5">
                    {language === 'hi' ? seg.hi : seg.mr}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Parliamentary & Constitutional Lexicon Decoder */}
        <div className="lg:col-span-5 stitch-card rounded-2xl p-6 space-y-4 border-t-2 border-t-[#1B2A4A]">
          <div className="border-b border-stone-200 pb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1B2A4A] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#1B2A4A]" /> Parliamentary &amp; Legal Glossary
            </span>
            <h3 className="text-lg font-bold text-zinc-900 font-serif-archival mt-1">{activeLexicon.term}</h3>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200 space-y-3">
            <div>
              <span className="text-[11px] font-semibold uppercase text-[#1B2A4A] block mb-1">
                English Constitutional Meaning:
              </span>
              <p className="text-sm text-zinc-800 leading-relaxed">{activeLexicon.en}</p>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <span className="text-[11px] font-semibold uppercase text-zinc-500 block mb-1">
                मराठी स्पष्टीकरण (Marathi):
              </span>
              <p className="text-sm text-zinc-900 font-medium leading-relaxed">{activeLexicon.mr}</p>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <span className="text-[11px] font-semibold uppercase text-zinc-500 block mb-1">
                हिन्दी व्याख्या (Hindi):
              </span>
              <p className="text-sm text-zinc-800 leading-relaxed">{activeLexicon.hi}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-zinc-500 block mb-2">
              Indexed Constitutional Terms:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(EDGE_PARLIAMENTARY_LEXICON).map((termKey) => (
                <button
                  key={termKey}
                  onClick={() => setSelectedTermKey(termKey)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer ${
                    selectedTermKey === termKey
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                      : 'bg-[#faf9f6] text-zinc-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Sparkles className="w-3 h-3 inline mr-1 opacity-70" />
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
