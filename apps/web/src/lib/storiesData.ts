export interface CuratedStory {
  slug: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  subtitleEn: string;
  subtitleHi: string;
  subtitleMr: string;
  readTime: string;
  chaptersCount: number;
  period: string;
  theme: string;
  primaryImage: string;
  quoteEn: string;
  quoteSource: string;
}

export const STORIES_DATA: CuratedStory[] = [
  {
    slug: "mahad-satyagraha",
    titleEn: "The Mahad Satyagraha: Water as a Human Right",
    titleHi: "महाड़ सत्याग्रह: मानवाधिकार के रूप में जल",
    titleMr: "महाड सत्याग्रह: मानवी हक्क म्हणून पिण्याचे पाणी",
    subtitleEn: "The March 1927 historic civil rights assertion at Chavdar Lake, transforming caste assertion into universal human dignity.",
    subtitleHi: "मार्च 1927 का चवदार तालाब पर ऐतिहासिक नागरिक अधिकार आंदोलन जिसने मानवीय गरिमा को स्थापित किया।",
    subtitleMr: "मार्च १९२७ चा चवदार तळ्यावरील ऐतिहासिक लढा; मानवी हक्क आणि समतेचा पहिला सार्वत्रिक हुंकार.",
    readTime: "7 min read",
    chaptersCount: 4,
    period: "1927",
    theme: "Civil Rights & Dignity",
    primaryImage: "chavdar_lake_drawing.png",
    quoteEn: "“It is not that you will become immortal by drinking water from Chavdar Tale... We have gone to the tank only to prove that we too are human beings.”",
    quoteSource: "BAWS Vol. 17, Part III",
  },
  {
    slug: "drafting-the-constitution",
    titleEn: "Drafting the World's Longest Written Constitution",
    titleHi: "विश्व के सबसे बड़े लिखित संविधान का निर्माण",
    titleMr: "जगातील सर्वात मोठ्या लिखित संविधानाची निर्मिती",
    subtitleEn: "Inside Constitution Hall from August 1947 to November 1949: Dr. Ambedkar's monumental defense of liberty, equality, and fraternity.",
    subtitleHi: "अगस्त 1947 से नवंबर 1949 तक संविधान सभा के अंदर: स्वतंत्रता, समानता और बंधुत्व की रक्षा का ऐतिहासिक सफर।",
    subtitleMr: "ऑगस्ट १९४७ ते नोव्हेंबर १९४९ दरम्यान संविधान सभागृहातील अभूतपूर्व बौद्धिक संग्राम आणि लोकशाहीची पायाभरणी.",
    readTime: "10 min read",
    chaptersCount: 5,
    period: "1947 - 1949",
    theme: "Constitutional Democracy",
    primaryImage: "constitution_assembly_scans.png",
    quoteEn: "“Political democracy cannot last unless there lies at the base of it social democracy... which recognizes liberty, equality and fraternity as the principles of life.”",
    quoteSource: "Constituent Assembly Debates, Nov 25, 1949",
  },
  {
    slug: "columbia-to-london",
    titleEn: "Columbia to London: The Making of an Economist",
    titleHi: "कोलंबिया से लंदन: एक महान अर्थशास्त्री का उदय",
    titleMr: "कोलंबिया ते लंडन: जागतिक दर्जाच्या अर्थतज्ज्ञाची जडणघडण",
    subtitleEn: "How a young scholar from Baroda conquered Western universities, formulated provincial fiscal autonomy, and designed currency reforms.",
    subtitleHi: "बड़ौदा के एक युवा विद्वान ने पश्चिमी विश्वविद्यालयों में प्रांतीय वित्त और मुद्रा सुधारों की नींव कैसे रखी।",
    subtitleMr: "बडोद्याच्या राजसभेतील युवा विद्वानाने जागतिक विद्यापीठांत जाऊन भारतीय चलन व अर्थव्यवस्थेची केलेली पुनर्मांडणी.",
    readTime: "8 min read",
    chaptersCount: 4,
    period: "1913 - 1923",
    theme: "Economics & Public Finance",
    primaryImage: "lse_columbia_thesis.png",
    quoteEn: "“The trade of a country depends upon the stability of its currency. A fluctuating rupee is a tax on industry and commerce.”",
    quoteSource: "The Problem of the Rupee (1923), BAWS Vol. 6",
  },
  {
    slug: "conversion-at-nagpur",
    titleEn: "The Conversion at Nagpur: A Philosophy of Liberation",
    titleHi: "नागपुर में धम्मदीक्षा: मुक्ति का दर्शन",
    titleMr: "नागपूरची धम्मदीक्षा: सामाजिक मुक्तीचे तत्वज्ञान",
    subtitleEn: "October 14, 1956: The monumental religious reorientation at Deekshabhoomi, establishing Navayana Buddhism based on social morality.",
    subtitleHi: "14 अक्टूबर 1956: दीक्षाभूमि पर ऐतिहासिक धम्मदीक्षा, सामाजिक नैतिकता पर आधारित नवयान बौद्ध धर्म की स्थापना।",
    subtitleMr: "१४ ऑक्टोबर १९५६: दीक्षाभूमीवरील युगप्रवर्तक धम्मदीक्षा आणि मानवी स्वातंत्र्य-समतेवर आधारलेल्या नवयानाची पहाट.",
    readTime: "9 min read",
    chaptersCount: 4,
    period: "1956",
    theme: "Spiritual Renaissance",
    primaryImage: "deekshabhoomi_scroll.png",
    quoteEn: "“Religion must mainly be a matter of principles only. It cannot be a matter of rules... Morality is the essence of Dhamma.”",
    quoteSource: "The Buddha and His Dhamma, BAWS Vol. 11",
  },
];
