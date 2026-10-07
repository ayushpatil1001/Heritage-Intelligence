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
  "columbia-to-london": [
    {
      id: 1,
      titleEn: "1. The Baroda Scholarship & Columbia University",
      titleHi: "1. बड़ौदा छात्रवृत्ति और कोलंबिया विश्वविद्यालय",
      titleMr: "१. बडोदा शिष्यवृत्ती आणि कोलंबिया विद्यापीठ",
      narrativeEn: "In 1913, sponsored by Maharaja Sayajirao Gaekwad III of Baroda, Dr. Ambedkar crossed the Atlantic to attend Columbia University in New York. Under the mentorship of seminal thinkers like John Dewey, Edwin Seligman, and Alexander Goldenweiser, he mastered political economy, anthropology, and sociology, working up to eighteen hours a day in the library.",
      narrativeHi: "1913 में बड़ौदा के महाराजा सयाजीराव गायकवाड़ के सहयोग से डॉ. आंबेडकर उच्च शिक्षा हेतु न्यूयॉर्क स्थित कोलंबिया विश्वविद्यालय पहुंचे। जॉन डेवी और एडविन सेलिगमैन जैसे विद्वानों के मार्गदर्शन में उन्होंने राजनीति शास्त्र, समाजशास्त्र और अर्थशास्त्र का गहन अध्ययन किया।",
      narrativeMr: "१९१३ मध्ये बडोद्याचे महाराज सयाजीराव गायकवाड यांच्या शिष्यवृत्तीवर डॉ. आंबेडकर उच्च शिक्षणासाठी कोलंबिया विद्यापीठात दाखल झाले. जॉन ड्युई व एडविन सेलिगमन यांच्या मार्गदर्शनाखाली त्यांनी अर्थशास्त्र आणि समाजशास्त्राचा अथांग अभ्यास केला.",
      facsimileScanLabel: "Columbia University Student Record & Registration Archive (1913-1915)",
      relatedItemId: "item-dissertation-columbia",
      directQuote: "“The best friends I have had in life were some of my classmates at Columbia and my great teachers, especially John Dewey.”",
      citation: "Columbia Alumni Profile & Reminiscences",
    },
    {
      id: 2,
      titleEn: "2. The Evolution of Provincial Finance in British India",
      titleHi: "2. ब्रिटिश भारत में प्रांतीय वित्त का विकास",
      titleMr: "२. ब्रिटिश भारतातील प्रांतीय वित्ताची उत्क्रांती",
      narrativeEn: "In his PhD dissertation, Dr. Ambedkar conducted a meticulous empirical analysis of financial decentralization under the British Raj from 1833 to 1921. He demonstrated how excessive centralization stifled provincial autonomy, pioneering modern federal fiscal principles that would later form the architectural foundation for India's Finance Commission framework.",
      narrativeHi: "डॉ. आंबेडकर ने अपने डॉक्टरेट शोधप्रबंध में 1833 से 1921 तक ब्रिटिश राज में वित्तीय विकेंद्रीकरण की विसंगतियों का विशद विश्लेषण किया। उन्होंने संघीय वित्तीय स्वायत्तता का जो खाका प्रस्तुत किया, वही स्वतंत्र भारत के वित्त आयोग का आधार बना।",
      narrativeMr: "आपल्या डॉक्टरेट प्रबंधात डॉ. आंबेडकरांनी १८३३ ते १९२१ दरम्यानच्या ब्रिटिश भारतातील आर्थिक व्यवस्थेचे वैज्ञानिक विश्लेषण केले. महसुलाचे विकेंद्रीकरण आणि प्रांतीय स्वायत्ततेचे त्यांचे हे चिंतन स्वतंत्र भारताच्या वित्त आयोगाचा पाया ठरले.",
      facsimileScanLabel: "Original PhD Thesis Title Page: P.S. King & Son, London (1925)",
      relatedItemId: "item-dissertation-columbia",
      directQuote: "“Provincial finance has not merely a technical fiscal significance; it is the indispensable condition for provincial administrative autonomy and democratic self-governance.”",
      citation: "The Evolution of Provincial Finance in British India (1925)",
    },
    {
      id: 3,
      titleEn: "3. London School of Economics & Gray's Inn",
      titleHi: "3. लंदन स्कूल ऑफ इकोनॉमिक्स और ग्रेज इन",
      titleMr: "३. लंडन स्कूल ऑफ इकॉनॉमिक्स आणि ग्रेज इन",
      narrativeEn: "Arriving in London in 1916, Dr. Ambedkar simultaneously enrolled at the London School of Economics for research in economics and at Gray's Inn for the Bar. Despite acute poverty, living on tea and stale bread while reading uninterruptedly at the British Museum Reading Room, he earned his M.Sc. (Econ), D.Sc. (Econ), and was called to the Bar.",
      narrativeHi: "1916 में लंदन पहुंचकर डॉ. आंबेडकर ने एलएसई और ग्रेज इन में एक साथ अध्ययन किया। अत्यधिक आर्थिक तंगी के बावजूद ब्रिटिश म्यूजियम की लाइब्रेरी में अथक अध्ययन करते हुए उन्होंने अर्थशास्त्र में डी.एससी और कानून में बार-एट-लॉ की उपाधि हासिल की।",
      narrativeMr: "१९१६ मध्ये लंडनला पोहोचल्यावर त्यांनी लंडन स्कूल ऑफ इकॉनॉमिक्स आणि ग्रेज इनमध्ये प्रवेश घेतला. अत्यंत हलाखीच्या परिस्थितीत केवळ चहा आणि पावावर दिवस काढत ब्रिटिश म्युझियमच्या वाचनालयात त्यांनी अहोरात्र अभ्यास केला आणि डी.एस्सी. पदवी संपादन केली.",
      facsimileScanLabel: "LSE Admission Registry & Library Reader Admission Card (1916-1921)",
      relatedItemId: "item-baws-06-rupee",
      directQuote: "“No one has endured greater privations for knowledge than I did in London. Every minute was a battle against poverty and the clock.”",
      citation: "Reminiscences of London Student Days",
    },
    {
      id: 4,
      titleEn: "4. The Problem of the Rupee: Central Banking Foundation",
      titleHi: "4. द प्रॉब्लम ऑफ द रूपी: केंद्रीय बैंक का आधार",
      titleMr: "४. द प्रॉब्लेम ऑफ द रुपी: मध्यवर्ती बँकेचा पाया",
      narrativeEn: "In his seminal D.Sc. dissertation, Dr. Ambedkar critically examined John Maynard Keynes's advocacy of the gold exchange standard, arguing that an artificially manipulated currency degraded the purchasing power of the poor. His expert testimony before the Royal Commission on Indian Currency and Finance (Hilton Young Commission) in 1925 directly inspired the founding charter of the Reserve Bank of India.",
      narrativeHi: "अपने ऐतिहासिक ग्रंथ 'द प्रॉब्लम ऑफ द रूपी' में डॉ. आंबेडकर ने मुद्रा स्थिरता पर मौलिक विचार रखे। हिल्टन यंग आयोग (1925) के समक्ष उनकी साक्ष्य प्रस्तुति ने भारतीय रिज़र्व बैंक (RBI) की स्थापना की मुख्य अवधारणा तैयार की।",
      narrativeMr: "'द प्रॉब्लेम ऑफ द रुपी' या अजरामर प्रबंधात त्यांनी भारतीय चलनाची स्थिरता आणि गरिबांच्या क्रयशक्तीचे रक्षण यावर क्रांतीकारी विचार मांडले. १९२५ च्या हिल्टन यंग कमिशनसमोरील त्यांच्या साक्ष व सिद्धांतातून भारतीय रिझर्व्ह बँकेची (RBI) स्थापना झाली.",
      facsimileScanLabel: "Royal Commission on Indian Currency and Finance (Hilton Young) Testimony (1925)",
      relatedItemId: "item-baws-06-rupee",
      directQuote: "“The problem of the Indian rupee cannot be solved merely by pegging exchange rates to London. It requires a sovereign, independent monetary authority accountable to domestic economic stability.”",
      citation: "The Problem of the Rupee (1923), BAWS Vol. 6",
    },
  ],
  "conversion-at-nagpur": [
    {
      id: 1,
      titleEn: "1. The Yeola Declaration (1935)",
      titleHi: "1. येवला घोषणा (1935): ऐतिहासिक संकल्प",
      titleMr: "१. येवला घोषणा (१९३५): ऐतिहासिक निर्धार",
      narrativeEn: "On October 13, 1935, addressing ten thousand delegates at the Bombay Provincial Depressed Classes Conference in Yeola, Dr. Ambedkar declared: 'I had the misfortune of being born with the stigma of an Untouchable... But I will not die a Hindu.' This resolute declaration launched a two-decade rigorous comparative theological quest for spiritual emancipation.",
      narrativeHi: "13 अक्टूबर 1935 को येवला सम्मेलन में डॉ. आंबेडकर ने ऐतिहासिक उद्घोष किया: 'दुर्भाग्य से मैं अछूत के रूप में पैदा हुआ, किंतु मैं हिंदू के रूप में मरूंगा नहीं।' इस घोषणा ने सामाजिक समानता और आत्मसम्मान के लिए एक नए आध्यात्मिक मार्ग की खोज प्रारंभ की।",
      narrativeMr: "१३ ऑक्टोबर १९३५ रोजी नाशिक जिल्ह्यातील येवला येथील परिषदेत डॉ. बाबासाहेब आंबेडकरांनी ऐतिहासिक सिंहगर्जना केली: 'मी अस्पृश्य म्हणून जन्मलो हे माझ्या हाती नव्हते, परंतु मी हिंदू म्हणून मरणार नाही!' या घोषणेने मानवी स्वातंत्र्याच्या एका नव्या पर्वाची सुरुवात झाली.",
      facsimileScanLabel: "Janata Newspaper Front Page: Historic Yeola Speech (October 1935)",
      relatedItemId: "item-baws-03-philosophy",
      directQuote: "“Though I was born a Hindu, which was not in my power, I assure you that I will not die a Hindu.”",
      citation: "Yeola Declaration, BAWS Vol. 17, Part I",
    },
    {
      id: 2,
      titleEn: "2. The 22 Vows of Social & Moral Liberation",
      titleHi: "2. सामाजिक और नैतिक मुक्ति की 22 प्रतिज्ञाएं",
      titleMr: "२. सामाजिक आणि नैतिक मुक्तीच्या २२ प्रतिज्ञा",
      narrativeEn: "At Nagpur, Dr. Ambedkar administered twenty-two revolutionary vows to over half a million followers. The vows systematically renounced superstitious rituals, the caste hierarchy, and patriarchal taboos, replacing them with intellectual enlightenment, scientific temper, and universal compassion (Karuna and Maitri).",
      narrativeHi: "दीक्षाभूमि पर डॉ. आंबेडकर ने लाखों अनुयायियों को 22 ऐतिहासिक प्रतिज्ञाएं दिलाईं। इन प्रतिज्ञाओं ने रूढ़िवादिता और जातिभेद को त्यागकर प्रज्ञा, शील और करुणा के मूल्यों को अपनाने का संकल्प दिलाया।",
      narrativeMr: "नागपूरच्या दीक्षाभूमीवर डॉ. बाबासाहेब आंबेडकरांनी आपल्या लाखो अनुयायांना २२ प्रतिज्ञा दिल्या. अंधश्रद्धा, कर्मकांड आणि विषमतेचा त्याग करून प्रज्ञा, शील आणि करुणा या त्रिसूत्रीवर आधारित जीवन जगण्याचा हा संकल्प होता.",
      facsimileScanLabel: "Facsimile of Original 22 Vows Broadside Printed in Marathi (Oct 1956)",
      relatedItemId: "item-deekshabhoomi-speech",
      directQuote: "“I believe that Buddhism is true religion because it gives importance to morality, equality, and rational freedom.”",
      citation: "Nagpur Historic Deeksha Document (Oct 14, 1956)",
    },
    {
      id: 3,
      titleEn: "3. Deekshabhoomi: The Dawn of Navayana",
      titleHi: "3. दीक्षाभूमि: नवयान की पावन भूमि",
      titleMr: "३. दीक्षाभूमी: नवयानाची मंगल पहाट",
      narrativeEn: "On Vijayadashami, October 14, 1956, in Nagpur, Dr. Ambedkar along with his wife Dr. Savita Ambedkar took refuge in the Triple Gem (Trisarana) and Five Precepts (Pancasila) administered by the Venerable Mahasthavir Chandramani. In a single hour, over 500,000 men and women converted in the largest peaceful religious transformation in human history.",
      narrativeHi: "14 अक्टूबर 1956 को नागपुर में भदंत चंद्रमणि के सानिध्य में डॉ. आंबेडकर ने त्रिशरण और पंचशील ग्रहण किए। इसके साथ ही 5 लाख से अधिक अनुयायियों ने बौद्ध धर्म स्वीकार किया, जो विश्व इतिहास का सबसे बड़ा शांतिपूर्ण धर्मांतरण था।",
      narrativeMr: "१४ ऑक्टोबर १९५६ रोजी विजयादशमीच्या शुभमुहूर्तावर पूज्य महास्थवीर चंद्रमणी यांच्याकडून डॉ. बाबासाहेब आंबेडकर यांनी त्रिशरण आणि पंचशील ग्रहण केले. एकाच वेळी ५ लाखांहून अधिक जनतेने धम्मदीक्षा घेतली; मानवी इतिहासातील ही अद्वितीय शांततामय क्रांती ठरली.",
      facsimileScanLabel: "Deekshabhoomi Event Photographic Record & Audio Transcript Log (1956)",
      relatedItemId: "item-deekshabhoomi-speech",
      directQuote: "“By taking refuge in the Buddha, I feel as if I have been liberated from hell and entered a new life of pure light and self-respect.”",
      citation: "Historic Nagpur Address, October 15, 1956",
    },
    {
      id: 4,
      titleEn: "4. The Buddha and His Dhamma: Rational Social Gospel",
      titleHi: "4. द बुद्ध एंड हिज धम्म: तार्किक सामाजिक संदेश",
      titleMr: "४. द बुद्ध अँड हिज धम्म: विवेकनिष्ठ सामाजिक तत्वज्ञान",
      narrativeEn: "Completed just weeks before his Mahaparinirvana in December 1956, Dr. Ambedkar's magnum opus 'The Buddha and His Dhamma' reconstructed Buddhist philosophy as a rationalist, egalitarian social gospel. Rejecting supernaturalism, he demonstrated that genuine religion must center on moral conduct between human beings in society.",
      narrativeHi: "महापरिनिर्वाण से पूर्व पूर्ण की गई अपनी अमर कृति 'द बुद्ध एंड हिज धम्म' में डॉ. आंबेडकर ने बौद्ध दर्शन को एक विवेकपूर्ण, समतावादी सामाजिक मार्गदर्शक के रूप में प्रस्तुत किया, जो मानव-मानव के बीच नैतिकता को सर्वोच्च मानता है।",
      narrativeMr: "महापरिनिर्वाणापूर्वी पूर्ण झालेला 'द बुद्ध अँड हिज धम्म' हा त्यांचा महान ग्रंथ म्हणजे बौद्ध तत्त्वज्ञानाची विवेकवादी मांडणी आहे. धर्माचे प्रयोजन देव किंवा आत्मा नसून माणसाचे माणसाशी असलेले नैतिक नाते आहे, हे त्यांनी सिद्ध केले.",
      facsimileScanLabel: "First Edition Title Leaf: The Buddha and His Dhamma (Published 1957)",
      relatedItemId: "item-baws-11-buddha",
      directQuote: "“Dhamma is morality, and as morality is for man and by man, it must be based on liberty, equality, and fraternity.”",
      citation: "The Buddha and His Dhamma (1957), BAWS Vol. 11",
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
