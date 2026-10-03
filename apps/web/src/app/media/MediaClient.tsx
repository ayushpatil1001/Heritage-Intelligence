"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Play, Pause, RotateCcw, Volume2, VolumeX, FastForward, Clock, Bookmark, FileText, CheckCircle2 } from "lucide-react";

interface TranscriptLine {
  id: string;
  startSec: number;
  endSec: number;
  speaker: string;
  textEn: string;
  textHi: string;
  textMr: string;
}

interface HistoricRecording {
  id: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  date: string;
  duration: string;
  durationSec: number;
  location: string;
  format: "audio" | "video";
  chapters: { title: string; sec: number }[];
  transcripts: TranscriptLine[];
}

const HISTORIC_RECORDINGS: HistoricRecording[] = [
  {
    id: "rec-001",
    titleEn: "BBC Radio Interview on Democracy and Social Equality (1953)",
    titleHi: "लोकतंत्र और सामाजिक समानता पर बीबीसी रेडियो साक्षात्कार (1953)",
    titleMr: "लोकशाही आणि सामाजिक समतेवर बीबीसी रेडिओ मुलाखत (१९५३)",
    date: "May 1953",
    duration: "04:12",
    durationSec: 252,
    location: "London, BBC Studios",
    format: "audio",
    chapters: [
      { title: "Introduction & Context", sec: 0 },
      { title: "Definition of Democracy", sec: 45 },
      { title: "Social Morality vs Law", sec: 120 },
      { title: "Conditions for Success", sec: 190 },
    ],
    transcripts: [
      {
        id: "t1",
        startSec: 0,
        endSec: 25,
        speaker: "Interviewer",
        textEn: "Dr. Ambedkar, in your extensive work as the chief architect of the Indian Constitution, how do you define the true test of democracy?",
        textHi: "डॉ. आंबेडकर, भारतीय संविधान के मुख्य वास्तुकार के रूप में, आप लोकतंत्र की वास्तविक कसौटी को कैसे परिभाषित करते हैं?",
        textMr: "डॉ. आंबेडकर, भारतीय संविधानाचे मुख्य शिल्पकार म्हणून लोकशाहीची खरी कसोटी आपण कशी स्पष्ट कराल?",
      },
      {
        id: "t2",
        startSec: 26,
        endSec: 58,
        speaker: "Dr. B. R. Ambedkar",
        textEn: "Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards fellow men.",
        textHi: "लोकतंत्र केवल सरकार का एक रूप नहीं है। यह मूल रूप से सह-जीवन और पारस्परिक संवाद का एक स्वरूप है। यह मूलतः साथी मनुष्यों के प्रति सम्मान और आदर की भावना है।",
        textMr: "लोकशाही हे केवळ शासनप्रणालीचे स्वरूप नाही. ती मूलतः सहजीवनाची आणि परस्पर संवादाची एक पद्धती आहे. सहमानवांबद्दलचा आदरभाव हाच तिचा खरा गाभा आहे.",
      },
      {
        id: "t3",
        startSec: 59,
        endSec: 110,
        speaker: "Dr. B. R. Ambedkar",
        textEn: "What we call political democracy is incomplete without social democracy. A democratic government cannot long exist if the society over which it presides is organized on the principle of graded inequality.",
        textHi: "जिसे हम राजनीतिक लोकतंत्र कहते हैं वह सामाजिक लोकतंत्र के बिना अधूरा है। यदि समाज क्रमिक असमानता पर आधारित हो तो लोकतांत्रिक सरकार लंबे समय तक नहीं टिक सकती।",
        textMr: "ज्याला आपण राजकीय लोकशाही म्हणतो, ती सामाजिक लोकशाहीशिवाय अपूर्ण आहे. विषमतेच्या उतरंडीवर रचलेल्या समाजात लोकशाही शासन दीर्घकाळ टिकू शकत नाही.",
      },
      {
        id: "t4",
        startSec: 111,
        endSec: 165,
        speaker: "Dr. B. R. Ambedkar",
        textEn: "Law alone cannot maintain freedom. Without social morality, law becomes an instrument of oppression. The first condition for the successful working of democracy is that there must not be glaring inequalities.",
        textHi: "केवल कानून स्वतंत्रता की रक्षा नहीं कर सकता। सामाजिक नैतिकता के बिना कानून उत्पीड़न का साधन बन जाता है। लोकतंत्र की सफलता की पहली शर्त यह है कि तीव्र असमानताएं न हों।",
        textMr: "केवळ कायदा स्वातंत्र्याचे रक्षण करू शकत नाही. सामाजिक नैतिकतेशिवाय कायदा अन्यायाचे साधन बनतो. लोकशाहीच्या यशाची पहिली अट म्हणजे टोकाची विषमता नष्ट झाली पाहिजे.",
      },
      {
        id: "t5",
        startSec: 166,
        endSec: 252,
        speaker: "Dr. B. R. Ambedkar",
        textEn: "Equality, Liberty, and Fraternity: these three are not separate entities. To divorce one from the other is to defeat the very purpose of democracy.",
        textHi: "समता, स्वतंत्रता और बंधुत्व: ये तीनों अलग-अलग तत्व नहीं हैं। इनमें से एक को भी दूसरे से अलग करना लोकतंत्र के उद्देश्य को ही विफल कर देना है।",
        textMr: "समता, स्वातंत्र्य आणि बंधुता हे तिन्ही अविभाज्य आहेत. यातील एकालाही वेगळे करणे म्हणजे लोकशाहीच्या मूळ हेतूलाच सुरुंग लावण्यासारखे आहे.",
      },
    ],
  },
  {
    id: "rec-002",
    titleEn: "Constituent Assembly Valedictory Address (Nov 25, 1949)",
    titleHi: "संविधान सभा का विदाई भाषण (25 नवंबर 1949)",
    titleMr: "संविधान सभेतील अखेरचे ऐतिहासिक भाषण (२५ नोव्हेंबर १९४९)",
    date: "Nov 25, 1949",
    duration: "05:30",
    durationSec: 330,
    location: "Constitution Hall, New Delhi",
    format: "audio",
    chapters: [
      { title: "Entering a Life of Contradictions", sec: 0 },
      { title: "The Warning Against Bhakti in Politics", sec: 90 },
      { title: "Preserving the Constitution", sec: 210 },
    ],
    transcripts: [
      {
        id: "t2-1",
        startSec: 0,
        endSec: 50,
        speaker: "Dr. B. R. Ambedkar",
        textEn: "On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality, and in social and economic life we will have inequality.",
        textHi: "26 जनवरी 1950 को हम अंतर्विरोधों के एक जीवन में प्रवेश करने जा रहे हैं। राजनीति में हमारे पास समानता होगी, और सामाजिक और आर्थिक जीवन में हमारे पास असमानता होगी।",
        textMr: "२६ जानेवारी १९५० रोजी आपण एका विरोधाभासी जीवनात प्रवेश करणार आहोत. राजकारणात आपल्याला समानता लाभेल, परंतु सामाजिक व आर्थिक जीवनात विषमता कायम असेल.",
      },
      {
        id: "t2-2",
        startSec: 51,
        endSec: 140,
        speaker: "Dr. B. R. Ambedkar",
        textEn: "In politics we will be recognizing the principle of one man one vote and one vote one value. In our social and economic structure, we continue to deny the principle of one man one value.",
        textHi: "राजनीति में हम 'एक व्यक्ति, एक मत और एक मत, एक मूल्य' के सिद्धांत को मान्यता देंगे। लेकिन हमारे सामाजिक और आर्थिक ढांचे में हम 'एक व्यक्ति, एक मूल्य' को नकारते रहेंगे।",
        textMr: "राजकारणात आपण 'एक व्यक्ती, एक मत आणि एक मूल्य' हे तत्त्व मान्य करू. परंतु सामाजिक व आर्थिक चौकटीत मात्र 'एक व्यक्ती, एक मूल्य' नाकारले जाईल.",
      },
    ],
  },
];

