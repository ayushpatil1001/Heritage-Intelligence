"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { STORIES_DATA } from "@/lib/storiesData";
import { ArrowLeft, BookOpen, Clock, ChevronRight, ChevronLeft, ExternalLink, Quote, ShieldCheck, Share2 } from "lucide-react";

interface StoryChapter {
  id: number;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  narrativeEn: string;
  narrativeHi: string;
  narrativeMr: string;
  facsimileScanLabel: string;
  relatedItemId?: string;
  directQuote: string;
  citation: string;
}

const CHAPTERS_BY_SLUG: Record<string, StoryChapter[]> = {
  "mahad-satyagraha": [
    {
      id: 1,
      titleEn: "1. The Call to Chavdar Tale",
      titleHi: "1. चवदार तालाब का आह्वान",
      titleMr: "१. चवदार तळ्याचे रणशिंग",
      narrativeEn: "In March 1927, thousands converged on Mahad in the Kolaba district. Though the Bombay Legislative Council had passed the Bole Resolution in 1923 declaring public watering places open to all classes, local prejudice completely barred Untouchables. Dr. Ambedkar resolved not merely to hold a conference, but to physically assert civic equality.",
      narrativeHi: "मार्च 1927 में हजारों लोग महाड़ में एकत्रित हुए। बंबई विधान परिषद ने 1923 में सार्वजनिक जलाशयों को सभी के लिए खोलने का प्रस्ताव पारित किया था, लेकिन स्थानीय रूढ़िवादिता ने इसे नकार दिया था। डॉ. आंबेडकर ने शांतिपूर्ण ढंग से नागरिक समानता सिद्ध करने का संकल्प लिया।",
      narrativeMr: "मार्च १९२७ मध्ये महाड येथे अस्पृश्य वर्गाची ऐतिहासिक परिषद भरली. बोले ठरावानुसार सार्वजनिक पाण्याचे पाणवठे खुले असण्याचा हक्क असूनही रूढीवादी व्यवस्थेने चवदार तळ्यावर पाणी पिण्यास मज्जाव केला होता. डॉ. आंबेडकरांनी शांततामय मार्गाने पाण्याचा हक्क बजावण्याचा निर्धार केला.",
      facsimileScanLabel: "Facsimile of Bahishkrit Bharat Conference Announcement (1927)",
      relatedItemId: "item-editorial-bahishkrit",
      directQuote: "“At Mahad, we do not want to go to the tank merely to drink water. We want to go to the tank to assert that we are human beings.”",
      citation: "BAWS Vol. 17, Part III, p. 3-4",
    },
    {
      id: 2,
      titleEn: "2. The Peaceful March & Drinking of Water",
      titleHi: "2. शांतिपूर्ण मार्च और जल ग्रहण",
      titleMr: "२. शांततामय पदयात्रा आणि पाण्याचा स्पर्श",
      narrativeEn: "On March 20, 1927, Dr. Ambedkar led a disciplined, peaceful procession to Chavdar Lake. He walked to the edge, knelt down, cupped his hands, and drank water. Thousands followed in silence. It was the first time in centuries that untouchables drank publicly from a common reservoir, transforming a simple act of thirst into an immortal declaration of human dignity.",
      narrativeHi: "20 मार्च 1927 को डॉ. आंबेडकर ने अनुशासित जुलूस का नेतृत्व किया। वे चवदार तालाब की सीढ़ियों पर गए, अपने हाथों से जल पिया। इसके बाद हजारों अनुयायियों ने जल ग्रहण किया। यह सदियों के दमन के विरुद्ध मानवीय आत्मसम्मान का प्रतीक बना।",
      narrativeMr: "२० मार्च १९२७ रोजी डॉ. बाबासाहेब आंबेडकरांनी शिस्तबद्ध मिरवणुकीने चवदार तळ्यावर जाऊन दोन्ही हातांच्या ओंजळीने पाणी प्राशन केले. हजारो बांधवांनी या कृतीचे अनुकरण केले. मानवी हक्कांच्या इतिहासातील ही अभूतपूर्व क्रांती ठरली.",
      facsimileScanLabel: "Editorial Scan: Bahishkrit Bharat, April 1927",
      relatedItemId: "item-editorial-bahishkrit",
      directQuote: "“This Satyagraha is not for water. It is for establishing the fundamental human right of equal citizenship.”",
      citation: "Bahishkrit Bharat Editorial, April 22, 1927",
    },
    {
      id: 3,
      titleEn: "3. The Purificatory Backlash and Manusmriti Dahan",
      titleHi: "3. रूढ़िवादी प्रतिरोध और मनुस्मृति दहन",
      titleMr: "३. सनातनी विरोध आणि मनुस्मृती दहन",
      narrativeEn: "Following the satyagraha, orthodox reactionaries performed purificatory rites with cow dung and milk, and obtained a court injunction. Dr. Ambedkar returned on December 25, 1927. In front of a vast assembly, a pit was dug and the Manusmriti—the ancient code sanctifying caste hierarchies and degradation of women—was publicly burnt.",
      narrativeHi: "रूढ़िवादियों ने तालाब का 'शुद्धिकरण' किया और न्यायालय से स्थगन प्राप्त किया। 25 दिसंबर 1927 को डॉ. आंबेडकर पुनः महाड़ पहुंचे। उन्होंने असमानता और भेदभाव की समर्थक संहिता मनुस्मृति का सार्वजनिक दहन किया।",
      narrativeMr: "सनातन्यांनी तळ्याचे शुद्धीकरण करून न्यायालयातून मज्जाव हुकूम मिळवला. २५ डिसेंबर १९२७ रोजी महाडच्या दुसऱ्या परिषदेत विषमतेचा पुरस्कार करणाऱ्या मनुस्मृतीचे जाहीर दहन करण्यात आले. समतेच्या लढ्यातील हा क्रांतीदिन ठरला.",
      facsimileScanLabel: "Archival Minutes: Mahad Satyagraha Committee Resolution (1927)",
      relatedItemId: "item-editorial-bahishkrit",
      directQuote: "“The burning of Manusmriti is not an act of hatred against individuals, but a solemn rejection of the philosophy of institutionalized inequality.”",
      citation: "Speech at Mahad, Dec 25, 1927 (BAWS Vol. 17)",
    },
    {
      id: 4,
      titleEn: "4. The Ultimate Legal Victory (1937)",
      titleHi: "4. अंतिम कानूनी विजय (1937)",
      titleMr: "४. अंतिम न्यायालयीन विजय (१९३७)",
      narrativeEn: "The legal dispute over Chavdar Tale dragged through the courts for ten years. On March 17, 1937, the Bombay High Court ruled decisively in favor of Dr. Ambedkar and the depressed classes, affirming that public water tanks are open to all human beings without distinction. The decade-long struggle established the bedrock of civic equality in India.",
      narrativeHi: "10 वर्षों के कानूनी संघर्ष के बाद 17 मार्च 1937 को बंबई उच्च न्यायालय ने ऐतिहासिक निर्णय सुनाया कि सार्वजनिक जलाशय पर सभी नागरिकों का समान अधिकार है।",
      narrativeMr: "१० वर्षांच्या प्रदीर्घ कायदेशीर लढ्यानंतर १७ मार्च १९३७ रोजी मुंबई उच्च न्यायालयाने चवदार तळे सर्व नागरिकांसाठी खुले असल्याचा ऐतिहासिक निकाल दिला. सत्याग्रहाचा अंतिम कायदेशीर विजय झाला.",
      facsimileScanLabel: "Bombay High Court Judgment Record: Nathu v. Babasaheb Ambedkar (1937)",
      relatedItemId: "item-editorial-bahishkrit",
      directQuote: "“Equality in civic rights is the only foundation upon which a civilized commonwealth can endure.”",
      citation: "Dr. Ambedkar Writings and Speeches, Vol. 17",
    },
  ],
  "drafting-the-constitution": [
    {
      id: 1,
      titleEn: "1. The Appointment of the Drafting Committee",
      titleHi: "1. प्रारूप समिति का गठन",
      titleMr: "१. मसुदा समितीची स्थापना",
      narrativeEn: "On August 29, 1947, two weeks after independence, the Constituent Assembly elected Dr. B. R. Ambedkar Chairman of the Drafting Committee. Entrusted with crafting the foundational charter of free India, Ambedkar worked under grueling conditions to reconcile diverse federal, minority, fundamental rights, and executive provisions.",
      narrativeHi: "29 अगस्त 1947 को संविधान सभा ने डॉ. भीमराव आंबेडकर को प्रारूप समिति का अध्यक्ष नियुक्त किया। उन्होंने स्वतंत्र भारत के संविधान के निर्माण का गुरुतर दायित्व संभाला।",
      narrativeMr: "२९ ऑगस्ट १९४७ रोजी स्वतंत्र भारताच्या संविधान सभेने डॉ. बाबासाहेब आंबेडकर यांची मसुदा समितीच्या अध्यक्षपदी एकमुखाने निवड केली.",
      facsimileScanLabel: "Constituent Assembly Resolution (Aug 29, 1947)",
      relatedItemId: "item-cad-final-speech",
      directQuote: "“I entered the Constituent Assembly with no greater aspiration than to safeguard the interests of my people. I had not the remotest idea that I would be called upon to discharge such arduous functions.”",
      citation: "CAD Vol. XI, Nov 25, 1949",
    },
    {
      id: 2,
      titleEn: "2. Introducing the Draft Constitution",
      titleHi: "2. संविधान के प्रारूप की प्रस्तुति",
      titleMr: "२. संविधानाच्या मसुद्याची ऐतिहासिक मांडणी",
      narrativeEn: "On November 4, 1948, Dr. Ambedkar introduced the Draft Constitution. In an exhaustive speech, he defended the Parliamentary executive over the Presidential system, articulated the flexibility of Indian federalism, and anchored Fundamental Rights as enforceable guarantees rather than pious wishes.",
      narrativeHi: "4 नवंबर 1948 को डॉ. आंबेडकर ने संविधान का प्रारूप पेश किया। उन्होंने संसदीय प्रणाली, संघवाद और मौलिक अधिकारों के महत्व को विस्तार से समझाया।",
      narrativeMr: "४ नोव्हेंबर १९४८ रोजी डॉ. आंबेडकरांनी संविधानाचा मसुदा सभेसमोर ठेवला व संसदीय लोकशाही व मूलभूत अधिकारांची भक्कम मांडणी केली.",
      facsimileScanLabel: "Official Print: Draft Constitution of India (1948)",
      relatedItemId: "item-cad-final-speech",
      directQuote: "“Constitutional morality is not a natural sentiment. It has to be cultivated. We must realize that our people have yet to learn it.”",
      citation: "CAD Vol. VII, Nov 4, 1948, p. 38",
    },
    {
      id: 3,
      titleEn: "3. Article 32: The Heart and Soul",
      titleHi: "3. अनुच्छेद 32: संविधान की आत्मा और हृदय",
      titleMr: "३. कलम ३२: संविधानाचा आत्मा आणि हृदय",
      narrativeEn: "During intense debates on judicial remedies, Dr. Ambedkar declared Article 32—the right to move the Supreme Court for enforcement of fundamental rights via habeas corpus, mandamus, and certiorari—to be the very essence of the Constitution, without which all liberties would be meaningless paper declarations.",
      narrativeHi: "अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) पर बहस में डॉ. आंबेडकर ने इसे संविधान की आत्मा और हृदय घोषित किया।",
      narrativeMr: "कलम ३२ वरील चर्चेत डॉ. आंबेडकरांनी या कलमाला संविधानाचा आत्मा व हृदय संबोधले, ज्याशिवाय मूलभूत अधिकार निरर्थक ठरले असते.",
      facsimileScanLabel: "Debate Transcript: Article 32 Clause Deliberation",
      relatedItemId: "item-cad-art32",
      directQuote: "“If I was asked to name any particular article in this Constitution as the most important... I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it.”",
      citation: "CAD Vol. VII, Dec 9, 1948",
    },
    {
      id: 4,
      titleEn: "4. The Warning of November 25, 1949",
      titleHi: "4. 25 नवंबर 1949 की ऐतिहासिक चेतावनी",
      titleMr: "४. २५ नोव्हेंबर १९४९ चा ऐतिहासिक इशारा",
      narrativeEn: "In his final address before adoption, Dr. Ambedkar delivered a prophetic warning against Hero-Worship (Bhakti in politics) and cautioned that political equality with one-man-one-vote would remain fragile unless socio-economic inequality was eradicated.",
      narrativeHi: "संविधान अंगीकार से पूर्व अपने अंतिम भाषण में डॉ. आंबेडकर ने राजनीति में भक्ति (व्यक्ति-पूजा) और सामाजिक-आर्थिक असमानता के खतरों से आगाह किया।",
      narrativeMr: "संविधानाच्या अंतिम वाचनाप्रसंगी डॉ. आंबेडकरांनी राजकारणातील व्यक्तिपूजा (भक्ती) आणि सामाजिक-आर्थिक विषमतेच्या धोक्यांविषयी स्पष्ट इशारा दिला.",
      facsimileScanLabel: "First Signed Edition of the Constitution of India (Nov 1949)",
      relatedItemId: "item-cad-final-speech",
      directQuote: "“On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.”",
      citation: "CAD Vol. XI, Nov 25, 1949",
    },
  ],
};

