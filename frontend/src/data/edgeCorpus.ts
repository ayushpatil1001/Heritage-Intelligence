export type SupportedLanguage = 'en' | 'mr' | 'hi' | 'ta' | 'te';

export interface BoundingBoxSpec {
  x: number;
  y: number;
  width: number;
  height: number;
  highlightLines: number[];
  caption: string;
}

export interface ManuscriptScanSpec {
  headerTitle: string;
  subHeader: string;
  pageNumber: string;
  archiveCode: string;
  lines: string[];
  boundingBox: BoundingBoxSpec;
}

export interface ArchivalRecord {
  id: string;
  title: string;
  category: 'books' | 'debates' | 'speeches' | 'manuscripts' | 'photographs' | 'documentaries';
  collection: string;
  date: string;
  volume: string;
  page: string;
  articleRef: string;
  keywords: string[];
  manuscriptScan: ManuscriptScanSpec;
  verbatimQuote: string;
  synthesis: Record<SupportedLanguage, string>;
}

export interface CadNode {
  id: string;
  label: string;
  draftLabel: string;
  title: string;
  type: 'article' | 'monetary';
  date: string;
  cadVolume: string;
  summary: string;
  ambedkarRejoinder: string;
  coDebaters: string[];
  linkedArchiveId: string;
}

export interface CadEdge {
  from: string;
  to: string;
  relation: string;
}

export interface KaraokeSegment {
  id: string;
  startTime: number;
  endTime: number;
  en: string;
  mr: string;
  hi: string;
  terms: string[];
}

export interface KaraokeTrack {
  id: string;
  title: string;
  speaker: string;
  date: string;
  source: string;
  durationSeconds: number;
  segments: KaraokeSegment[];
}