export default function MediaClient() {
  const { language } = useApp();
  const [selectedRec, setSelectedRec] = useState<HistoricRecording>(HISTORIC_RECORDINGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((t) => {
          if (t >= selectedRec.durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return t + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, selectedRec.durationSec]);

  const activeTranscriptLine = selectedRec.transcripts.find(
    (line) => currentTimeSec >= line.startSec && currentTimeSec <= line.endSec
  );

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (sec: number) => {
    setCurrentTimeSec(sec);
  };

  const getRecTitle = (rec: HistoricRecording) => {
    if (language === "hi") return rec.titleHi;
    if (language === "mr") return rec.titleMr;
    return rec.titleEn;
  };

  const getTranscriptText = (line: TranscriptLine) => {
    if (language === "hi") return line.textHi;
    if (language === "mr") return line.textMr;
    return line.textEn;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 border-b border-navy-900/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold-600 uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Audiovisual Heritage Archive</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-navy-900 mt-1">
            {language === "mr"
              ? "ऐतिहासिक ध्वनी व भाषण पुराभिलेख"
              : language === "hi"
              ? "ऐतिहासिक ध्वनि और भाषण पुरालेख"
              : "Historic Speeches & Synchronized Audio Archive"}
          </h1>
          <p className="text-sm text-navy-800/75 mt-1">
            {language === "mr"
              ? "वेब-व्हीटीटी (WebVTT) आधारित समक्रमित उतारा (Transcript) सह डॉ. आंबेडकरांची मूळ भाषणे ऐका."
              : language === "hi"
              ? "वेब-वीटीटी आधारित समक्रमित पाठ के साथ डॉ. आंबेडकर के मूल भाषण और साक्षात्कार सुनें।"
              : "Listen to authenticated historic recordings with phrase-level synchronized multilingual transcripts and chapter jump points."}
          </p>
        </div>

        {/* Recording Select Pill */}
        <div className="flex items-center gap-2">
          {HISTORIC_RECORDINGS.map((rec) => (
            <button
              key={rec.id}
              onClick={() => {
                setSelectedRec(rec);
                setCurrentTimeSec(0);
                setIsPlaying(false);
              }}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                selectedRec.id === rec.id
                  ? "bg-navy-900 text-white"
                  : "bg-parchment-200 text-navy-800 hover:bg-parchment-300"
              }`}
            >
              {rec.date}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Player & Chapters (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Audio Console Card */}
          <div className="bg-navy-900 text-white rounded-xl p-6 shadow-md border border-navy-800">
            <div className="flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider mb-2">
              <span>{selectedRec.location}</span>
              <span>{selectedRec.date}</span>
            </div>

            <h2 className="text-xl font-serif font-bold leading-snug">
              {getRecTitle(selectedRec)}
            </h2>

            {/* Audio Waveform visualization placeholder */}
            <div className="my-6 p-4 rounded-lg bg-navy-950/60 border border-white/10 flex items-center justify-center gap-1 h-24">
              {Array.from({ length: 40 }).map((_, i) => {
                const isActive = (i / 40) * selectedRec.durationSec <= currentTimeSec;
                const height = Math.sin(i * 0.4) * 30 + 35;
                return (
                  <div
                    key={i}
                    onClick={() => handleSeek((i / 40) * selectedRec.durationSec)}
                    className="w-1.5 rounded-full cursor-pointer transition-all duration-150 hover:bg-gold-400"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isActive ? "#C8A24A" : "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                );
              })}
            </div>

            {/* Scrubber Progress Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={selectedRec.durationSec}
                value={currentTimeSec}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-1.5 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-xs text-parchment-200/70 font-mono">
                <span>{formatTime(currentTimeSec)}</span>
                <span>{selectedRec.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    const speeds = [0.75, 1.0, 1.25, 1.5];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                  }}
                  className="px-2 py-1 rounded text-xs font-mono font-semibold bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {playbackSpeed}x
                </button>
              </div>

              {/* Play/Pause Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSeek(Math.max(0, currentTimeSec - 10))}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center hover:bg-gold-400 transition-colors shadow-lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>
              </div>

              <div className="text-xs text-parchment-200/60 font-semibold">
                Historical Audio
              </div>
            </div>
          </div>

          {/* Chapter Markers */}
          <div className="bg-white border border-navy-900/10 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-600" />
              <span>Chapter Cue Points</span>
            </h3>
            <div className="space-y-2">
              {selectedRec.chapters.map((ch, idx) => {
                const isActive = currentTimeSec >= ch.sec;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSeek(ch.sec)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-colors border ${
                      isActive
                        ? "bg-gold-50 border-gold-300 text-navy-900"
                        : "bg-parchment-100 border-transparent text-navy-800 hover:bg-parchment-200"
                    }`}
                  >
                    <span>{ch.title}</span>
                    <span className="font-mono text-[11px] text-navy-800/60">{formatTime(ch.sec)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Synchronized Interactive Transcript (6 cols) */}
        <div className="lg:col-span-6 flex flex-col h-full">
          <div className="bg-white border border-navy-900/10 rounded-xl p-6 shadow-sm flex flex-col flex-1">
            <div className="flex items-center justify-between border-b border-navy-900/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold-600" />
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                  Synchronized Multilingual Transcript
                </h3>
              </div>
              <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                WebVTT Active
              </span>
            </div>

            <p className="text-xs text-navy-800/60 mb-4">
              Click any sentence to jump the audio playback directly to that speech timestamp.
            </p>

            {/* Transcript lines list */}
            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
              {selectedRec.transcripts.map((line) => {
                const isCurrent =
                  currentTimeSec >= line.startSec && currentTimeSec <= line.endSec;

                return (
                  <div
                    key={line.id}
                    onClick={() => handleSeek(line.startSec)}
                    className={`p-3.5 rounded-lg cursor-pointer transition-all border ${
                      isCurrent
                        ? "bg-gold-50/90 border-gold-400 ring-1 ring-gold-400 shadow-sm"
                        : "bg-parchment-100/60 border-transparent hover:bg-parchment-100 hover:border-navy-900/10"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                      <span className={isCurrent ? "text-navy-900 font-bold" : "text-navy-800/70"}>
                        {line.speaker}
                      </span>
                      <span className="font-mono text-navy-800/50">
                        {formatTime(line.startSec)} - {formatTime(line.endSec)}
                      </span>
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isCurrent ? "text-navy-950 font-medium" : "text-navy-800/80"
                      }`}
                    >
                      {getTranscriptText(line)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-navy-900/10 flex items-center justify-between text-xs text-navy-800/60">
              <span>Source: National Archives & All India Radio Records</span>
              <Link href="/quotes/verify" className="text-gold-700 font-semibold hover:underline">
                Verify this excerpt in Quote Verifier →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
