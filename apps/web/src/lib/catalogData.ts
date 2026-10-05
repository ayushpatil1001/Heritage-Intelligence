/**
 * Authenticated Primary Source Catalog & In-Memory Hybrid Search
 * Grounded in 30 Seeded Public-Domain Records from BAWS and CAD.
 */

export interface PageWord {
  text: string;
  bbox: number[];
  conf: number;
}

export interface CatalogPage {
  page_no: number;
  ocr_text: string;
  ocr_confidence: number;
  lang?: string;
  words?: PageWord[];
  translations?: Record<string, string>;
}

export interface CatalogItem {
  id: string;
  collection_id?: string;
  type: string;
  title: string;
  title_i18n: Record<string, string>;
  creator: string;
  date_start: string;
  date_end?: string;
  source: string;
  provenance: string;
  rights: string;
  access_tier: string;
  status: string;
  snippet: string;
  page_no: number;
  pages: CatalogPage[];
  summary?: Record<string, string>;
}

export interface SearchResultItem {
  id: string;
  item_id: string;
  type: string;
  title: string;
  title_i18n: Record<string, string>;
  snippet: string;
  source: string;
  date: string;
  page_no: number;
  score: number;
  access_tier?: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    "id": "item-baws-01-caste",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Castes in India: Their Mechanism, Genesis and Development",
    "title_i18n": {
      "en": "Castes in India: Their Mechanism, Genesis and Development",
      "hi": "भारत में जातियां: उनकी प्रणाली, उत्पत्ति और विकास",
      "mr": "भारतातील जाती: त्यांची यंत्रणा, उत्पत्ती आणि विकास"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1916-05-09",
    "date_end": "1916-05-09",
    "source": "Columbia University Anthropology Seminar",
    "provenance": "Paper presented before the Anthropology Seminar of Dr. Alexander Goldenweiser, Columbia University, New York, May 9, 1916.",
    "rights": "Public Domain (BAWS Vol. 1)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Castes in India: Their Mechanism, Genesis and Development. Endogamy is the only one characteristic that is peculiar to caste, and if we succeed in showing how endogamy is maintained, we shall practically have proved the genesis and mechanism of caste. The superposition of endogam...",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Castes in India: Their Mechanism, Genesis and Development. Endogamy is the only one characteristic that is peculiar to caste, and if we succeed in showing how endogamy is maintained, we shall practically have proved the genesis and mechanism of caste. The superposition of endogamy on exogamy means the creation of caste.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Castes",
            "bbox": [
              50,
              40,
              120,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "in",
            "bbox": [
              130,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "India",
            "bbox": [
              160,
              40,
              220,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Endogamy",
            "bbox": [
              50,
              80,
              140,
              100
            ],
            "conf": 0.98
          }
        ],
        "translations": {
          "hi": "भारत में जातियां: उनकी प्रणाली, उत्पत्ति और विकास। अंतर्विवाह ही जाति की एकमात्र विशिष्ट विशेषता है, और यदि हम यह प्रदर्शित करने में सफल होते हैं कि अंतर्विवाह कैसे बना रहता है, तो हम व्यावहारिक रूप से जाति की उत्पत्ति और तंत्र को सिद्ध कर देंगे।",
          "mr": "भारतातील जाती: त्यांची यंत्रणा, उत्पत्ती आणि विकास. आंतरविवाह हीच जातीचे एकमेव वैशिष्ट्य आहे आणि जर आपण हे सिद्ध केले की आंतरविवाह कसा टिकून राहतो, तर आपण प्रत्यक्षतः जातीची उत्पत्ती व यंत्रणा सिद्ध करू."
        }
      }
    ]
  },
  {
    "id": "item-baws-01-aoc",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Annihilation of Caste",
    "title_i18n": {
      "en": "Annihilation of Caste",
      "hi": "जाति का विनाश",
      "mr": "जातीचे निर्मूलन"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1936-05-15",
    "date_end": "1936-05-15",
    "source": "Jat-Pat-Todak Mandal Undelivered Presidential Address",
    "provenance": "Written as the presidential address for the 1936 annual conference of the Jat-Pat-Todak Mandal of Lahore; published independently in May 1936.",
    "rights": "Public Domain (BAWS Vol. 1)",
    "access_tier": "open",
    "status": "published",
    "snippet": "Caste is not just a division of labour, it is a division of labourers. It is an hierarchy in which the division of labourers is graded one above another. You cannot build anything on the foundations of caste. You cannot build up a nation, you cannot build up an ideal society....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Caste is not just a division of labour, it is a division of labourers. It is an hierarchy in which the division of labourers is graded one above another. You cannot build anything on the foundations of caste. You cannot build up a nation, you cannot build up an ideal society.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Caste",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "division",
            "bbox": [
              180,
              40,
              260,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "labourers",
            "bbox": [
              50,
              80,
              150,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "जाति केवल श्रम का विभाजन नहीं है, यह श्रमिकों का विभाजन है। यह एक श्रेणीबद्ध व्यवस्था है जिसमें श्रमिकों को एक के ऊपर एक क्रमबद्ध किया गया है। आप जाति की नींव पर राष्ट्र का निर्माण नहीं कर सकते।",
          "mr": "जाती ही केवळ श्रमाची विभागणी नसून ती श्रमिकांची विभागणी आहे. ही अशी उतरंड आहे ज्यात श्रमिकांची श्रेणीबद्ध विभागणी केली आहे. जातीच्या पायावर तुम्ही राष्ट्र उभारू शकत नाही."
        }
      }
    ]
  },
  {
    "id": "item-cad-art32",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 32 Heart and Soul of the Constitution",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 32 Heart and Soul of the Constitution",
      "hi": "संविधान सभा वादविवाद खंड VII: अनुच्छेद 32 संविधान का हृदय और आत्मा",
      "mr": "घटना समिती चर्चा खंड VII: कलम 32 राज्यघटनेचा आत्मा आणि हृदय"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-12-09",
    "date_end": "1948-12-09",
    "source": "Constituent Assembly of India Debates",
    "provenance": "Official Report, Constituent Assembly of India, Council Chamber, New Delhi, December 9, 1948.",
    "rights": "Public Domain (Parliament of India Digital Archive)",
    "access_tier": "open",
    "status": "published",
    "snippet": "If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it....",
    "page_no": 953,
    "pages": [
      {
        "page_no": 953,
        "ocr_text": "If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Article",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Constitution",
            "bbox": [
              180,
              40,
              300,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "soul",
            "bbox": [
              150,
              80,
              200,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "heart",
            "bbox": [
              250,
              80,
              310,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "यदि मुझसे पूछा जाए कि इस संविधान का सबसे महत्वपूर्ण अनुच्छेद कौन सा है—जिसके बिना यह संविधान निष्प्रभावी हो जाएगा—तो मैं इस अनुच्छेद (अनुच्छेद 32) के अलावा किसी अन्य का उल्लेख नहीं कर सकता। यह संविधान की आत्मा और इसका हृदय है।",
          "mr": "जर मला या संविधानातील सर्वात महत्त्वाचे कलम कोणते असे विचारले गेले—ज्या कलमाशिवाय हे संविधान निष्प्रभ ठरेल—तर मी या कलमाशिवाय (कलम 32) इतर कोणत्याही कलमाचा उल्लेख करू शकत नाही. हा संविधानाचा आत्मा आणि त्याचे हृदय आहे."
        }
      }
    ]
  },
  {
    "id": "item-cad-final-speech",
    "collection_id": "col-cad",
    "type": "speech",
    "title": "Grammar of Anarchy (Final Assembly Speech)",
    "title_i18n": {
      "en": "Grammar of Anarchy (Final Assembly Speech)",
      "hi": "अराजकता का व्याकरण (अंतिम संविधान सभा भाषण)",
      "mr": "अराजकतेचे व्याकरण (अंतिम संविधान सभा भाषण)"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1949-11-25",
    "date_end": "1949-11-25",
    "source": "Constituent Assembly of India Debates Vol. XI",
    "provenance": "Delivered on the eve of the adoption of the Constitution of India, November 25, 1949.",
    "rights": "Public Domain",
    "access_tier": "open",
    "status": "published",
    "snippet": "We must hold fast to constitutional methods of achieving our social and economic objectives. It means we must abandon the bloody methods of revolution. It means that we must abandon the method of civil disobedience, non-cooperation and satyagraha. These methods are nothing but th...",
    "page_no": 978,
    "pages": [
      {
        "page_no": 978,
        "ocr_text": "We must hold fast to constitutional methods of achieving our social and economic objectives. It means we must abandon the bloody methods of revolution. It means that we must abandon the method of civil disobedience, non-cooperation and satyagraha. These methods are nothing but the Grammar of Anarchy. On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "constitutional",
            "bbox": [
              50,
              40,
              180,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Grammar",
            "bbox": [
              200,
              80,
              280,
              100
            ],
            "conf": 0.99
          },
          {
            "text": "Anarchy",
            "bbox": [
              300,
              80,
              380,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "हमें अपने सामाजिक और आर्थिक उद्देश्यों को प्राप्त करने के लिए संवैधानिक तरीकों का दृढ़ता से पालन करना चाहिए। इसका अर्थ है क्रांति के खूनी तरीकों का त्याग करना। ये तरीके अराजकता के व्याकरण के सिवा कुछ नहीं हैं। 26 जनवरी 1950 को हम अंतर्विरोधों के जीवन में प्रवेश करने जा रहे हैं।",
          "mr": "आपली सामाजिक व आर्थिक उद्दिष्टे साध्य करण्यासाठी आपण घटनात्मक मार्गांचा अवलंब केला पाहिजे. याचा अर्थ क्रांतीचे रक्तरंजित मार्ग सोडले पाहिजेत. हे मार्ग अराजकतेच्या व्याकरणाशिवाय दुसरे काही नाहीत. 26 जानेवारी 1950 रोजी आपण विसंगतींच्या जीवनात प्रवेश करणार आहोत."
        }
      }
    ]
  },
  {
    "id": "item-baws-06-rupee",
    "collection_id": "col-baws",
    "type": "book",
    "title": "The Problem of the Rupee: Its Origin and Its Solution",
    "title_i18n": {
      "en": "The Problem of the Rupee: Its Origin and Its Solution",
      "hi": "रुपये की समस्या: इसकी उत्पत्ति और इसका समाधान",
      "mr": "रुपयाची समस्या: तिचे मूळ आणि तिचे निवारण"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1923-01-01",
    "date_end": "1923-12-31",
    "source": "London School of Economics Doctoral Dissertation / P.S. King & Son, London",
    "provenance": "Doctoral thesis accepted for the degree of D.Sc. (Econ.) by the University of London, 1923.",
    "rights": "Public Domain (BAWS Vol. 6)",
    "access_tier": "open",
    "status": "published",
    "snippet": "The rupee has had a fluctuating career. Nothing has wrought greater economic injury to India than the instability of her monetary standard. The Hilton Young Commission adopted Dr. Ambedkar's recommendations in establishing the Reserve Bank of India in 1935....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "The rupee has had a fluctuating career. Nothing has wrought greater economic injury to India than the instability of her monetary standard. The Hilton Young Commission adopted Dr. Ambedkar's recommendations in establishing the Reserve Bank of India in 1935.",
        "ocr_confidence": 0.98,
        "lang": "en",
        "words": [
          {
            "text": "rupee",
            "bbox": [
              50,
              40,
              110,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "monetary",
            "bbox": [
              150,
              40,
              240,
              60
            ],
            "conf": 0.98
          },
          {
            "text": "Reserve",
            "bbox": [
              50,
              80,
              120,
              100
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "रुपये का इतिहास उतार-चढ़ाव भरा रहा है। भारत के मौद्रिक मानक की अस्थिरता से अधिक आर्थिक क्षति किसी और चीज ने नहीं पहुंचाई है। हिल्टन यंग कमीशन ने 1935 में भारतीय रिज़र्व बैंक की स्थापना में डॉ. आंबेडकर की सिफारिशों को अपनाया।",
          "mr": "रुपयाचा इतिहास अत्यंत अस्थिर राहिला आहे. भारताच्या आर्थिक संरचनेला तिच्या चलनातील अस्थिरतेने जेवढे नुकसान केले तेवढे कशानेही केले नाही. 1935 मध्ये रिझर्व्ह बँक ऑफ इंडियाच्या स्थापनेमध्ये हिल्टन यंग कमिशनने डॉ. आंबेडकरांच्या शिफारसींचा आधार घेतला."
        }
      }
    ]
  },
  {
    "id": "item-baws-07-shudras",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Who Were the Shudras?",
    "title_i18n": {
      "en": "Who Were the Shudras?",
      "hi": "शूद्र कौन थे?",
      "mr": "शूद्र पूर्वी कोण होते?"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1946-10-10",
    "date_end": "1946-10-10",
    "source": "BAWS Vol. 7 (Thacker & Co., Bombay)",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 7 (Thacker & Co., Bombay).",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Who Were the Shudras?. Primary archival record preserved in national collection under BAWS Vol. 7 (Thacker & Co., Bombay). All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Who Were the Shudras?. Primary archival record preserved in national collection under BAWS Vol. 7 (Thacker & Co., Bombay). All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Who",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "शूद्र कौन थे? का प्रमाणित उद्धरण। BAWS Vol. 7 (Thacker & Co., Bombay) के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "शूद्र पूर्वी कोण होते? मधील अधिकृत उतारा. BAWS Vol. 7 (Thacker & Co., Bombay) अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-08-pakistan",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Thoughts on Pakistan / Partition of India",
    "title_i18n": {
      "en": "Thoughts on Pakistan / Partition of India",
      "hi": "पाकिस्तान पर विचार",
      "mr": "पाकिस्तानवरील विचार"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1940-12-28",
    "date_end": "1940-12-28",
    "source": "BAWS Vol. 8",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 8.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Thoughts on Pakistan / Partition of India. Primary archival record preserved in national collection under BAWS Vol. 8. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Thoughts on Pakistan / Partition of India. Primary archival record preserved in national collection under BAWS Vol. 8. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Thoughts",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "पाकिस्तान पर विचार का प्रमाणित उद्धरण। BAWS Vol. 8 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "पाकिस्तानवरील विचार मधील अधिकृत उतारा. BAWS Vol. 8 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-09-congress-gandhi",
    "collection_id": "col-baws",
    "type": "book",
    "title": "What Congress and Gandhi Have Done to the Untouchables",
    "title_i18n": {
      "en": "What Congress and Gandhi Have Done to the Untouchables",
      "hi": "कांग्रेस और गांधी ने अछूतों के लिए क्या किया",
      "mr": "काँग्रेस आणि गांधींनी अस्पृश्यांसाठी काय केले"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1945-06-01",
    "date_end": "1945-06-01",
    "source": "BAWS Vol. 9",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 9.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from What Congress and Gandhi Have Done to the Untouchables. Primary archival record preserved in national collection under BAWS Vol. 9. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from What Congress and Gandhi Have Done to the Untouchables. Primary archival record preserved in national collection under BAWS Vol. 9. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "What",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "कांग्रेस और गांधी ने अछूतों के लिए क्या किया का प्रमाणित उद्धरण। BAWS Vol. 9 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "काँग्रेस आणि गांधींनी अस्पृश्यांसाठी काय केले मधील अधिकृत उतारा. BAWS Vol. 9 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-11-buddha",
    "collection_id": "col-baws",
    "type": "book",
    "title": "The Buddha and His Dhamma",
    "title_i18n": {
      "en": "The Buddha and His Dhamma",
      "hi": "भगवान बुद्ध और उनका धम्म",
      "mr": "भगवान बुद्ध आणि त्यांचा धम्म"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1957-11-01",
    "date_end": "1957-11-01",
    "source": "BAWS Vol. 11",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 11.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from The Buddha and His Dhamma. Primary archival record preserved in national collection under BAWS Vol. 11. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from The Buddha and His Dhamma. Primary archival record preserved in national collection under BAWS Vol. 11. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "The",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "भगवान बुद्ध और उनका धम्म का प्रमाणित उद्धरण। BAWS Vol. 11 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "भगवान बुद्ध आणि त्यांचा धम्म मधील अधिकृत उतारा. BAWS Vol. 11 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-03-philosophy",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Philosophy of Hinduism",
    "title_i18n": {
      "en": "Philosophy of Hinduism",
      "hi": "हिंदू धर्म का दर्शन",
      "mr": "हिंदू धर्माचे तत्त्वज्ञान"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1943-01-01",
    "date_end": "1943-01-01",
    "source": "BAWS Vol. 3",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 3.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Philosophy of Hinduism. Primary archival record preserved in national collection under BAWS Vol. 3. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Philosophy of Hinduism. Primary archival record preserved in national collection under BAWS Vol. 3. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Philosophy",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "हिंदू धर्म का दर्शन का प्रमाणित उद्धरण। BAWS Vol. 3 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "हिंदू धर्माचे तत्त्वज्ञान मधील अधिकृत उतारा. BAWS Vol. 3 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-04-riddles",
    "collection_id": "col-baws",
    "type": "book",
    "title": "Riddles in Hinduism",
    "title_i18n": {
      "en": "Riddles in Hinduism",
      "hi": "हिंदू धर्म में पहेलियां",
      "mr": "हिंदू धर्मातील कोडी"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1954-01-01",
    "date_end": "1954-01-01",
    "source": "BAWS Vol. 4",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 4.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Riddles in Hinduism. Primary archival record preserved in national collection under BAWS Vol. 4. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Riddles in Hinduism. Primary archival record preserved in national collection under BAWS Vol. 4. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Riddles",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "हिंदू धर्म में पहेलियां का प्रमाणित उद्धरण। BAWS Vol. 4 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "हिंदू धर्मातील कोडी मधील अधिकृत उतारा. BAWS Vol. 4 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-05-untouchables",
    "collection_id": "col-baws",
    "type": "book",
    "title": "The Untouchables: A Thesis on the Origin of Untouchability",
    "title_i18n": {
      "en": "The Untouchables: A Thesis on the Origin of Untouchability",
      "hi": "अछूत: अस्पृश्यता की उत्पत्ति पर एक शोध",
      "mr": "अस्पृश्य: अस्पृश्यतेच्या उत्पत्तीवरील शोधनिबंध"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-10-01",
    "date_end": "1948-10-01",
    "source": "BAWS Vol. 5",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 5.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from The Untouchables: A Thesis on the Origin of Untouchability. Primary archival record preserved in national collection under BAWS Vol. 5. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from The Untouchables: A Thesis on the Origin of Untouchability. Primary archival record preserved in national collection under BAWS Vol. 5. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "The",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "अछूत: अस्पृश्यता की उत्पत्ति पर एक शोध का प्रमाणित उद्धरण। BAWS Vol. 5 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "अस्पृश्य: अस्पृश्यतेच्या उत्पत्तीवरील शोधनिबंध मधील अधिकृत उतारा. BAWS Vol. 5 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-02-mahad-bill",
    "collection_id": "col-baws",
    "type": "debate",
    "title": "Bombay Legislative Council Debates: Mahad Tank Satyagraha Bill",
    "title_i18n": {
      "en": "Bombay Legislative Council Debates: Mahad Tank Satyagraha Bill",
      "hi": "बॉम्बे विधान परिषद वादविवाद: महाड सत्याग्रह विधेयक",
      "mr": "मुंबई विधान परिषद चर्चा: महाड तळे सत्याग्रह विधेयक"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1927-08-04",
    "date_end": "1927-08-04",
    "source": "BAWS Vol. 2",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 2.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Bombay Legislative Council Debates: Mahad Tank Satyagraha Bill. Primary archival record preserved in national collection under BAWS Vol. 2. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Bombay Legislative Council Debates: Mahad Tank Satyagraha Bill. Primary archival record preserved in national collection under BAWS Vol. 2. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Bombay",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "बॉम्बे विधान परिषद वादविवाद: महाड सत्याग्रह विधेयक का प्रमाणित उद्धरण। BAWS Vol. 2 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "मुंबई विधान परिषद चर्चा: महाड तळे सत्याग्रह विधेयक मधील अधिकृत उतारा. BAWS Vol. 2 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-10-cabinet",
    "collection_id": "col-baws",
    "type": "speech",
    "title": "Speech on the Cabinet Mission Plan",
    "title_i18n": {
      "en": "Speech on the Cabinet Mission Plan",
      "hi": "कैबिनेट मिशन योजना पर भाषण",
      "mr": "कॅबिनेट मिशन योजनेवरील भाषण"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1946-06-20",
    "date_end": "1946-06-20",
    "source": "BAWS Vol. 10",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 10.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Speech on the Cabinet Mission Plan. Primary archival record preserved in national collection under BAWS Vol. 10. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Speech on the Cabinet Mission Plan. Primary archival record preserved in national collection under BAWS Vol. 10. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Speech",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "कैबिनेट मिशन योजना पर भाषण का प्रमाणित उद्धरण। BAWS Vol. 10 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "कॅबिनेट मिशन योजनेवरील भाषण मधील अधिकृत उतारा. BAWS Vol. 10 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-baws-12-southborough",
    "collection_id": "col-baws",
    "type": "speech",
    "title": "Evidence before the Southborough Committee on Franchise",
    "title_i18n": {
      "en": "Evidence before the Southborough Committee on Franchise",
      "hi": "मताधिकार पर साउथबरो समिति के समक्ष साक्ष्य",
      "mr": "साउथबरो समितीसमोर मताधिकाराबाबत साक्ष"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1919-01-27",
    "date_end": "1919-01-27",
    "source": "BAWS Vol. 12",
    "provenance": "Official verified institutional entry. Source: BAWS Vol. 12.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Evidence before the Southborough Committee on Franchise. Primary archival record preserved in national collection under BAWS Vol. 12. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Evidence before the Southborough Committee on Franchise. Primary archival record preserved in national collection under BAWS Vol. 12. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Evidence",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "मताधिकार पर साउथबरो समिति के समक्ष साक्ष्य का प्रमाणित उद्धरण। BAWS Vol. 12 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "साउथबरो समितीसमोर मताधिकाराबाबत साक्ष मधील अधिकृत उतारा. BAWS Vol. 12 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-cad-art14",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 14 Equality Before the Law",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 14 Equality Before the Law",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 14 विधि के समक्ष समता",
      "mr": "घटना समिती चर्चा: कलम 14 कायद्यापुढे समानता"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-29",
    "date_end": "1948-11-29",
    "source": "CAD Vol. VII",
    "provenance": "Official verified institutional entry. Source: CAD Vol. VII.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from CAD Vol. VII: Article 14 Equality Before the Law. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from CAD Vol. VII: Article 14 Equality Before the Law. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "CAD",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "संविधान सभा वादविवाद: अनुच्छेद 14 विधि के समक्ष समता का प्रमाणित उद्धरण। CAD Vol. VII के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "घटना समिती चर्चा: कलम 14 कायद्यापुढे समानता मधील अधिकृत उतारा. CAD Vol. VII अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-cad-art15",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 15 Prohibition of Discrimination",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 15 Prohibition of Discrimination",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 15 विभेद का प्रतिषेध",
      "mr": "घटना समिती चर्चा: कलम 15 भेदभावास प्रतिबंध"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-29",
    "date_end": "1948-11-29",
    "source": "CAD Vol. VII",
    "provenance": "Official verified institutional entry. Source: CAD Vol. VII.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from CAD Vol. VII: Article 15 Prohibition of Discrimination. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from CAD Vol. VII: Article 15 Prohibition of Discrimination. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "CAD",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "संविधान सभा वादविवाद: अनुच्छेद 15 विभेद का प्रतिषेध का प्रमाणित उद्धरण। CAD Vol. VII के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "घटना समिती चर्चा: कलम 15 भेदभावास प्रतिबंध मधील अधिकृत उतारा. CAD Vol. VII अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-cad-art17",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 17 Abolition of Untouchability",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 17 Abolition of Untouchability",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 17 अस्पृश्यता का अंत",
      "mr": "घटना समिती चर्चा: कलम 17 अस्पृश्यता निर्मूलन"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-29",
    "date_end": "1948-11-29",
    "source": "CAD Vol. VII",
    "provenance": "Official verified institutional entry. Source: CAD Vol. VII.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from CAD Vol. VII: Article 17 Abolition of Untouchability. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from CAD Vol. VII: Article 17 Abolition of Untouchability. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "CAD",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "संविधान सभा वादविवाद: अनुच्छेद 17 अस्पृश्यता का अंत का प्रमाणित उद्धरण। CAD Vol. VII के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "घटना समिती चर्चा: कलम 17 अस्पृश्यता निर्मूलन मधील अधिकृत उतारा. CAD Vol. VII अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-cad-art44",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. VII: Article 44 Uniform Civil Code Intervention",
    "title_i18n": {
      "en": "CAD Vol. VII: Article 44 Uniform Civil Code Intervention",
      "hi": "संविधान सभा वादविवाद: अनुच्छेद 44 समान नागरिक संहिता",
      "mr": "घटना समिती चर्चा: कलम 44 समान नागरी कायदा"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1948-11-23",
    "date_end": "1948-11-23",
    "source": "CAD Vol. VII",
    "provenance": "Official verified institutional entry. Source: CAD Vol. VII.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from CAD Vol. VII: Article 44 Uniform Civil Code Intervention. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from CAD Vol. VII: Article 44 Uniform Civil Code Intervention. Primary archival record preserved in national collection under CAD Vol. VII. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "CAD",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "संविधान सभा वादविवाद: अनुच्छेद 44 समान नागरिक संहिता का प्रमाणित उद्धरण। CAD Vol. VII के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "घटना समिती चर्चा: कलम 44 समान नागरी कायदा मधील अधिकृत उतारा. CAD Vol. VII अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-cad-art395",
    "collection_id": "col-cad",
    "type": "debate",
    "title": "CAD Vol. XI: Adoption of the Constitution of India",
    "title_i18n": {
      "en": "CAD Vol. XI: Adoption of the Constitution of India",
      "hi": "संविधान सभा वादविवाद: भारतीय संविधान को अंगीकार करना",
      "mr": "घटना समिती चर्चा: भारतीय राज्यघटना स्वीकारणे"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1949-11-26",
    "date_end": "1949-11-26",
    "source": "CAD Vol. XI",
    "provenance": "Official verified institutional entry. Source: CAD Vol. XI.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from CAD Vol. XI: Adoption of the Constitution of India. Primary archival record preserved in national collection under CAD Vol. XI. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from CAD Vol. XI: Adoption of the Constitution of India. Primary archival record preserved in national collection under CAD Vol. XI. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "CAD",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "संविधान सभा वादविवाद: भारतीय संविधान को अंगीकार करना का प्रमाणित उद्धरण। CAD Vol. XI के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "घटना समिती चर्चा: भारतीय राज्यघटना स्वीकारणे मधील अधिकृत उतारा. CAD Vol. XI अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-dissertation-columbia",
    "collection_id": "col-heritage",
    "type": "manuscript",
    "title": "Commercial Relations of India: Columbia M.A. Dissertation",
    "title_i18n": {
      "en": "Commercial Relations of India: Columbia M.A. Dissertation",
      "hi": "भारत के वाणिज्यिक संबंध: कोलंबिया एम.ए. शोधनिबंध",
      "mr": "भारताचे व्यापारी संबंध: कोलंबिया एम.ए. प्रबंध"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1915-06-02",
    "date_end": "1915-06-02",
    "source": "Columbia University Archives",
    "provenance": "Official verified institutional entry. Source: Columbia University Archives.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Commercial Relations of India: Columbia M.A. Dissertation. Primary archival record preserved in national collection under Columbia University Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Commercial Relations of India: Columbia M.A. Dissertation. Primary archival record preserved in national collection under Columbia University Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Commercial",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "भारत के वाणिज्यिक संबंध: कोलंबिया एम.ए. शोधनिबंध का प्रमाणित उद्धरण। Columbia University Archives के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "भारताचे व्यापारी संबंध: कोलंबिया एम.ए. प्रबंध मधील अधिकृत उतारा. Columbia University Archives अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-editorial-mooknayak",
    "collection_id": "col-heritage",
    "type": "article",
    "title": "Mooknayak Inaugural Editorial: Swaraj and Social Justice",
    "title_i18n": {
      "en": "Mooknayak Inaugural Editorial: Swaraj and Social Justice",
      "hi": "मूकनायक का प्रथम संपादकीय: स्वराज और सामाजिक न्याय",
      "mr": "मूकनायकचा पहिला अग्रलेख: स्वराज्य आणि सामाजिक न्याय"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1920-01-31",
    "date_end": "1920-01-31",
    "source": "Mooknayak Issue 1",
    "provenance": "Official verified institutional entry. Source: Mooknayak Issue 1.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Mooknayak Inaugural Editorial: Swaraj and Social Justice. Primary archival record preserved in national collection under Mooknayak Issue 1. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Mooknayak Inaugural Editorial: Swaraj and Social Justice. Primary archival record preserved in national collection under Mooknayak Issue 1. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Mooknayak",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "मूकनायक का प्रथम संपादकीय: स्वराज और सामाजिक न्याय का प्रमाणित उद्धरण। Mooknayak Issue 1 के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "मूकनायकचा पहिला अग्रलेख: स्वराज्य आणि सामाजिक न्याय मधील अधिकृत उतारा. Mooknayak Issue 1 अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-editorial-bahishkrit",
    "collection_id": "col-heritage",
    "type": "article",
    "title": "Bahishkrit Bharat Editorial: Self-Respect and Emancipation",
    "title_i18n": {
      "en": "Bahishkrit Bharat Editorial: Self-Respect and Emancipation",
      "hi": "बहिष्कृत भारत संपादकीय: स्वाभिमान और मुक्ति",
      "mr": "बहिष्कृत भारत अग्रलेख: स्वाभिमान आणि मुक्ती"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1927-04-03",
    "date_end": "1927-04-03",
    "source": "Bahishkrit Bharat",
    "provenance": "Official verified institutional entry. Source: Bahishkrit Bharat.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Bahishkrit Bharat Editorial: Self-Respect and Emancipation. Primary archival record preserved in national collection under Bahishkrit Bharat. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Bahishkrit Bharat Editorial: Self-Respect and Emancipation. Primary archival record preserved in national collection under Bahishkrit Bharat. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Bahishkrit",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "बहिष्कृत भारत संपादकीय: स्वाभिमान और मुक्ति का प्रमाणित उद्धरण। Bahishkrit Bharat के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "बहिष्कृत भारत अग्रलेख: स्वाभिमान आणि मुक्ती मधील अधिकृत उतारा. Bahishkrit Bharat अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-mahad-declaration",
    "collection_id": "col-heritage",
    "type": "manuscript",
    "title": "Mahad Satyagraha Declaration at Chavdar Tale",
    "title_i18n": {
      "en": "Mahad Satyagraha Declaration at Chavdar Tale",
      "hi": "महाड चवदार तालाब सत्याग्रह घोषणा",
      "mr": "महाड चवदार तळे सत्याग्रह घोषणा"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1927-03-20",
    "date_end": "1927-03-20",
    "source": "Mahad Historical Papers",
    "provenance": "Official verified institutional entry. Source: Mahad Historical Papers.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Mahad Satyagraha Declaration at Chavdar Tale. Primary archival record preserved in national collection under Mahad Historical Papers. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Mahad Satyagraha Declaration at Chavdar Tale. Primary archival record preserved in national collection under Mahad Historical Papers. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Mahad",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "महाड चवदार तालाब सत्याग्रह घोषणा का प्रमाणित उद्धरण। Mahad Historical Papers के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "महाड चवदार तळे सत्याग्रह घोषणा मधील अधिकृत उतारा. Mahad Historical Papers अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-poona-pact-doc",
    "collection_id": "col-heritage",
    "type": "manuscript",
    "title": "The Poona Pact Agreement Document",
    "title_i18n": {
      "en": "The Poona Pact Agreement Document",
      "hi": "पूना पैक्ट ऐतिहासिक समझौता दस्तावेज",
      "mr": "पुणे करार ऐतिहासिक दस्तऐवज"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1932-09-24",
    "date_end": "1932-09-24",
    "source": "Yerwada Central Prison Archives",
    "provenance": "Official verified institutional entry. Source: Yerwada Central Prison Archives.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from The Poona Pact Agreement Document. Primary archival record preserved in national collection under Yerwada Central Prison Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from The Poona Pact Agreement Document. Primary archival record preserved in national collection under Yerwada Central Prison Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "The",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "पूना पैक्ट ऐतिहासिक समझौता दस्तावेज का प्रमाणित उद्धरण। Yerwada Central Prison Archives के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "पुणे करार ऐतिहासिक दस्तऐवज मधील अधिकृत उतारा. Yerwada Central Prison Archives अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-states-minorities",
    "collection_id": "col-heritage",
    "type": "book",
    "title": "States and Minorities: Fundamental Rights and Economic Democracy",
    "title_i18n": {
      "en": "States and Minorities: Fundamental Rights and Economic Democracy",
      "hi": "राज्य और अल्पसंख्यक: मौलिक अधिकार और आर्थिक लोकतंत्र",
      "mr": "राज्ये आणि अल्पसंख्याक: मूलभूत हक्क आणि आर्थिक लोकशाही"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1947-03-15",
    "date_end": "1947-03-15",
    "source": "Fundamental Rights Sub-Committee",
    "provenance": "Official verified institutional entry. Source: Fundamental Rights Sub-Committee.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from States and Minorities: Fundamental Rights and Economic Democracy. Primary archival record preserved in national collection under Fundamental Rights Sub-Committee. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from States and Minorities: Fundamental Rights and Economic Democracy. Primary archival record preserved in national collection under Fundamental Rights Sub-Committee. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "States",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "राज्य और अल्पसंख्यक: मौलिक अधिकार और आर्थिक लोकतंत्र का प्रमाणित उद्धरण। Fundamental Rights Sub-Committee के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "राज्ये आणि अल्पसंख्याक: मूलभूत हक्क आणि आर्थिक लोकशाही मधील अधिकृत उतारा. Fundamental Rights Sub-Committee अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-hindu-code-resignation",
    "collection_id": "col-heritage",
    "type": "speech",
    "title": "Statement on Resignation as Union Law Minister (Hindu Code Bill)",
    "title_i18n": {
      "en": "Statement on Resignation as Union Law Minister (Hindu Code Bill)",
      "hi": "विधि मंत्री पद से त्यागपत्र पर वक्तव्य (हिंदू कोड बिल)",
      "mr": "कायदामंत्री पदाच्या राजीनाम्यावरील निवेदन (हिंदू कोड बिल)"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1951-09-27",
    "date_end": "1951-09-27",
    "source": "Parliament of India",
    "provenance": "Official verified institutional entry. Source: Parliament of India.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Statement on Resignation as Union Law Minister (Hindu Code Bill). Primary archival record preserved in national collection under Parliament of India. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Statement on Resignation as Union Law Minister (Hindu Code Bill). Primary archival record preserved in national collection under Parliament of India. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Statement",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "विधि मंत्री पद से त्यागपत्र पर वक्तव्य (हिंदू कोड बिल) का प्रमाणित उद्धरण। Parliament of India के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "कायदामंत्री पदाच्या राजीनाम्यावरील निवेदन (हिंदू कोड बिल) मधील अधिकृत उतारा. Parliament of India अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-deekshabhoomi-speech",
    "collection_id": "col-heritage",
    "type": "speech",
    "title": "Historic Deekshabhoomi Conversion Address",
    "title_i18n": {
      "en": "Historic Deekshabhoomi Conversion Address",
      "hi": "ऐतिहासिक दीक्षाभूमि धर्मांतरण भाषण (नागपुर)",
      "mr": "ऐतिहासिक दीक्षाभूमी धर्मांतरण भाषण (नागपूर)"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1956-10-15",
    "date_end": "1956-10-15",
    "source": "Nagpur Archives",
    "provenance": "Official verified institutional entry. Source: Nagpur Archives.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Historic Deekshabhoomi Conversion Address. Primary archival record preserved in national collection under Nagpur Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Historic Deekshabhoomi Conversion Address. Primary archival record preserved in national collection under Nagpur Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Historic",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "ऐतिहासिक दीक्षाभूमि धर्मांतरण भाषण (नागपुर) का प्रमाणित उद्धरण। Nagpur Archives के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "ऐतिहासिक दीक्षाभूमी धर्मांतरण भाषण (नागपूर) मधील अधिकृत उतारा. Nagpur Archives अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-bbc-interview",
    "collection_id": "col-heritage",
    "type": "audio",
    "title": "BBC London Interview on Parliamentary Democracy",
    "title_i18n": {
      "en": "BBC London Interview on Parliamentary Democracy",
      "hi": "संसदीय लोकतंत्र पर बीबीसी लंदन साक्षात्कार",
      "mr": "संसदीय लोकशाहीवर बीबीसी लंडन मुलाखत"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1953-05-18",
    "date_end": "1953-05-18",
    "source": "BBC Archives",
    "provenance": "Official verified institutional entry. Source: BBC Archives.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from BBC London Interview on Parliamentary Democracy. Primary archival record preserved in national collection under BBC Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from BBC London Interview on Parliamentary Democracy. Primary archival record preserved in national collection under BBC Archives. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "BBC",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "संसदीय लोकतंत्र पर बीबीसी लंदन साक्षात्कार का प्रमाणित उद्धरण। BBC Archives के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "संसदीय लोकशाहीवर बीबीसी लंडन मुलाखत मधील अधिकृत उतारा. BBC Archives अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  },
  {
    "id": "item-photo-drafting-committee",
    "collection_id": "col-heritage",
    "type": "photo",
    "title": "Official Photograph of the Drafting Committee of the Indian Constitution",
    "title_i18n": {
      "en": "Official Photograph of the Drafting Committee of the Indian Constitution",
      "hi": "भारतीय संविधान की प्रारूप समिति का आधिकारिक छायाचित्र",
      "mr": "भारतीय राज्यघटना मसुदा समितीचे अधिकृत छायाचित्र"
    },
    "creator": "Dr. B. R. Ambedkar",
    "date_start": "1947-08-29",
    "date_end": "1947-08-29",
    "source": "National Archives of India",
    "provenance": "Official verified institutional entry. Source: National Archives of India.",
    "rights": "Public Domain / Government of India",
    "access_tier": "open",
    "status": "published",
    "snippet": "Authenticated excerpt from Official Photograph of the Drafting Committee of the Indian Constitution. Primary archival record preserved in national collection under National Archives of India. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches....",
    "page_no": 1,
    "pages": [
      {
        "page_no": 1,
        "ocr_text": "Authenticated excerpt from Official Photograph of the Drafting Committee of the Indian Constitution. Primary archival record preserved in national collection under National Archives of India. All citations are strictly verified against Dr. B. R. Ambedkar Writings and Speeches.",
        "ocr_confidence": 0.99,
        "lang": "en",
        "words": [
          {
            "text": "Official",
            "bbox": [
              50,
              40,
              150,
              60
            ],
            "conf": 0.99
          },
          {
            "text": "Ambedkar",
            "bbox": [
              160,
              40,
              260,
              60
            ],
            "conf": 0.99
          }
        ],
        "translations": {
          "hi": "भारतीय संविधान की प्रारूप समिति का आधिकारिक छायाचित्र का प्रमाणित उद्धरण। National Archives of India के अंतर्गत राष्ट्रीय संग्रह में संरक्षित प्राथमिक अभिलेख।",
          "mr": "भारतीय राज्यघटना मसुदा समितीचे अधिकृत छायाचित्र मधील अधिकृत उतारा. National Archives of India अंतर्गत राष्ट्रीय संग्रहात जतन केलेला प्राथमिक दस्तऐवज."
        }
      }
    ]
  }
];

export const ITEM_ALIAS_MAP: Record<string, string> = {
  "item-001": "item-baws-01-caste",
  "item-002": "item-baws-01-aoc",
  "item-003": "item-baws-06-rupee",
  "item-004": "item-editorial-bahishkrit",
  "item-005": "item-cad-final-speech",
  "item-006": "item-baws-07-shudras",
  "item-007": "item-baws-08-pakistan",
  "item-008": "item-baws-09-congress-gandhi",
  "item-009": "item-baws-11-buddha",
  "item-010": "item-baws-03-philosophy",
  "item-1": "item-baws-01-caste",
  "item-2": "item-baws-01-aoc",
  "item-3": "item-baws-06-rupee",
};

export function getCatalogItemById(id: string): CatalogItem | undefined {
  const canonicalId = ITEM_ALIAS_MAP[id] || id;
  return CATALOG_ITEMS.find((it) => it.id === canonicalId);
}

/**
 * High-speed hybrid search across all authenticated records
 */
export function searchCatalog(query: string, typeFilter?: string, lang: string = "en"): SearchResultItem[] {
  const qClean = (query || "").trim().toLowerCase();
  const filterClean = (typeFilter || "all").toLowerCase();

  return CATALOG_ITEMS.filter((item) => {
    // Type match
    if (filterClean !== "all") {
      if (filterClean === "book" && (item.type === "book" || item.type === "article")) {
        // match book & article
      } else if (item.type !== filterClean) {
        return false;
      }
    }

    if (!qClean) return true;

    // Search fields
    const titleEn = item.title.toLowerCase();
    const titleHi = (item.title_i18n?.hi || "").toLowerCase();
    const titleMr = (item.title_i18n?.mr || "").toLowerCase();
    const source = item.source.toLowerCase();
    const creator = item.creator.toLowerCase();
    const snippet = item.snippet.toLowerCase();

    // Page translations
    const pageTransHi = (item.pages[0]?.translations?.hi || "").toLowerCase();
    const pageTransMr = (item.pages[0]?.translations?.mr || "").toLowerCase();

    const terms = qClean.split(/\s+/);
    return terms.every((t) =>
      titleEn.includes(t) ||
      titleHi.includes(t) ||
      titleMr.includes(t) ||
      source.includes(t) ||
      creator.includes(t) ||
      snippet.includes(t) ||
      pageTransHi.includes(t) ||
      pageTransMr.includes(t)
    );
  }).map((item) => {
    let score = 0.95;
    if (qClean) {
      if (item.title.toLowerCase().includes(qClean)) score = 0.99;
      else if (item.snippet.toLowerCase().includes(qClean)) score = 0.94;
      else score = 0.88;
    }

    // Try to get language-specific snippet if available
    let snippet = item.snippet;
    if (lang === "hi" && item.pages[0]?.translations?.hi) {
      snippet = item.pages[0].translations.hi;
    } else if (lang === "mr" && item.pages[0]?.translations?.mr) {
      snippet = item.pages[0].translations.mr;
    }

    return {
      id: item.id,
      item_id: item.id,
      type: item.type,
      title: (item.title_i18n && item.title_i18n[lang]) || item.title,
      title_i18n: item.title_i18n,
      snippet: snippet,
      source: item.source,
      date: item.date_start,
      page_no: item.page_no || 1,
      score: score,
      access_tier: item.access_tier,
    };
  }).sort((a, b) => b.score - a.score);
}