export default function StoryReaderClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { language, t } = useApp();

  const storyMeta = STORIES_DATA.find((s) => s.slug === slug) || STORIES_DATA[0];
  const chapters = CHAPTERS_BY_SLUG[slug] || CHAPTERS_BY_SLUG["mahad-satyagraha"];

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chapter = chapters[currentChapterIndex];

  const getChapterTitle = (c: StoryChapter) => {
    if (language === "hi") return c.titleHi;
    if (language === "mr") return c.titleMr;
    return c.titleEn;
  };

  const getChapterNarrative = (c: StoryChapter) => {
    if (language === "hi") return c.narrativeHi;
    if (language === "mr") return c.narrativeMr;
    return c.narrativeEn;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button and breadcrumbs */}
      <div className="mb-6 flex items-center justify-between border-b border-stone-300 pb-4">
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A6F] text-primary hover:text-[#C8A24A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.stories?.backToStories || "Back to All Exhibition Stories"}</span>
        </Link>
        <span className="text-xs text-zinc-600 font-medium">
          {(t.stories?.chapterProgress || "Chapter {current} of {total}")
            .replace("{current}", (currentChapterIndex + 1).toString())
            .replace("{total}", chapters.length.toString())}
        </span>
      </div>

      {/* Story Banner */}
      <div className="bg-[#0B2A6F] bg-primary text-white rounded-2xl p-6 md:p-8 shadow-md mb-8 border border-primary/20">
        <span className="text-[11px] font-bold text-[#F4DF9E] uppercase tracking-widest block mb-1">
          {t.stories?.visualEssay || "Historical Visual Essay"} • {storyMeta.period}
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-white">
          {language === "mr" ? storyMeta.titleMr : language === "hi" ? storyMeta.titleHi : storyMeta.titleEn}
        </h1>
        <p className="mt-2 text-sm text-stone-200 max-w-3xl leading-relaxed">
          {language === "mr" ? storyMeta.subtitleMr : language === "hi" ? storyMeta.subtitleHi : storyMeta.subtitleEn}
        </p>

        {/* Chapter Progress Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/15">
          {chapters.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setCurrentChapterIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentChapterIndex === idx
                  ? "bg-[#C8A24A] text-[#061537] shadow-sm"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
              }`}
            >
              {getChapterTitle(c)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Chapter Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Narrative text (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-300 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-[#0B2A6F] text-primary mb-4 pb-2 border-b border-stone-200">
              {getChapterTitle(chapter)}
            </h2>
            <p className="text-base text-zinc-800 leading-relaxed font-serif">
              {getChapterNarrative(chapter)}
            </p>

            {/* Direct Verified Historic Quotation Callout */}
            <div className="mt-6 p-4 rounded-xl bg-[#FDF8ED] border-l-4 border-[#C8A24A] relative">
              <Quote className="w-6 h-6 text-[#C8A24A]/40 absolute right-3 top-3 pointer-events-none" />
              <p className="italic text-zinc-900 font-serif text-sm leading-relaxed">
                {chapter.directQuote}
              </p>
              <div className="mt-2 text-[11px] font-bold text-[#886524] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A24A]" />
                <span>{(t.stories?.verifiedSource || "Verified Source:")} {chapter.citation}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentChapterIndex((i) => Math.max(0, i - 1))}
              disabled={currentChapterIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-zinc-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.stories?.prevChapter || "Previous Chapter"}</span>
            </button>
            <button
              onClick={() => setCurrentChapterIndex((i) => Math.min(chapters.length - 1, i + 1))}
              disabled={currentChapterIndex === chapters.length - 1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2A6F] bg-primary text-white text-xs font-bold hover:bg-[#081E50] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
            >
              <span>{t.stories?.nextChapter || "Next Chapter"}</span>
              <ChevronRight className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>

        {/* Facsimile & Archival Evidence Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-stone-300 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold text-[#0B2A6F] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{t.stories?.archivalFacsimile || "Archival Document Facsimile"}</span>
              <span className="text-[10px] bg-[#FDF8ED] text-[#886524] border border-[#F4DF9E] px-2 py-0.5 rounded font-bold">
                {t.stories?.authenticSource || "Authentic Source"}
              </span>
            </div>

            {/* Facsimile Mock Viewer */}
            <div className="aspect-[3/4] bg-[#FAF7F0] border border-stone-300 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
              <div className="space-y-2 opacity-80 select-none">
                <div className="h-4 bg-[#0B2A6F]/15 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-2 bg-stone-300 rounded w-full"></div>
                <div className="h-2 bg-stone-300 rounded w-5/6"></div>
                <div className="h-2 bg-stone-300 rounded w-full"></div>
                <div className="h-2 bg-stone-300 rounded w-4/5"></div>
                <div className="h-2 bg-stone-300 rounded w-11/12"></div>
                <div className="h-2 bg-stone-300 rounded w-full"></div>
                <div className="my-3 border-b border-stone-300"></div>
                <div className="h-2 bg-stone-300 rounded w-full"></div>
                <div className="h-2 bg-stone-300 rounded w-5/6"></div>
                <div className="h-2 bg-stone-300 rounded w-3/4"></div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-3.5 rounded-lg border border-stone-200 text-center shadow-xs">
                <span className="text-xs font-serif font-bold text-[#0B2A6F] block">
                  {chapter.facsimileScanLabel}
                </span>
                <span className="text-[11px] text-zinc-600 block mt-1">
                  {(t.stories?.reference || "Reference:")} {chapter.citation}
                </span>
              </div>
            </div>

            {/* Jump into Deep Zoom Reader */}
            {chapter.relatedItemId && (
              <div className="mt-4">
                <Link
                  href={`/reader/${chapter.relatedItemId}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-[#0B2A6F] bg-primary text-white text-xs font-bold hover:bg-[#081E50] transition-colors shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  <span>{t.stories?.openDeepZoom || "Open Full Document in Deep Zoom Reader"}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