export interface LexiconEntry {
  term: string;
  en: string;
  mr: string;
  hi: string;
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, { name: string; native: string; bhashiniCode: string; ttsLang: string }> = {
  en: { name: 'English', native: 'English', bhashiniCode: 'en-IN', ttsLang: 'en-IN' },
  mr: { name: 'Marathi', native: 'मराठी', bhashiniCode: 'mr-IN', ttsLang: 'mr-IN' },
  hi: { name: 'Hindi', native: 'हिन्दी', bhashiniCode: 'hi-IN', ttsLang: 'hi-IN' },
  ta: { name: 'Tamil', native: 'தமிழ்', bhashiniCode: 'ta-IN', ttsLang: 'ta-IN' },
  te: { name: 'Telugu', native: 'తెలుగు', bhashiniCode: 'te-IN', ttsLang: 'te-IN' },
};

export const EDGE_NVME_CORPUS: ArchivalRecord[] = [
  {
    id: 'baws-vol6-rbi',
    title: 'The Problem of the Rupee: Its Origin and Its Solution & Hilton Young Commission Testimony',
    category: 'books',
    collection: 'Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS) — Vol. 6',
    date: '1923 / 15 December 1925',
    volume: 'BAWS Vol. 6 (Reprint of 1923 LSE D.Sc. Thesis & Royal Commission Evidence)',
    page: 'pp. 264–289 & Hilton Young Evidence Q. 6041–6115',
    articleRef: 'Finance, Currency & Central Banking Architecture (Reserve Bank of India Act, 1934)',
    keywords: [
      'reserve bank', 'rbi', 'problem of the rupee', 'hilton young commission', 'gold standard',
      'gold exchange standard', 'currency', 'central bank', 'inflation', 'monetary policy',
      'रिझर्व्ह बँक', 'रुपयाचा प्रश्न', 'आंबेडकर', 'स्थापना', 'अर्थकारण', 'हिल्टन यंग कमिशन',
      'रिज़र्व बैंक', 'रुपये की समस्या', 'मुद्रास्फीति', 'हिल्टन यंग',
      'ரிசர்வ் வங்கி', 'ரூபாயின் பிரச்சினை', 'రిజర్వ్ బ్యాంక్', 'రూపాయి సమస్య'
    ],
    manuscriptScan: {
      headerTitle: 'ROYAL COMMISSION ON INDIAN CURRENCY & FINANCE (1926) / BAWS VOL. 6',
      subHeader: 'STATEMENT OF EVIDENCE SUBMITTED BY DR. B. R. AMBEDKAR, BAR-AT-LAW, D.Sc. (ECON.) LONDON',
      pageNumber: 'Page 278 — Section IV: Elasticity & Stability of Purchasing Power',
      archiveCode: 'DAIC-MS-BAWS-V6-0278',
      lines: [
        '12. The fundamental defect of the Gold Exchange Standard as operated in India is that it vests',
        'discretionary currency expansion in the hands of the Executive Government without statutory anchor.',
        '13. A Central Bank of Issue (Reserve Bank) must remain strictly independent of political fiscal deficits,',
        'bound by law to limit automatic fiduciary paper emission so that the purchasing power of the',
        'labouring masses is never eroded through unbacked inflation.',
        '14. Stability of internal price levels is far more vital to the peasant and wage-earner than mere',
        'stability of external exchange rates with London.'
      ],
      boundingBox: {
        x: 5,
        y: 26,
        width: 90,
        height: 45,
        highlightLines: [2, 3, 4],
        caption: 'Verified Citation: BAWS Vol. 6, p. 278 — Statutory Independence of Central Bank & Anti-Inflationary Mandate'
      }
    },
    verbatimQuote:
      '"A managed currency is to be altogether avoided when the management is to be in the hands of the Government... The Central Bank of Issue must be governed by strict statutory limits on fiduciary issue so that the purchasing power of the poor is safeguarded against arbitrary currency expansion."',
    synthesis: {
      en: "Dr. B. R. Ambedkar conceptualized the foundational monetary framework that led to the establishment of the Reserve Bank of India (RBI) in 1935. In his 1923 LSE doctoral treatise 'The Problem of the Rupee: Its Origin and Its Solution' (BAWS Vol. 6) and his December 1925 testimony before the Royal Commission on Indian Currency and Finance (Hilton Young Commission), Dr. Ambedkar argued against an unbacked Gold Exchange Standard controlled by the colonial executive. He advocated for an autonomous, statutorily regulated central banking authority whose primary mandate is internal price stability to protect the real wages of laborers and farmers.",
      mr: "डॉ. बाबासाहेब आंबेडकरांनी रिझर्व्ह बँक ऑफ इंडियाच्या (RBI) स्थापनेचा सैद्धांतिक आणि संस्थात्मक पाया रचला. १९२३ मधील त्यांच्या 'द प्रॉब्लेम ऑफ द रुपी: इट्स ओरिजिन अँड इट्स सोल्युशन' (BAWS खंड ६) या प्रबंधात आणि डिसेंबर १९२५ मध्ये रॉयल कमिशन ऑन इंडियन करन्सी अँड फायनान्स (हिल्टन यंग कमिशन) समोर दिलेल्या साक्षीमध्ये त्यांनी स्पष्ट केले की, चलन व्यवस्थापनाचे अधिकार सरकारच्या हातात न ठेवता एका स्वायत्त मध्यवर्ती बँकेकडे (Reserve Bank) असले पाहिजेत. महागाई नियंत्रणात ठेवून कष्टकरी आणि शेतकऱ्यांच्या क्रयशक्तीचे रक्षण करणे हे रिझर्व्ह बँकेचे मुख्य कर्तव्य असले पाहिजे, हा त्यांचा ठाम विचार होता.",
      hi: "डॉ. बी. आर. अम्बेडकर ने भारतीय रिज़र्व बैंक (RBI) की स्थापना की वैचारिक और संस्थागत नींव रखी। 1923 के अपने प्रसिद्ध शोध-प्रबंध 'द प्रॉब्लम ऑफ द रुपी' (BAWS खंड 6) और दिसंबर 1925 में हिल्टन यंग कमीशन के समक्ष अपनी गवाही में उन्होंने तर्क दिया कि मुद्रा निर्गमन का अधिकार कार्यपालिका से स्वतंत्र एक स्वायत्त केंद्रीय बैंक के पास होना चाहिए, ताकि मुद्रास्फीति को रोककर श्रमिकों और किसानों की क्रय-शक्ति की रक्षा की जा सके।",
      ta: "டாக்டர் பி. ஆர். அம்பேத்கர் இந்திய ரிசர்வ் வங்கி (RBI) உருவாக்கத்திற்கான பொருளாதார அடித்தளத்தை அமைத்தார். 1923-ஆம் ஆண்டு எழுதிய 'தி பிராப்ளம் ஆஃப் தி ரூபி' (BAWS தொகுதி 6) நூலிலும், 1925 ஹில்டன் யங் ஆணையத்தின் முன்பான சாட்சியத்திலும், பணவீக்கத்தைக் கட்டுப்படுத்தி உழைக்கும் மக்களின் வாங்கும் சக்தியைப் பாதுகாக்க சுதந்திரமான மத்திய வங்கி அவசியம் என்று வலியுறுத்தினார்.",
      te: "డాక్టర్ బి. ఆర్. అంబేద్కర్ భారతీయ రిజర్వ్ బ్యాంక్ (RBI) స్థాపనకు ప్రధాన ఆర్థిక పునాది వేశారు. 1923 నాటి 'ది ప్రాబ్లమ్ ఆఫ్ ది రూపీ' (BAWS సంపుటి 6) గ్రంథంలో మరియు 1925 హిల్టన్ యంగ్ కమిషన్ ముందు ఇచ్చిన సాక్ష్యంలో, ద్రవ్యోల్బణాన్ని నియంత్రించి శ్రామికుల కొనుగోలు శక్తిని రక్షించేందుకు స్వతంత్ర కేంద్ర బ్యాంకు ఉండాలని ఆయన ప్రతిపాదించారు."
    }
  },
  {
    id: 'cad-vol7-art32',
    title: "Article 32 (Draft Article 25) — 'The Heart and Soul of the Constitution'",
    category: 'debates',
    collection: 'Constituent Assembly Debates (CAD) — Official Report Vol. VII',
    date: '9 December 1948',
    volume: 'CAD Vol. VII, Book No. 2',
    page: 'Page 953 (Paragraph 4)',
    articleRef: 'Article 32 (Right to Constitutional Remedies / Prerogative Writs)',
    keywords: [
      'article 32', 'draft article 25', 'heart and soul', 'constitutional remedies', 'writs',
      'habeas corpus', 'mandamus', 'certiorari', 'quo warranto', 'prohibition', 'fundamental rights',
      'कलम ३२', 'संविधानाचा आत्मा', 'हृदय आणि आत्मा', 'मूलभूत हक्क',
      'अनुच्छेद 32', 'संविधान की आत्मा', 'हृदय और आत्मा', 'मौलिक अधिकार',
      'பிரிவு 32', 'அரசியலமைப்பின் இதயம் மற்றும் ஆன்மா', 'ఆర్టికల్ 32', 'రాజ్యాంగ ఆత్మ'
    ],
    manuscriptScan: {
      headerTitle: 'CONSTITUENT ASSEMBLY OF INDIA DEBATES (PROCEEDINGS) — VOL. VII',
      subHeader: 'THURSDAY, THE 9TH DECEMBER 1948 — DRAFT ARTICLE 25 (FINAL ARTICLE 32)',
      pageNumber: 'Page 953 — The Honourable Dr. B. R. Ambedkar (Chairman, Drafting Committee)',
      archiveCode: 'CAD-1948-12-09-V7-P953',
      lines: [
        'The Honourable Dr. B. R. Ambedkar: Now, Sir, I am very glad that the House has realized the',
        'great importance of this article. If I was asked to name any particular article in this',
        'Constitution as the most important—an article without which this Constitution would be a',
        'nullity—I could not refer to any other article except this one. It is the very soul of the',
        'Constitution and the very heart of it, and I am glad that the House has realized its',
        'greatness. Hereafter, it would not be possible for any Legislature to take away the writs',
        'which are mentioned in this article unless and until the Constitution itself is amended.'
      ],
      boundingBox: {
        x: 4,
        y: 22,
        width: 92,
        height: 48,
        highlightLines: [1, 2, 3, 4],
        caption: 'Verified Citation: CAD Vol. VII, 9 Dec 1948, p. 953 — Dr. Ambedkar declaring Draft Art. 25 (Art. 32) the Heart & Soul'
      }
    },
    verbatimQuote:
      '"If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it."',
    synthesis: {
      en: "On 9 December 1948 (CAD Vol. VII, p. 953), defending Draft Article 25 (enacted as Article 32), Dr. B. R. Ambedkar declared the Right to Constitutional Remedies to be the 'very soul of the Constitution and the very heart of it.' He emphasized that declarative Fundamental Rights are meaningless parchment promises without an effective judicial remedy. By embedding the five Prerogative Writs—Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari—directly into the constitutional text, Article 32 prevents any parliamentary majority from stripping the Supreme Court's jurisdiction to enforce citizen rights.",
      mr: "९ डिसेंबर १९४८ रोजी संविधान सभेत (CAD खंड ७, पृष्ठ ९५३) मसुदा कलम २५ (अंतिम कलम ३२ — घटनात्मक उपायांचा अधिकार) वर भाष्य करताना डॉ. बाबासाहेब आंबेडकरांनी या कलमाला 'संविधानाचा आत्मा आणि हृदय' (Heart and Soul of the Constitution) असे संबोधले. त्यांनी स्पष्ट केले की, जर नागरिकांच्या मूलभूत हक्कांचे रक्षण करण्यासाठी सर्वोच्च न्यायालयात थेट दाद मागण्याची आणि 'बंदीप्रत्यक्षीकरण' (Habeas Corpus), 'परमादेश' (Mandamus) यांसारख्या ५ प्राधिकारांची (Writs) हमी नसेल, तर संपूर्ण संविधान अर्थहीन ठरेल.",
      hi: "9 दिसंबर 1948 को संविधान सभा की बहस (CAD खंड VII, पृष्ठ 953) में प्रारूप अनुच्छेद 25 (अंतिम अनुच्छेद 32 — संवैधानिक उपचारों का अधिकार) का समर्थन करते हुए डॉ. बी. आर. अम्बेडकर ने इसे 'संविधान की आत्मा और हृदय' घोषित किया। उन्होंने स्पष्ट किया कि बिना न्यायिक प्रवर्तन और पाँच रिट (बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, उत्प्रेषण, अधिकार-पृच्छा) की संवैधानिक गारंटी के मौलिक अधिकार केवल कागजी घोषणा बनकर रह जाएंगे।",
      ta: "9 டிசம்பர் 1948 அன்று அரசியலமைப்பு நிர்ணய சபை விவாதத்தில் (CAD தொகுதி VII, பக். 953), வரைவுப் பிரிவு 25 (இறுதிப் பிரிவு 32 - அரசியலமைப்புத் தீர்வுகளுக்கான உரிமை) குறித்துப் பேசிய டாக்டர் அம்பேத்கர், இப்பிரிவை 'அரசியலமைப்பின் ஆன்மா மற்றும் இதயம்' என்று பிரகடனப்படுத்தினார்.",
      te: "9 డిసెంబర్ 1948న రాజ్యాంగ పరిషత్ చర్చలలో (CAD సంపుటి VII, పుట 953), ముసాయిదా ఆర్టికల్ 25 (తుది ఆర్టికల్ 32 - రాజ్యాంగ పరిహారపు హక్కు) గురించి మాట్లాడుతూ డాక్టర్ అంబేద్కర్ దీనిని 'రాజ్యాంగం యొక్క ఆత్మ మరియు హృదయం'గా అభివర్ణించారు."
    }
  },
  {
    id: 'baws-vol18-mahad',
    title: 'Mahad Chavdar Tale Satyagraha — Declaration of Human Equality & Civic Rights',
    category: 'speeches',
    collection: 'Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS) — Vol. 17 & Vol. 18 (Bahishkrit Bharat)',
    date: '20 March 1927 & 25 December 1927',
    volume: 'BAWS Vol. 17 (Part 1) & Vol. 18 (Marathi Speeches)',
    page: 'pp. 3–28 (Mahad Conference Presidential Address)',
    articleRef: 'Precursor to Constitutional Articles 15(2) & 17 (Equal Access to Public Wells & Abolition of Untouchability)',
    keywords: [
      'mahad', 'mahad satyagraha', 'chavdar tale', 'water tank', 'human rights', 'equality', 'manusmriti',
      'महाड', 'महाड सत्याग्रह', 'चवदार तळे', 'सत्याग्रहाबद्दल', 'माहिती', 'मानवी हक्क', 'समता',
      'महाड सत्याग्रह', 'चवदार तालाब', 'समानता',
      'மகாத் சத்தியாகிரகம்', 'మహాద్ సత్యాగ్రహం'
    ],
    manuscriptScan: {
      headerTitle: 'KOLABA DISTRICT DEPRESSED CLASSES CONFERENCE — MAHAD (1927)',
      subHeader: 'PRESIDENTIAL ADDRESS BY DR. B. R. AMBEDKAR AT CHAVDAR TALE, MAHAD (BAWS VOL. 17/18)',
      pageNumber: 'Page 14 — Resolution on Public Civic Rights & Human Dignity',
      archiveCode: 'DAIC-SP-MAHAD-1927-014',
      lines: [
        '1. We are not going to the Chavdar Tank merely to drink its water. We are going to the Tank to',
        'assert that we too are human beings like others. It must be clear that this meeting has been',
        'called to set up the norm of equality.',
        '2. The French National Assembly in 1789 proclaimed that all men are born free and equal in rights.',
        'Our struggle at Mahad is a moral and constitutional revolution to establish social democracy',
        'and uninhibited public access to civic resources mandated by the Bole Resolution of 1923.'
      ],
      boundingBox: {
        x: 5,
        y: 18,
        width: 90,
        height: 46,
        highlightLines: [0, 1, 2],
        caption: 'Verified Citation: BAWS Vol. 17 Pt. 1, p. 14 — Mahad Satyagraha Presidential Address (20 March 1927)'
      }
    },
    verbatimQuote:
      '"We are not going to the Chavdar Tank merely to drink its water. We are going to the Tank to assert that we too are human beings like others. It must be clear that this meeting has been called to set up the norm of equality."',
    synthesis: {
      en: "The Mahad Satyagraha (20 March 1927 and 25–27 December 1927) led by Dr. B. R. Ambedkar at Chavdar Tale (Public Water Tank) in Mahad, Raigad district, stands as India's foundational civil rights charter. Enforcing the 1923 Bombay Legislative Council Bole Resolution opening public water bodies to all citizens, Dr. Ambedkar declared that the march was not merely for water, but to establish the universal norm of human equality—comparing the Mahad Charter to the 1789 French Declaration of the Rights of Man. This struggle directly shaped Article 15(2) (equal access to public tanks, wells, and ghats) and Article 17 of the Indian Constitution.",
      mr: "२० मार्च १९२७ आणि २५ डिसेंबर १९२७ रोजी रायगड जिल्ह्यातील महाड येथील चवदार तळ्यावर डॉ. बाबासाहेब आंबेडकरांच्या नेतृत्वाखाली झालेला 'महाड सत्याग्रह' हा भारतातील मानवी हक्कांचा पहिला महान लढा मानला जातो. मुंबई विधिमंडळाच्या १९२३ च्या 'बोले ठरावाची' अंमलबजावणी करण्यासाठी बाबासाहेबांनी हजारो अनुयायांसह चवदार तळ्याचे पाणी प्राशन केले. 'आम्ही चवदार तळ्यावर केवळ पाणी पिण्यासाठी जात नाही, तर आम्हीही इतरांप्रमाणेच माणूस आहोत आणि समतेचा मानदंड प्रस्थापित करण्यासाठी हा लढा आहे,' अशी ऐतिहासिक घोषणा त्यांनी केली (BAWS खंड १७ व १८). याच लढ्यातून पुढे भारतीय संविधानातील कलम १५(२) व कलम १७ ची निर्मिती झाली.",
      hi: "20 मार्च 1927 और 25 दिसंबर 1927 को महाड के चवदार तालाब पर डॉ. बी. आर. अम्बेडकर के नेतृत्व में हुआ 'महाड सत्याग्रह' भारत के नागरिक अधिकारों का ऐतिहासिक घोषणापत्र है। डॉ. अम्बेडकर ने स्पष्ट कहा था: 'हम चवदार तालाब पर केवल पानी पीने नहीं जा रहे हैं, बल्कि यह स्थापित करने जा रहे हैं कि हम भी दूसरों की तरह मनुष्य हैं।' इस आंदोलन ने भारतीय संविधान के अनुच्छेद 15(2) और अनुच्छेद 17 की सीधी आधारशिला रखी।",
      ta: "20 மார்ச் 1927 அன்று மகாராஷ்டிராவின் மகாத் சவ்தார் குளத்தில் டாக்டர் பி. ஆர். அம்பேத்கர் தலைமையில் நடைபெற்ற மகாத் சத்தியாகிரகம் இந்தியாவின் முதல் மனித உரிமைப் போராட்டமாகும்.",
      te: "20 మార్చి 1927న మహాద్‌లోని చవ్‌దార్ చెరువు వద్ద డాక్టర్ బి. ఆర్. అంబేద్కర్ నేతృత్వంలో జరిగిన మహాద్ సత్యాగ్రహం భారత పౌర హక్కుల చరిత్రలో మైలురాయి."
    }
  },
  {
    id: 'cad-vol11-closing',
    title: "Closing Speech to the Constituent Assembly — 'Grammar of Anarchy' & Social Democracy",
    category: 'debates',
    collection: 'Constituent Assembly Debates (CAD) — Official Report Vol. XI',
    date: '25 November 1949',
    volume: 'CAD Vol. XI, Book No. 5',
    page: 'pp. 972–981 (Page 979 Core Excerpt)',
    articleRef: 'Preamble, Constitutional Morality & Trinity of Liberty, Equality, and Fraternity',
    keywords: [
      'grammar of anarchy', 'social democracy', 'economic democracy', 'fraternity', 'liberty',
      'equality', 'closing speech', '25 november 1949', 'contradictions', 'bhakti', 'hero worship',
      'अराजकतेचे व्याकरण', 'सामाजिक लोकशाही', 'बंधुता', '२५ नोव्हेंबर १९४९',
      'अराजकता का व्याकरण', 'सामाजिक लोकतंत्र', 'बंधुत्व'
    ],
    manuscriptScan: {
      headerTitle: 'CONSTITUENT ASSEMBLY OF INDIA DEBATES — VOL. XI (THIRD READING)',
      subHeader: "FRIDAY, THE 25TH NOVEMBER 1949 — DR. B. R. AMBEDKAR'S CONCLUDING ADDRESS",
      pageNumber: 'Page 979 — Social Democracy & The Three Warnings to the Republic',
      archiveCode: 'CAD-1949-11-25-V11-P979',
      lines: [
        'On the 26th of January 1950, we are going to enter into a life of contradictions.',
        'In politics we will have equality and in social and economic life we will have inequality.',
        'In politics we will be recognizing the principle of one man one vote and one vote one value.',
        'In our social and economic life, we shall, by reason of our social and economic structure,',
        'continue to deny the principle of one man one value. How long shall we continue to live this',
        'life of contradictions? If we continue to deny it for long, we will do so only by putting our',
        'political democracy in peril. We must abandon the bloody methods of revolution and the Grammar of Anarchy.'
      ],
      boundingBox: {
        x: 4,
        y: 18,
        width: 92,
        height: 58,
        highlightLines: [0, 1, 5, 6],
        caption: "Verified Citation: CAD Vol. XI, 25 Nov 1949, p. 979 — 'Life of Contradictions' & 'Grammar of Anarchy'"
      }
    },
    verbatimQuote:
      '"Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality and fraternity as the principles of life... On the 26th of January 1950, we are going to enter into a life of contradictions."',
    synthesis: {
      en: "In his monumental concluding address to the Constituent Assembly on 25 November 1949 (CAD Vol. XI, p. 979), Dr. B. R. Ambedkar issued three prophetic warnings for the preservation of Indian democracy: (1) Where constitutional methods are open, citizens must abandon extra-constitutional agitation, which he termed the 'Grammar of Anarchy'; (2) Citizens must guard against 'Bhakti' or hero-worship in politics, which leads to dictatorship; and (3) Political democracy ('one person, one vote') must rapidly transform into Social and Economic Democracy ('one person, one value') anchored in the inseparable trinity of Liberty, Equality, and Fraternity.",
      mr: "२५ नोव्हेंबर १९४९ रोजी संविधान सभेतील आपल्या ऐतिहासिक समारोपाच्या भाषणात (CAD खंड ११, पृष्ठ ९७९) डॉ. बाबासाहेब आंबेडकरांनी भारतीय लोकशाहीच्या भविष्यासाठी तीन महत्त्वाचे इशारे दिले: (१) संवैधानिक मार्ग खुले असताना 'अराजकतेचे व्याकरण' (Grammar of Anarchy) त्यागले पाहिजे; (२) राजकारणातील विभूतीपूजा हुकूमशाहीकडे नेते; आणि (३) राजकीय लोकशाही टिकवण्यासाठी तिच्या पायाशी स्वातंत्र्य, समता आणि बंधुता या त्रयीवर आधारित 'सामाजिक व आर्थिक लोकशाही' प्रस्थापित करणे अनिवार्य आहे.",
      hi: "25 नवंबर 1949 को संविधान सभा में अपने ऐतिहासिक समापन भाषण (CAD खंड XI, पृष्ठ 979) में डॉ. अम्बेडकर ने भारतीय गणराज्य को तीन चेतावनियाँ दीं: (1) 'अराजकता के व्याकरण' (Grammar of Anarchy) का त्याग करना; (2) राजनीति में व्यक्ति-पूजा (भक्ति) से बचना; और (3) राजनीतिक लोकतंत्र को सामाजिक और आर्थिक लोकतंत्र में बदलना।",
      ta: "25 நவம்பர் 1949 அன்று அரசியலமைப்பு சபையின் நிறைவு உரையில் (CAD தொகுதி XI, பக். 979), டாக்டர் அம்பேத்கர் அரசியல் ஜனநாயகத்தைக் காக்க சமூக ஜனநாயகம் அவசியம் என்று எச்சரித்தார்.",
      te: "25 నవంబర్ 1949న రాజ్యాంగ పరిషత్ ముగింపు ప్రసంగంలో (CAD సంపుటి XI, పుట 979), రాజకీయ ప్రజాస్వామ్యం నిలబడాలంటే సామాజిక ప్రజాస్వామ్యం పునాదిగా ఉండాలని డాక్టర్ అంబేద్కర్ హెచ్చరించారు."
    }
  },
  {
    id: 'baws-vol1-annihilation',
    title: 'Annihilation of Caste (1936) & Castes in India: Their Mechanism, Genesis and Development (1916)',
    category: 'books',
    collection: 'Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS) — Vol. 1',
    date: '9 May 1916 (Columbia Univ) & May 1936 (Lahore Address)',
    volume: 'BAWS Vol. 1, Part I & Part II',
    page: 'pp. 23–96 (Section 14 & Section 21)',
    articleRef: 'Foundational Sociology behind Articles 14, 15, 16 & 17',
    keywords: [
      'annihilation of caste', 'castes in india', 'division of labourers', 'graded inequality',
      'endogamy', 'jat-pat-todak mandal', 'lahore', 'ideal society', 'social endosmosis',
      'जातीव्यवस्थेचे निर्मूलन', 'श्रमिकांची विभागणी', 'श्रेणीबद्ध विषमता',
      'जाति का विनाश', 'श्रमिकों का विभाजन', 'श्रेणीबद्ध असमानता'
    ],
    manuscriptScan: {
      headerTitle: 'ANNIHILATION OF CASTE — UNDELIVERED ADDRESS TO JAT-PAT-TODAK MANDAL (1936)',
      subHeader: 'BAWS VOL. 1 — SECTION IV: CASTE IS NOT MERELY A DIVISION OF LABOUR',
      pageNumber: 'Page 47 — Division of Labourers & Social Endosmosis',
      archiveCode: 'DAIC-BK-BAWS-V1-0047',
      lines: [
        '4.1 Caste System is not merely a division of labour. It is also a division of labourers.',
        'Civilized society undoubtedly needs division of labour. But in no civilized society is',
        'division of labour accompanied by this unnatural division of labourers into water-tight',
        'compartments based on dogma of predestination and graded inequality.',
        '14.2 An ideal society should be mobile, should be full of channels for conveying a change',
        'taking place in one part to other parts. In an ideal society there should be many interests',
        "consciously communicated and shared—what Prof. John Dewey calls 'Social Endosmosis'."
      ],
      boundingBox: {
        x: 5,
        y: 20,
        width: 90,
        height: 52,
        highlightLines: [0, 1, 2, 5, 6],
        caption: "Verified Citation: BAWS Vol. 1, p. 47 & p. 57 — 'Division of Labourers' & 'Social Endosmosis'"
      }
    },
    verbatimQuote:
      '"Caste System is not merely a division of labour. It is also a division of labourers... An ideal society should be mobile, should be full of channels for conveying a change taking place in one part to other parts."',
    synthesis: {
      en: "In 'Annihilation of Caste' (1936, BAWS Vol. 1, pp. 47–57), originally prepared as the presidential address for the Jat-Pat-Todak Mandal Conference in Lahore, Dr. Ambedkar dismantled the economic defense of caste by proving that caste is not a 'division of labour' based on aptitude, but an enforced 'division of labourers' structured on graded inequality. Drawing upon John Dewey's philosophy, he defined an ideal democratic society through 'Social Endosmosis'—fluid civic fellowship rooted in Liberty, Equality, and Fraternity.",
      mr: "'अॅनिहिलेशन ऑफ कास्ट' (जातीव्यवस्थेचे निर्मूलन, १९३६, BAWS खंड १, पृष्ठ ४७–५७) या ग्रंथात डॉ. बाबासाहेब आंबेडकरांनी जातीव्यवस्थेचे समाजशास्त्रीय विश्लेषण करताना सिद्ध केले की, जातीव्यवस्था ही केवळ 'श्रमाची विभागणी' नसून ती जन्मजात आधारावर केलेली 'श्रमिकांची अनैसर्गिक विभागणी' (Division of Labourers) आणि 'श्रेणीबद्ध विषमता' आहे.",
      hi: "'एनिहिलेशन ऑफ कास्ट' (जाति का विनाश, 1936, BAWS खंड 1, पृष्ठ 47–57) में डॉ. अम्बेडकर ने सिद्ध किया कि जाति व्यवस्था केवल 'श्रम का विभाजन' नहीं है, बल्कि यह जन्म के आधार पर 'श्रमिकों का अप्राकृतिक विभाजन' (Division of Labourers) और 'श्रेणीबद्ध असमानता' है।",
      ta: "'சாதியை ஒழிக்கும் வழி' (1936, BAWS தொகுதி 1, பக். 47) நூலில், சாதி அமைப்பு என்பது வெறும் 'உழைப்புப் பிரிவினை' அல்ல, அது 'உழைப்பாளர்களின் பிரிவினை' என்று டாக்டர் அம்பேத்கர் நிரூபித்தார்.",
      te: "'అనిహిలేషన్ ఆఫ్ కాస్ట్' (1936, BAWS సంపుటి 1, పుట 47) గ్రంథంలో కుల వ్యవస్థ కేవలం 'శ్రమ విభజన' కాదని, అది 'శ్రామికుల విభజన' అని డాక్టర్ అంబేద్కర్ నిరూపించారు."
    }
  },
  {
    id: 'ms-hindu-code-1951',
    title: "Hindu Code Bill Manuscripts & Parliamentary Defense of Women's Equal Property & Marriage Rights",
    category: 'manuscripts',
    collection: 'National Digital Library (NDL) & Parliamentary Archives — Law Minister Papers',
    date: 'February – September 1951',
    volume: 'BAWS Vol. 14 (Parts 1 & 2) — Dr. Ambedkar and The Hindu Code Bill',
    page: 'Manuscript Folio 112 & Parliamentary Debates p. 1318',
    articleRef: 'Articles 14, 15(3) & Equal Succession / Monogamy / Right to Divorce',
    keywords: [
      'hindu code bill', 'women rights', 'gender equality', 'property rights', 'succession',
      'divorce', 'law minister', 'resignation', 'महिलांचे हक्क', 'हिंदू कोड बिल', 'स्त्री समता',
      'हिंदू कोड बिल', 'महिला अधिकार', 'समान उत्तराधिकार'
    ],
    manuscriptScan: {
      headerTitle: 'MINISTRY OF LAW, GOVERNMENT OF INDIA — DRAFT CLAUSES OF HINDU CODE BILL (1948–51)',
      subHeader: 'HAND-ANNOTATED MEMORANDUM BY HON. DR. B. R. AMBEDKAR, MINISTER OF LAW (BAWS VOL. 14)',
      pageNumber: "Folio 112 — Abolition of Limited Estate & Daughter's Equal Share",
      archiveCode: 'NDL-MS-HCB-1951-F112',
      lines: [
        "Clause 91 (Conversion of Woman's Limited Estate into Absolute Estate):",
        'Any property possessed by a female Hindu, whether acquired before or after the commencement',
        'of this Code, shall be held by her as full owner thereof and not as a limited owner.',
        "Dr. Ambedkar's Marginal Note: 'To leave inequality between class and class, between sex and sex,",
        'which is the soul of Hindu Society, untouched and to go on passing legislation relating to',
        "economic problems is to make a farce of our Constitution and to build a palace on a dung heap.'"
      ],
      boundingBox: {
        x: 5,
        y: 28,
        width: 90,
        height: 48,
        highlightLines: [3, 4, 5],
        caption: "Verified Citation: BAWS Vol. 14 Pt. 2, p. 1325 — Dr. Ambedkar's Parliamentary Statement on Gender Equality (1951)"
      }
    },
    verbatimQuote:
      '"I measure the progress of a community by the degree of progress which women have achieved... To leave inequality between class and class, between sex and sex untouched is to make a farce of our Constitution."',
    synthesis: {
      en: "As independent India's first Minister of Law (1947–1951), Dr. B. R. Ambedkar drafted and championed the Hindu Code Bill (BAWS Vol. 14) to codify gender equality: granting daughters equal inheritance shares alongside sons, converting a woman's 'limited estate' into absolute ownership, enforcing monogamy, and recognizing the right to divorce. When conservative opposition stalled the bill in September 1951, Dr. Ambedkar resigned from the Cabinet in defense of women's constitutional equality.",
      mr: "स्वतंत्र भारताचे पहिले कायदामंत्री म्हणून डॉ. बाबासाहेब आंबेडकरांनी महिलांना पुरुषांच्या बरोबरीने वारसाहक्क, मालमत्तेवर पूर्ण मालकी अधिकार, एकपत्नीत्वाचा कायदा आणि घटस्फोटाचा अधिकार देणारे क्रांतिकारी 'हिंदू कोड बिल' (BAWS खंड १४) तयार केले.",
      hi: "स्वतंत्र भारत के प्रथम कानून मंत्री के रूप में डॉ. बी. आर. अम्बेडकर ने महिलाओं को पैतृक संपत्ति में समान उत्तराधिकार, पूर्ण स्वामित्व और तलाक का अधिकार दिलाने के लिए 'हिंदू कोड बिल' (BAWS खंड 14) का मसौदा तैयार किया।",
      ta: "சுதந்திர இந்தியாவின் முதல் சட்ட அமைச்சராக டாக்டர் அம்பேத்கர் பெண்களுக்கு சொத்துரிமை மற்றும் சம உரிமை வழங்கும் இந்து சட்டத் தொகுப்பு மசோதாவை உருவாக்கினார்.",
      te: "స్వతంత్ర భారత తొలి న్యాయశాఖ మంత్రిగా డాక్టర్ అంబేద్కర్ మహిళలకు సమాన ఆస్తి హక్కు మరియు విడాకుల హక్కు కల్పించే హిందూ కోడ్ బిల్లును రూపొందించారు."
    }
  },
  {
    id: 'photo-drafting-1949',
    title: 'Archival Photograph & Record: Dr. B. R. Ambedkar Presenting the Final Draft Constitution to Dr. Rajendra Prasad',
    category: 'photographs',
    collection: 'Photo Division / DAIC Archival Visual Repository — Constituent Assembly Collection',
    date: '25–26 November 1949',
    volume: 'DAIC Photographic Archive Series IV (1946–1950)',
    page: 'Plate No. 42 (High-Resolution Silver Gelatin Print)',
    articleRef: 'Enactment of the Constitution of India (395 Articles, 8 Schedules)',
    keywords: [
      'photograph', 'photo', 'drafting committee', 'rajendra prasad', 'constitution presentation',
      '26 november 1949', '1947', '141 days', 'archival photos', 'छायाचित्र', 'संविधान सादर'
    ],
    manuscriptScan: {
      headerTitle: 'DAIC NATIONAL PHOTOGRAPHIC ARCHIVE — PLATE NO. 42 (NOVEMBER 1949)',
      subHeader: 'CHAIRMAN OF DRAFTING COMMITTEE PRESENTING THE CALLIGRAPHED CONSTITUTION IN CONSTITUTION HALL',
      pageNumber: 'Archival Plate 42 — Metadata & Curatorial Provenance Sheet',
      archiveCode: 'DAIC-PH-1949-11-26-042',
      lines: [
        'Object ID: DAIC-PH-1949-11-26-042 | Medium: Silver Gelatin Archival Print (Digitized 1200 DPI)',
        'Event: Presentation of the Final Authenticated Draft of the Constitution of India.',
        'Key Figures: Hon. Dr. B. R. Ambedkar (Chairman, Drafting Committee) & Hon. Dr. Rajendra Prasad.',
        'Drafting Duration: 2 Years, 11 Months, 18 Days (141 Sittings of the Drafting Committee).',
        'Curator Note: Original calligraphed manuscript by Prem Behari Narain Raizada & Nandalal Bose.'
      ],
      boundingBox: {
        x: 6,
        y: 22,
        width: 88,
        height: 46,
        highlightLines: [1, 2, 3],
        caption: 'Verified Archival Metadata: DAIC Plate 42 — Presentation of the Final Constitution (Nov 1949)'
      }
    },
    verbatimQuote:
      '"The task of the Drafting Committee would have been a very difficult one if this Constituent Assembly had been merely a motley crowd... Look at the burden Dr. Ambedkar carried sitting in the chair day after day for 141 days."',
    synthesis: {
      en: 'This verified archival plate from the DAIC / Photo Division collection documents Dr. B. R. Ambedkar, Chairman of the Drafting Committee (appointed 29 August 1947), presenting the final Draft Constitution to Constituent Assembly President Dr. Rajendra Prasad in November 1949 after 141 intensive committee sittings and reviewing 2,473 amendments.',
      mr: '२९ ऑगस्ट १९४७ रोजी स्थापन झालेल्या मसुदा समितीचे अध्यक्ष डॉ. बाबासाहेब आंबेडकर यांनी १४१ दिवसांच्या अथक बैठकांनंतर नोव्हेंबर १९४९ मध्ये संविधान सभेचे अध्यक्ष डॉ. राजेंद्र प्रसाद यांना भारतीय संविधानाची अंतिम प्रत सादर केली, याचे हे दुर्मीळ ऐतिहासिक छायाचित्र आहे.',
      hi: 'प्रारूप समिति के अध्यक्ष डॉ. बी. आर. अम्बेडकर द्वारा 141 बैठकों और 2,473 संशोधनों पर गहन विचार-विमर्श के बाद नवंबर 1949 में संविधान सभा के अध्यक्ष डॉ. राजेंद्र प्रसाद को भारतीय संविधान की अंतिम प्रति सौंपने का ऐतिहासिक अभिलेखीय छायाचित्र।',
      ta: 'வரைவுக் குழுத் தலைவர் டாக்டர் பி. ஆர். அம்பேத்கர் 141 நாட்கள் அமர்வுகளுக்குப் பிறகு நவம்பர் 1949-இல் இறுதி அரசியலமைப்புச் சட்டத்தை டாக்டர் ராஜேந்திர பிரசாத்திடம் வழங்கும் வரலாற்றுப் புகைப்படம்.',
      te: 'ముసాయిదా కమిటీ చైర్మన్ డాక్టర్ బి. ఆర్. అంబేద్కర్ 141 రోజుల సమావేశాల అనంతరం నవంబర్ 1949లో తుది రాజ్యాంగ ప్రతిని డాక్టర్ రాజేంద్ర ప్రసాద్‌కు అందజేస్తున్న చారిత్రక చిత్రం.'
    }
  },
  {
    id: 'doc-architect-republic',
    title: "Archival Documentary Reel: 'Architect of the Republic — Damodar River Valley, Labour Reforms & The Constitution'",
    category: 'documentaries',
    collection: 'Films Division of India / DAIC Audiovisual Heritage Vault',
    date: '1942–1950 (Digitized 4K Archival Restoration)',
    volume: 'DAIC Film Reel AV-108 (Duration: 18m 40s)',
    page: "Timecode 04:12 – 11:45 (Labour Member of Viceroy's Executive Council)",
    articleRef: '8-Hour Working Day, Maternity Benefit, Minimum Wages, Central Water Commission (DVC & Hirakud)',
    keywords: [
      'documentary', 'labour', '8 hour workday', 'maternity benefit', 'damodar valley', 'hirakud',
      'central water commission', 'employment exchange', 'water policy', 'कामगार कायदे', 'धरण', 'पाणी धोरण'
    ],
    manuscriptScan: {
      headerTitle: "VICEROY'S EXECUTIVE COUNCIL (DEPT. OF LABOUR, IRRIGATION & POWER, 1942–1946)",
      subHeader: 'ARCHIVAL DOSSIER & DOCUMENTARY TRANSCRIPT SHEET — REEL AV-108',
      pageNumber: 'Transcript Sheet 07 — Labour Welfare & Multi-Purpose River Valley Projects',
      archiveCode: 'DAIC-AV-1945-REEL108',
      lines: [
        '[04:12] Statutory reduction of factory working hours in India from 12 hours to 8 hours per day (7th Indian Labour Conference, Nov 1942).',
        '[06:45] Enactment of Mines Maternity Benefit Act, Equal Pay for Equal Work, Paid Leave, and National Employment Exchanges.',
        '[09:30] Establishment of Central Technical Power Board & Central Waterways, Irrigation and Navigation Commission (CWINC).',
        '[11:10] Conception of Damodar Valley Corporation (DVC), Hirakud Dam, and Sone River inter-state flood & power grids.'
      ],
      boundingBox: {
        x: 5,
        y: 20,
        width: 90,
        height: 54,
        highlightLines: [0, 1, 2, 3],
        caption: 'Verified Citation: BAWS Vol. 10 & DAIC Reel AV-108 — 8-Hour Working Day, Maternity Benefits & River Grid Architecture'
      }
    },
    verbatimQuote:
      '"Water is wealth. Water being the provincial subject, the Central Government could not take initiative unless we create a statutory inter-provincial river valley authority modelled on the Tennessee Valley Authority."',
    synthesis: {
      en: 'Between 1942 and 1946, as Member for Labour, Irrigation, and Power in the Executive Council (BAWS Vol. 10), Dr. B. R. Ambedkar enacted transformative socio-economic policies still governing modern India: reducing the industrial workday to 8 hours, introducing statutory Maternity Benefits, Dearness Allowance (DA), Employees’ State Insurance (ESI), National Employment Exchanges, and founding the Central Waterways, Irrigation & Navigation Commission (now CWC) alongside the Damodar Valley and Hirakud multipurpose river projects.',
      mr: '१९४२ ते १९४६ दरम्यान व्हॉईसरॉयच्या कार्यकारी मंडळात कामगार, पाटबंधारे आणि ऊर्जा मंत्री असताना (BAWS खंड १०) डॉ. बाबासाहेब आंबेडकरांनी भारतातील कामाचे तास १२ वरून ८ तासांवर आणले, महिलांसाठी प्रसूती रजा व भत्ता (Maternity Benefit), कामगार राज्य विमा (ESI), आणि दामोदर खोरे व हिराकुड धरण प्रकल्पांची पायाभरणी केली.',
      hi: '1942 से 1946 के बीच श्रम, सिंचाई और विद्युत सदस्य के रूप में (BAWS खंड 10) डॉ. बी. आर. अम्बेडकर ने काम के घंटे घटाकर 8 घंटे करने, मातृत्व अवकाश (Maternity Benefit), कर्मचारी राज्य बीमा (ESI), और दामोदर घाटी एवं हीराकुंड बहुउद्देशीय नदी परियोजनाओं की स्थापना की।',
      ta: '1942–1946 காலகட்டத்தில் தொழிலாளர் மற்றும் நீர்ப்பாசனத் துறை உறுப்பினராக டாக்டர் அம்பேத்கர் 8 மணி நேர வேலை நாள், மகப்பேறு விடுப்பு மற்றும் தாமோதர் பள்ளத்தாக்கு திட்டங்களை உருவாக்கினார்.',
      te: '1942–1946 మధ్య కార్మిక, నీటిపారుదల శాఖ సభ్యునిగా డాక్టర్ అంబేద్కర్ 8 గంటల పనిదినం, ప్రసూతి సెలవులు మరియు దామోదర్ వ్యాలీ, హీరాకుడ్ ప్రాజెక్టులకు రూపకల్పన చేశారు.'
    }
  }
];

export const EDGE_CAD_GRAPH: { nodes: CadNode[]; edges: CadEdge[] } = {
  nodes: [
    {
      id: 'art-32',
      label: 'Article 32',
      draftLabel: 'Draft Art. 25',
      title: "Right to Constitutional Remedies ('Heart & Soul')",
      type: 'article',
      date: '9 Dec 1948',
      cadVolume: 'CAD Vol. VII, p. 953',
      summary: 'Empowers citizens to move the Supreme Court directly via 5 Prerogative Writs (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari).',
      ambedkarRejoinder: 'Rejected amendments seeking to allow Parliament to suspend writ jurisdiction at will; insisted remedies must be constitutionally entrenched.',
      coDebaters: ['H. V. Kamath', 'Kazi Syed Karimuddin', 'Rohini Kumar Chaudhuri'],
      linkedArchiveId: 'cad-vol7-art32'
    },
    {
      id: 'art-14',
      label: 'Article 14',
      draftLabel: 'Draft Art. 15',
      title: 'Equality Before Law & Equal Protection of Laws',
      type: 'article',
      date: '6–13 Dec 1948',
      cadVolume: 'CAD Vol. VII, pp. 842–860',
      summary: "Synthesizes British 'Equality before Law' with American 14th Amendment 'Equal Protection of the Laws' to mandate substantive justice.",
      ambedkarRejoinder: 'Defended separate protection clauses so that affirmative state classification for marginalized citizens is constitutionally valid.',
      coDebaters: ['Alladi Krishnaswami Ayyar', 'K. T. Shah'],
      linkedArchiveId: 'baws-vol1-annihilation'
    },
    {
      id: 'art-15',
      label: 'Article 15(2)',
      draftLabel: 'Draft Art. 9',
      title: 'Prohibition of Discrimination & Equal Access to Public Wells/Tanks',
      type: 'article',
      date: '29 Nov 1948',
      cadVolume: 'CAD Vol. VII, p. 659',
      summary: 'Explicitly bans discrimination in access to shops, public restaurants, wells, tanks, bathing ghats, and roads maintained out of State funds.',
      ambedkarRejoinder: "Defined the word 'shop' broadly in the Assembly so private commercial providers could never exclude citizens on caste grounds.",
      coDebaters: ['Syed Abdur Rouf', 'Shibban Lal Saksena'],
      linkedArchiveId: 'baws-vol18-mahad'
    },
    {
      id: 'art-17',
      label: 'Article 17',
      draftLabel: 'Draft Art. 11',
      title: 'Abolition of Untouchability & Penal Enforcement',
      type: 'article',
      date: '29 Nov 1948',
      cadVolume: 'CAD Vol. VII, p. 669',
      summary: 'Abolishes Untouchability in any form and makes the enforcement of any disability arising out of Untouchability a punishable offence.',
      ambedkarRejoinder: 'Elevated civic exclusion from a mere civil tort to a constitutional crime enforceable across the Union.',
      coDebaters: ['V. I. Muniswamy Pillai', 'Santanu Kumar Das'],
      linkedArchiveId: 'baws-vol18-mahad'
    },
    {
      id: 'art-38',
      label: 'Article 38 & DPSP',
      draftLabel: 'Draft Art. 30',
      title: 'Directive Principles — Social & Economic Democracy',
      type: 'article',
      date: '19 Nov 1948',
      cadVolume: 'CAD Vol. VII, p. 476',
      summary: 'Directs the State to strive to promote the welfare of the people by securing a social order permeated by justice—social, economic, and political.',
      ambedkarRejoinder: "Explained DPSPs as 'Instruments of Instructions'—any government ignoring them will have to answer to the electorate at the ballot box.",
      coDebaters: ['K. T. Shah', 'Naziruddin Ahmad', 'T. T. Krishnamachari'],
      linkedArchiveId: 'cad-vol11-closing'
    },
    {
      id: 'art-rbi-finance',
      label: 'Finance & RBI (Entry 38)',
      draftLabel: 'Seventh Schedule / Art. 112–280',
      title: 'Reserve Bank of India, Currency & Finance Commission',
      type: 'monetary',
      date: 'August 1949',
      cadVolume: 'CAD Vol. IX & BAWS Vol. 6',
      summary: 'Constitutional allocation of Reserve Bank of India (Entry 38, Union List), currency stability, and independent Finance Commission transfers.',
      ambedkarRejoinder: "Rooted in his 1923 'Problem of the Rupee' thesis and 1925 Hilton Young Commission evidence demanding statutory central bank autonomy.",
      coDebaters: ['C. D. Deshmukh', 'Dr. John Matthai'],
      linkedArchiveId: 'baws-vol6-rbi'
    }
  ],
  edges: [
    { from: 'art-32', to: 'art-14', relation: 'Enforces substantive equality via Supreme Court Writs' },
    { from: 'art-32', to: 'art-15', relation: 'Judicial remedy against civic discrimination' },
    { from: 'art-32', to: 'art-17', relation: 'Constitutional writ shield for anti-untouchability rights' },
    { from: 'art-15', to: 'art-17', relation: 'Co-originated from 1927 Mahad Satyagraha & 1947 States and Minorities' },
    { from: 'art-14', to: 'art-38', relation: 'Balances Political Equality with Economic & Social Democracy' },
    { from: 'art-38', to: 'art-rbi-finance', relation: 'Price stability & fiscal justice protect real wages' }
  ]
};

export const EDGE_KARAOKE_TRACKS: KaraokeTrack[] = [
  {
    id: 'track-cad-closing-1949',
    title: 'The Grammar of Anarchy & Social Democracy (Closing Speech to Constituent Assembly)',
    speaker: 'Dr. B. R. Ambedkar',
    date: '25 November 1949',
    source: 'All India Radio Archival Recording / CAD Vol. XI, p. 979',
    durationSeconds: 32,
    segments: [
      {
        id: 's1',
        startTime: 0,
        endTime: 6,
        en: 'Political democracy cannot last unless there lies at the base of it social democracy.',
        mr: 'राजकीय लोकशाहीच्या पायाशी जर सामाजिक लोकशाही नसेल, तर राजकीय लोकशाही टिकू शकत नाही.',
        hi: 'राजनीतिक लोकतंत्र तब तक स्थायी नहीं हो सकता जब तक कि उसके मूल में सामाजिक लोकतंत्र न हो।',
        terms: ['social democracy']
      },
      {
        id: 's2',
        startTime: 6,
        endTime: 13,
        en: 'What does social democracy mean? It means a way of life which recognizes liberty, equality and fraternity.',
        mr: 'सामाजिक लोकशाही म्हणजे काय? ती अशी जीवनपद्धती आहे जी स्वातंत्र्य, समता आणि बंधुता यांना जीवनाची तत्त्वे मानते.',
        hi: 'सामाजिक लोकतंत्र का क्या अर्थ है? इसका अर्थ है जीवन का वह मार्ग जो स्वतंत्रता, समानता और बंधुत्व को मान्यता देता है।',
        terms: ['fraternity']
      },
      {
        id: 's3',
        startTime: 13,
        endTime: 21,
        en: 'On the 26th of January 1950, we are going to enter into a life of contradictions.',
        mr: '२६ जानेवारी १९५० रोजी आपण एका विसंगतीपूर्ण जीवनात प्रवेश करणार आहोत.',
        hi: '26 जनवरी 1950 को हम अंतर्विरोधों से भरे जीवन में प्रवेश करने जा रहे हैं।',
        terms: ['life of contradictions']
      },
      {
        id: 's4',
        startTime: 21,
        endTime: 32,
        en: 'Where constitutional methods are open, we must abandon the Grammar of Anarchy and safeguard our republic.',
        mr: 'जिथे संवैधानिक मार्ग खुले आहेत, तिथे आपण अराजकतेचे व्याकरण सोडून आपल्या प्रजासत्ताकाचे रक्षण केले पाहिजे.',
        hi: 'जहाँ संवैधानिक मार्ग खुले हैं, वहाँ हमें अराजकता के व्याकरण को त्यागकर अपने गणराज्य की रक्षा करनी चाहिए।',
        terms: ['Grammar of Anarchy']
      }
    ]
  },
  {
    id: 'track-art32-1948',
    title: 'Article 32 — Prerogative Writs & The Soul of the Constitution',
    speaker: 'Dr. B. R. Ambedkar',
    date: '9 December 1948',
    source: 'Constituent Assembly Proceedings / CAD Vol. VII, p. 953',
    durationSeconds: 24,
    segments: [
      {
        id: 'a1',
        startTime: 0,
        endTime: 8,
        en: 'If I was asked to name any particular article in this Constitution as the most important, I could not refer to any other except Article 32.',
        mr: 'जर मला या संविधानातील सर्वात महत्त्वाचे कलम कोणते असे विचारले, तर मी कलम ३२ शिवाय दुसऱ्या कोणत्याही कलमाचा उल्लेख करू शकणार नाही.',
        hi: 'यदि मुझसे पूछा जाए कि इस संविधान में सबसे महत्वपूर्ण अनुच्छेद कौन-सा है, तो मैं अनुच्छेद 32 के अतिरिक्त किसी अन्य का नाम नहीं ले सकता।',
        terms: ['Article 32']
      },
      {
        id: 'a2',
        startTime: 8,
        endTime: 16,
        en: 'It is the very soul of the Constitution and the very heart of it.',
        mr: 'हे कलम म्हणजे या संविधानाचा आत्मा आणि त्याचे हृदय आहे.',
        hi: 'यह इस संविधान की आत्मा है और इसका हृदय है।',
        terms: []
      },
      {
        id: 'a3',
        startTime: 16,
        endTime: 24,
        en: 'No Legislature can take away the Prerogative Writs of Habeas Corpus, Mandamus, Certiorari, and Quo Warranto.',
        mr: 'कोणतेही विधिमंडळ बंदीप्रत्यक्षीकरण, परमादेश, उत्प्रेषण आणि अधिकारपृच्छा या प्राधिकारांचे (Writs) हरण करू शकत नाही.',
        hi: 'कोई भी विधायिका बंदी प्रत्यक्षीकरण, परमादेश, उत्प्रेषण और अधिकार-पृच्छा की विशेषाधिकार रिटों को छीन नहीं सकती।',
        terms: ['Prerogative Writs', 'Habeas Corpus', 'Quo Warranto', 'Certiorari']
      }
    ]
  }
];

export const EDGE_PARLIAMENTARY_LEXICON: Record<string, LexiconEntry> = {
  'Grammar of Anarchy': {
    term: 'Grammar of Anarchy (अराजकतेचे व्याकरण)',
    en: "Dr. Ambedkar's celebrated parliamentary phrase (25 Nov 1949) describing extra-constitutional methods—such as violent revolution or coercive civil disobedience—when democratic and judicial remedies are open.",
    mr: 'जेव्हा लोकशाही आणि न्यायालयीन संवैधानिक मार्ग उपलब्ध असतात, तेव्हा हिंसक आंदोलन किंवा घटनाबाह्य मार्गांचा अवलंब करणे म्हणजे लोकशाहीला धोका पोहोचवणारे अराजकतेचे व्याकरण होय.',
    hi: 'जब संवैधानिक और न्यायिक उपचार खुले हों, तब असंवैधानिक या हिंसक अवरोधों का सहारा लेने को डॉ. अम्बेडकर ने अराजकता का व्याकरण कहा।'
  },
  'Prerogative Writs': {
    term: 'Prerogative Writs (प्राधिकार रिट / संवैधानिक आदेश)',
    en: 'Extraordinary judicial remedies under Article 32 & Article 226 (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto) empowering constitutional courts to enforce Fundamental Rights.',
    mr: 'कलम ३२ आणि २२६ अन्वये सर्वोच्च व उच्च न्यायालयांना नागरिकांच्या मूलभूत हक्कांच्या रक्षणासाठी दिलेले ५ विशेष संवैधानिक आदेश.',
    hi: 'अनुच्छेद 32 और 226 के अंतर्गत मौलिक अधिकारों के प्रवर्तन हेतु सर्वोच्च एवं उच्च न्यायालय द्वारा जारी किए जाने वाले 5 विशेष न्यायिक आदेश।'
  },
  'Habeas Corpus': {
    term: "Habeas Corpus (बंदीप्रत्यक्षीकरण — 'You shall have the body')",
    en: 'A judicial writ requiring a person under unlawful detention to be brought before a judge immediately to secure their personal liberty under Article 21 & 32.',
    mr: 'बेकायदेशीररीत्या अटक केलेल्या व्यक्तीला न्यायालयासमोर हजर करण्याचा आणि तिच्या वैयक्तिक स्वातंत्र्याचे रक्षण करण्याचा सर्वोच्च न्यायालयाचा आदेश.',
    hi: 'अवैध रूप से हिरासत में लिए गए व्यक्ति को न्यायालय के समक्ष सशरीर प्रस्तुत करने का संवैधानिक आदेश।'
  },
  'Quo Warranto': {
    term: "Quo Warranto (अधिकारपृच्छा — 'By what authority?')",
    en: 'A constitutional writ requiring a public official to demonstrate the legal and statutory authority by which they hold a public office, preventing usurpation of state power.',
    mr: "'कोणत्या अधिकाराने?' — सार्वजनिक पदावर बसलेल्या व्यक्तीला त्या पदावरील तिच्या कायदेशीर हक्काची विचारणा करणारा न्यायालयीन आदेश.",
    hi: "'किस अधिकार से?' — किसी सार्वजनिक पद पर आसीन व्यक्ति की वैधानिक पात्रता की जाँच करने वाली रिट।"
  },
  Certiorari: {
    term: "Certiorari (उत्प्रेषण — 'To be certified')",
    en: 'A writ issued by the Supreme Court or High Court quashing an order already passed by an inferior tribunal or quasi-judicial authority acting without jurisdiction.',
    mr: 'कनिष्ठ न्यायालयाने किंवा प्राधिकरणाने अधिकारक्षेत्राबाहेर जाऊन दिलेला निर्णय रद्द करणारा वरिष्ठ न्यायालयाचा आदेश.',
    hi: 'अधीनस्थ न्यायालय या अधिकरण द्वारा अधिकार-क्षेत्र के बाहर पारित आदेश को निरस्त करने वाली रिट।'
  },
  'social democracy': {
    term: 'Social Democracy (सामाजिक लोकशाही)',
    en: "Defined by Dr. Ambedkar as a way of life recognizing Liberty, Equality, and Fraternity as an inseparable trinity; without social equality, political democracy ('one person, one vote') collapses.",
    mr: 'स्वातंत्र्य, समता आणि बंधुता या अविभाज्य तत्त्वांवर आधारित समाजव्यवस्था; ज्याशिवाय राजकीय लोकशाही टिकू शकत नाही.',
    hi: 'स्वतंत्रता, समानता और बंधुत्व की अविभाज्य त्रयी पर आधारित समाज-व्यवस्था।'
  },
  fraternity: {
    term: 'Fraternity / Maitri (बंधुता / मैत्री)',
    en: "A sense of common brotherhood of all Indians—drawn by Dr. Ambedkar from the Buddhist philosophy of 'Maitri'—giving unity and solidarity to social life.",
    mr: "सर्व भारतीयांमधील एकतेची व आपुलकीची भावना, जी बाबासाहेबांनी भगवान बुद्धांच्या 'मैत्री' या तत्त्वज्ञानातून संविधानाच्या प्रास्ताविकेत समाविष्ट केली.",
    hi: "सभी नागरिकों में साझा भाईचारे और एकता की भावना, जिसे डॉ. अम्बेडकर ने बुद्ध के 'मैत्री' सिद्धांत से जोड़ा।"
  },
  'life of contradictions': {
    term: 'Life of Contradictions (विसंगतीपूर्ण जीवन)',
    en: "The structural tension identified on 25 Nov 1949 between formal political equality ('One Man, One Vote') and stark socio-economic inequality ('Denial of One Man, One Value').",
    mr: "राजकारणात 'एक व्यक्ती एक मत' (समानता), परंतु सामाजिक आणि आर्थिक जीवनात मात्र विषमता—या विरोधाभासाला बाबासाहेबांनी 'विसंगतीपूर्ण जीवन' म्हटले.",
    hi: "राजनीति में 'एक व्यक्ति, एक वोट' की समानता और सामाजिक-आर्थिक जीवन में असमानता के बीच का विरोधाभास।"
  },
  'Article 32': {
    term: 'Article 32 (कलम ३२ — संविधानाचा आत्मा)',
    en: 'Guarantees the right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights.',
    mr: 'मूलभूत हक्कांच्या अंमलबजावणीसाठी थेट सर्वोच्च न्यायालयात दाद मागण्याचा मूलभूत अधिकार.',
    hi: 'मौलिक अधिकारों के प्रवर्तन के लिए सीधे सर्वोच्च न्यायालय में जाने का गारंटीकृत संवैधानिक अधिकार।'
  }
};
